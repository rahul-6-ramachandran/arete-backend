import { Processor, WorkerHost } from "@nestjs/bullmq";
import { RedisService } from "../redis/redis.service";
import { Job } from "bullmq";
import { v4 as uuidv4 } from 'uuid';
import { clear } from "console";
@Processor('media-processing', {
  concurrency: 5,
})
export class MediaProcessor extends WorkerHost {

  constructor(
    private readonly redisService: RedisService,
  ) {
    super();
  }

  async process(job: Job) {

    console.log(
  `Job ${job.id} received`
);

    const redis =
  this.redisService.getClient();

  const ownerToken = uuidv4();

  const lockKey =
  `media:${job.data.fileName}`;


  const lock = await redis.set(
    lockKey,
    ownerToken,
    'EX',
    30,
    'NX',
  );

  if (!lock) {
    console.log(
      `Lock already exists for ${lockKey}`
    );

    return;
  }

  const heartBeat = setInterval(async()=>{
  
      const currOWner = await redis.get(lockKey);
      if(currOWner === ownerToken){
        await redis.expire(lockKey,30);


         console.log(
        `Heartbeat for ${lockKey}`,
      );

    }
  },10000)
  try {

  console.log(
    `Processing ${job.id}`
  );

  await new Promise(resolve =>
    setTimeout(resolve, 60000),
  );

} finally {

   clearInterval(heartBeat)
    const currentOwner =
      await redis.get(lockKey);

    if (
      currentOwner === ownerToken
    ) {

      await redis.del(lockKey);

      console.log(
        `Released lock ${lockKey}`
      );

    } else {

      console.log(
        `Not lock owner`
      );

    }
}
  }
}