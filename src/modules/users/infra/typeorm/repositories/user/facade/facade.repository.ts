import { Inject, Injectable } from '@nestjs/common';

import { DeepPartial } from '~/common/domain';
import {
  CreateUserRepository,
  CREATE_USER_REPOSITORY,
  UserRepository,
} from '~/modules/users/data';
import { UserModel } from '~/modules/users/domain';

@Injectable()
export class FacadeTypeOrmUserRepository implements UserRepository {
  constructor(
    @Inject(CREATE_USER_REPOSITORY)
    private readonly createUserRepository: CreateUserRepository,
  ) {}

  create(user: DeepPartial<UserModel>): Promise<UserModel> {
    return this.createUserRepository.create(user);
  }
}
