import { Inject, Injectable } from '@nestjs/common';

import { HASH_TO_SHA256 } from '~/common/constants';
import { HashToSHA256 } from '~/common/data';
import {
  USER_REPOSITORY,
  VALIDATE_PASSWORD_STRENGTH,
} from '~/modules/users/data/constants';
import { UserRepository } from '~/modules/users/data/repositories';
import {
  CreateUser,
  CreateUserPayloadModel,
  UserModel,
  ValidatePasswordStrength,
} from '~/modules/users/domain';

@Injectable()
export class CreateUserService implements CreateUser {
  constructor(
    @Inject(VALIDATE_PASSWORD_STRENGTH)
    private readonly validatePasswordStrength: ValidatePasswordStrength,
    @Inject(HASH_TO_SHA256)
    private readonly hashToSHA256: HashToSHA256,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(payload: CreateUserPayloadModel): Promise<UserModel> {
    const { name, email, password, passwordConfirmation, phone } = payload;

    if (password !== passwordConfirmation)
      throw new Error('As senhas não são iguais.');

    if (!this.validatePasswordStrength.execute(password))
      throw new Error('Senha inválida!');

    const hashedPassword = this.hashToSHA256.hash(password);

    return this.userRepository.create({
      name,
      password: hashedPassword,
      email,
      phone,
    });
  }
}
