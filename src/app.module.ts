import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';
import { MediaModule } from './media/media.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [PrismaModule, UserModule, PostModule, ProfileModule, MediaModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
