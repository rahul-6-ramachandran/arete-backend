import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BaseService } from '../common/services/base.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService extends BaseService<CreatePostDto>{
  constructor(prisma: PrismaService){
    super(prisma,prisma.post)
  }
}
