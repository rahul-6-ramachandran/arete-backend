import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BullModule } from '@nestjs/bullmq';
import { MediaProcessor } from './media.processor';
import { RedisModule } from '../redis/redis.module';

@Module({
  controllers: [MediaController],
  providers: [MediaService, MediaProcessor],
  
  imports:[PrismaModule, RedisModule, BullModule.forRoot({
  connection: {
    host: 'redis',
    port: 6379,
  },
  
}),

    BullModule.registerQueue({
      name: 'media-processing',
    }),
  ]
})
export class MediaModule {}
