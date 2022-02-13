import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserRepository, CREATE_USER_REPOSITORY } from '~/modules/users/data';
import { UserEntity } from '~/modules/users/infra/typeorm/entities';
import { factories } from '~/test/factories';

import { TypeOrmCreateUserRepository } from './create-user.repository';

describe('TypeOrmCreateUserRepository', () => {
  const typeOrmRepositoryMockFactory = () => ({
    create: jest.fn(),
    save: jest.fn(),
  });

  let sut: UserRepository;
  let typeOrmRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CREATE_USER_REPOSITORY,
          useClass: TypeOrmCreateUserRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: typeOrmRepositoryMockFactory,
        },
      ],
    }).compile();

    sut = module.get(CREATE_USER_REPOSITORY);
    typeOrmRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call TypeOrm repository create', async () => {
    const user = factories.users.user.build();

    await sut.create(user);

    expect(typeOrmRepository.create).toHaveBeenCalledWith(user);
  });

  it('should call TypeOrm repository save', async () => {
    const user = factories.users.user.build();
    const createdUser = factories.users.user.build();

    jest
      .spyOn(typeOrmRepository, 'create')
      .mockReturnValueOnce(createdUser as UserEntity);

    await sut.create(user);

    expect(typeOrmRepository.save).toHaveBeenCalledWith(createdUser);
  });

  it('should return created user', async () => {
    const user = factories.users.user.build();
    const createdUser = factories.users.user.build();

    jest
      .spyOn(typeOrmRepository, 'create')
      .mockReturnValueOnce(createdUser as UserEntity);

    expect(await sut.create(user)).toEqual(createdUser);
  });
});
