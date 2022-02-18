import { Test, TestingModule } from '@nestjs/testing';

import { plainToClass } from 'class-transformer';

import { CREATE_USER } from '~/modules/users/data';
import { CreateUser } from '~/modules/users/domain';
import { factories } from '~/test/factories';

import { UserDTO } from '../../dtos';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  const serviceMockFactory = () => ({ execute: jest.fn() });

  let sut: UsersController;
  let createUser: CreateUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: CREATE_USER, useFactory: serviceMockFactory }],
    }).compile();

    sut = module.get(UsersController);
    createUser = module.get(CREATE_USER);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call CreateUser on store', async () => {
    const payload = factories.users.createUserPayload.build();

    await sut.store(payload);

    expect(createUser.execute).toHaveBeenCalledWith(payload);
  });

  it('should return created user on store', async () => {
    const payload = factories.users.createUserPayload.build();
    const user = factories.users.user.build();

    jest
      .spyOn(createUser, 'execute')
      .mockReturnValueOnce(Promise.resolve(user));

    expect(await sut.store(payload)).toEqual(plainToClass(UserDTO, user));
  });

  it('should throw on store if CreateUser throws', async () => {
    const payload = factories.users.createUserPayload.build();

    jest.spyOn(createUser, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.store(payload)).rejects.toThrow();
  });
});
