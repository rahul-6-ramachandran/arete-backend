import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BaseService } from '../common/services/base.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService extends BaseService<CreateProfileDto> {
  constructor(prisma : PrismaService){
    super(prisma, prisma.profile)
  }
}
