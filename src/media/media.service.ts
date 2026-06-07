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
  );

  console.log('Job ID:', job.id);

  return {
    success: true,
    jobId: job.id,
  };
  }
}
