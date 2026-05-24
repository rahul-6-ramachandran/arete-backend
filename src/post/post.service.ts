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
async getFeed(cursor?: string, limit = 10) {
  const posts = await this.prisma.post.findMany({
    take: limit + 1,

    skip: cursor ? 1 : 0,

    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,

    orderBy: {
      createdAt: 'desc',
    },

    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  });

  const hasMore = posts.length > limit;

  if (hasMore) {
    posts.pop();
  }

  return {
    data: posts,
    nextCursor:
      posts.length > 0
        ? posts[posts.length - 1].id
        : null,
    hasMore,
  };
}
}
