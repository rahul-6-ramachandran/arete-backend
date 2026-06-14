import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { BaseService } from '../common/services/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class MediaService extends BaseService<CreateMediaDto> {
  constructor(prisma: PrismaService ,
      @InjectQueue('media-processing')
      private mediaQueue: Queue,){
        super(prisma, prisma.media)
  }

  async handleFileUpload(file: Express.Multer.File) {

    const job = await this.mediaQueue.add(
      'process-upload',
      {
        fileName: file.filename,
        path: file.path,
        uploadedAt: Date.now(),
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    );

  console.log('Job ID:', job.id);

  return {
    success: true,
    jobId: job.id,
  };
  }
  
  async testLock() {

  await this.mediaQueue.add(
    'process-upload',
    {
      fileName: 'same-file',
    },
  );

  await this.mediaQueue.add(
    'process-upload',
    {
      fileName: 'same-file',
    },
  );

  return {
    success: true,
  };
}
  // Observable pattern to get real-time updates on the queue stats
  async getQueueStats() {
    const [
      waiting,
      active,
      completed,
      failed,
    ] = await Promise.all([
      this.mediaQueue.getWaitingCount(),
      this.mediaQueue.getActiveCount(),
      this.mediaQueue.getCompletedCount(),
      this.mediaQueue.getFailedCount(),
    ]);

    return {
      waiting,
      active,
      completed,
      failed,
    };
  }

  // test method to add jobs to the queue simultaneously and test the concurrency and processing
  async queueTestJobs() {
  for (let i = 0; i < 5; i++) {
    await this.mediaQueue.add(
      'process-upload',
      {
        number: i,
      },
    );
  }

  return {
    queued: 5,
  };
}
}
