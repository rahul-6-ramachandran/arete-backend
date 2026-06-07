import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor('media-processing')
export class MediaProcessor extends WorkerHost {
    async process(job: Job, token?: string): Promise<any> {

        const start = Date.now();
    console.log('Processing Job');

    console.log(job.id);

    console.log(job.name);

    console.log(job.data);
    const end = Date.now();
    console.log(
    `Processing took ${end - start} ms`,
    );
    return true;
    
}
}