import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class UserService extends BaseService<CreateUserDto> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.user);
  }
}