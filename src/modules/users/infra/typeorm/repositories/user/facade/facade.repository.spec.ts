import { Test, TestingModule } from '@nestjs/testing';

import {
  CreateUserRepository,
  CREATE_USER_REPOSITORY,
  UserRepository,
  USER_REPOSITORY,
} from '~/modules/users/data';
import { factories } from '~/test/factories';

import { FacadeTypeOrmUserRepository } from './facade.repository';

describe('FacadeTypeOrmUserRepository', () => {
  const createUserRepositoryMockFactory = () => ({ create: jest.fn() });

  let sut: UserRepository;
  let createUserRepository: CreateUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: USER_REPOSITORY,
          useClass: FacadeTypeOrmUserRepository,
        },
        {
          provide: CREATE_USER_REPOSITORY,
          useFactory: createUserRepositoryMockFactory,
        },
      ],
    }).compile();

    sut = module.get(USER_REPOSITORY);
    createUserRepository = module.get(CREATE_USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call CreateUserRepository with correct values', async () => {
    const user = factories.users.user.build();

    await sut.create(user);

    expect(createUserRepository.create).toHaveBeenCalledWith(user);
  });

  it('should return created user', async () => {
    const user = factories.users.user.build();
    const createdUser = factories.users.user.build();

    jest
      .spyOn(createUserRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(createdUser));

    expect(await sut.create(user)).toEqual(createdUser);
  });
});
