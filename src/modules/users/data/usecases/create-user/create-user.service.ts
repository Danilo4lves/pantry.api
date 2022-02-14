import { Inject, Injectable } from '@nestjs/common';

import {
  CreateUser,
  CreateUserPayloadModel,
  UserModel,
  ValidatePasswordStrength,
} from '~/modules/users/domain';

import { USER_REPOSITORY, VALIDATE_PASSWORD_STRENGTH } from '../../constants';
import { UserRepository } from '../../repositories';

@Injectable()
export class CreateUserService implements CreateUser {
  constructor(
    @Inject(VALIDATE_PASSWORD_STRENGTH)
    private readonly validatePasswordStrength: ValidatePasswordStrength,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(payload: CreateUserPayloadModel): Promise<UserModel> {
    const { password, passwordConfirmation } = payload;

    if (password !== passwordConfirmation)
      throw new Error('As senhas não são iguais.');

    if (!this.validatePasswordStrength.execute(password))
      throw new Error('Senha inválida!');

    return this.userRepository.create(payload);
  }
}
