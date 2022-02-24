import { Test, TestingModule } from '@nestjs/testing';

import { RedisClientType } from 'redis';

import { KEY_VALUE_DATABASE } from '~/common/constants';
import { KeyValueDatabase } from '~/common/data';
import { factories } from '~/test/factories';

import { RedisKeyValueDatabase } from './redis';

describe('RedisKeyValueDatabase', () => {
  const redisMockFactory = () =>
    ({ set: jest.fn(), get: jest.fn() } as unknown as RedisClientType);

  let redis: RedisClientType;
  let sut: KeyValueDatabase;

  beforeEach(async () => {
    redis = redisMockFactory();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: KEY_VALUE_DATABASE,
          useValue: new RedisKeyValueDatabase(redis),
        },
      ],
    }).compile();

    sut = module.get(KEY_VALUE_DATABASE);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call redis set on set with correct values', async () => {
    const key = factories.faker.datatype.string();
    const value = factories.faker.datatype.string();

    await sut.set(key, value);

    expect(redis.set).toHaveBeenCalledWith(key, value);
    expect(redis.set).toHaveBeenCalledTimes(1);
  });

  it('should call redis get on get with correct values', async () => {
    const key = factories.faker.datatype.string();

    await sut.get(key);

    expect(redis.get).toHaveBeenCalledWith(key);
    expect(redis.get).toHaveBeenCalledTimes(1);
  });

  it('should return correct value on get', async () => {
    const key = factories.faker.datatype.string();
    const retrievedValue = factories.faker.datatype.string();

    jest
      .spyOn(redis, 'get')
      .mockReturnValueOnce(Promise.resolve(retrievedValue));

    const result = await sut.get(key);

    expect(result).toBe(retrievedValue);
  });
});
