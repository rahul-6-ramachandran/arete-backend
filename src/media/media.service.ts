import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { BaseService } from '../common/services/base.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService extends BaseService<CreateMediaDto> {
  constructor(prisma: PrismaService){
    super(prisma, prisma.media)
  }
}
