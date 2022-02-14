import { Test, TestingModule } from '@nestjs/testing';

import { CreateUser, ValidatePasswordStrength } from '~/modules/users/domain';
import { factories } from '~/test/factories';

import {
  CREATE_USER,
  USER_REPOSITORY,
  VALIDATE_PASSWORD_STRENGTH,
} from '../../constants';
import { UserRepository } from '../../repositories';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  const serviceMockFactory = () => ({ execute: jest.fn() });
  const userRepositoryMockFactory = () => ({ create: jest.fn() });

  let sut: CreateUser;
  let validatePasswordStrength: ValidatePasswordStrength;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CREATE_USER,
          useClass: CreateUserService,
        },
        {
          provide: VALIDATE_PASSWORD_STRENGTH,
          useFactory: serviceMockFactory,
        },
        {
          provide: USER_REPOSITORY,
          useFactory: userRepositoryMockFactory,
        },
      ],
    }).compile();

    sut = module.get(CREATE_USER);
    validatePasswordStrength = module.get(VALIDATE_PASSWORD_STRENGTH);
    userRepository = module.get(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should throw error if passwords doesnt match', async () => {
    const password = factories.faker.datatype.string();
    const differentPasswordConfirmation =
      password + factories.faker.datatype.string();

    const payload = factories.users.createUserPayload.build({
      password,
      passwordConfirmation: differentPasswordConfirmation,
    });

    await expect(sut.execute(payload)).rejects.toThrowError(
      new Error('As senhas não são iguais.'),
    );
  });

  it('should call ValidatePasswordStrength with correct values', async () => {
    const password = factories.faker.datatype.string();
    const payload = factories.users.createUserPayload.build({
      password,
      passwordConfirmation: password,
    });

    jest.spyOn(validatePasswordStrength, 'execute').mockReturnValueOnce(true);

    await sut.execute(payload);

    expect(validatePasswordStrength.execute).toHaveBeenCalledWith(
      payload.password,
    );
  });

  it('should throw error if passwords strength is not valid', async () => {
    const password = factories.faker.datatype.string();
    const payload = factories.users.createUserPayload.build({
      password,
      passwordConfirmation: password,
    });

    jest.spyOn(validatePasswordStrength, 'execute').mockReturnValueOnce(false);

    const expectedError = new Error('Senha inválida!');

    await expect(sut.execute(payload)).rejects.toThrowError(expectedError);
  });

  it('should call UserRepository create with correct values', async () => {
    const password = factories.faker.datatype.string();
    const payload = factories.users.createUserPayload.build({
      password,
      passwordConfirmation: password,
    });

    jest.spyOn(validatePasswordStrength, 'execute').mockReturnValueOnce(true);

    await sut.execute(payload);

    expect(userRepository.create).toHaveBeenCalledWith(payload);
  });

  it('should return created user', async () => {
    const password = factories.faker.datatype.string();
    const payload = factories.users.createUserPayload.build({
      password,
      passwordConfirmation: password,
    });
    const user = factories.users.user.build();

    jest.spyOn(validatePasswordStrength, 'execute').mockReturnValueOnce(true);

    jest
      .spyOn(userRepository, 'create')
      .mockReturnValueOnce(Promise.resolve(user));

    expect(await sut.execute(payload)).toEqual(user);
  });
});
