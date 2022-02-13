import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { DeepPartial } from '~/common/domain';
import { UserRepository } from '~/modules/users/data';
import { UserModel } from '~/modules/users/domain';
import { UserEntity } from '~/modules/users/infra/typeorm/entities';

@Injectable()
export class TypeOrmCreateUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(_user: DeepPartial<UserModel>): Promise<UserModel> {
    const user = this.userRepository.create(_user);

    await this.userRepository.save(user);

    return user;
  }
}
