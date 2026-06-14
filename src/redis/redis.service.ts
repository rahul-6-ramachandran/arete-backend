import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: 'redis',
      port: 6379,
    });
  }

  getClient() {
    return this.redis;
  }
}