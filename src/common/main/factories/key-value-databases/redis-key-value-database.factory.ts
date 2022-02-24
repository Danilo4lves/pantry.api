import { ConfigService } from '@nestjs/config';

import * as redis from 'redis';
import { RedisClientType } from 'redis';

import { RedisKeyValueDatabase } from '~/common/infra';

export async function makeRedisKeyValueDatabase(configService: ConfigService) {
  const client = redis.createClient({
    password: configService.get('REDIS_PASSWORD'),
    socket: {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
      tls: configService.get('REDIS_TLS'),
    },
  });

  await client.connect();

  return new RedisKeyValueDatabase(client as RedisClientType);
}
