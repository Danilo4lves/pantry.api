import { Test, TestingModule } from '@nestjs/testing';

import { plainToClass } from 'class-transformer';

import { UserRepository, USER_REPOSITORY } from '~/modules/users/data';
import { factories } from '~/test/factories';

import { UserDTO } from '../../dtos';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  const userRepositoryMockFactory = () => ({ create: jest.fn() });

  let sut: UsersController;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: USER_REPOSITORY, useFactory: userRepositoryMockFactory },
      ],
    }).compile();

    sut = module.get(UsersController);
    userRepository = module.get(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call UserRepository create on store', async () => {
    const payload = factories.users.createUserPayload.build();

    await sut.store(payload);

    expect(userRepository.create).toHaveBeenCalledWith(payload);
  });

  it('should return created user on store', async () => {
    const payload = factories.users.createUserPayload.build();
    const user = factories.users.user.build();

    jest
      .spyOn(userRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(user));

    expect(await sut.store(payload)).toEqual(plainToClass(UserDTO, user));
  });

  it('should throw on store if UserRepository create throws', async () => {
    const payload = factories.users.createUserPayload.build();

    jest.spyOn(userRepository, 'create').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.store(payload)).rejects.toThrow();
  });
});
