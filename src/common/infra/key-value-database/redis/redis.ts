import { Injectable } from '@nestjs/common';

import { RedisClientType } from 'redis';

import { KeyValueDatabase } from '~/common/data';

@Injectable()
export class RedisKeyValueDatabase implements KeyValueDatabase {
  constructor(private readonly redis: RedisClientType) {}

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }
}
