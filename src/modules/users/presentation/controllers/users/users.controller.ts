import { Body, Controller, Inject, Post } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { CREATE_USER } from '~/modules/users/data';
import { CreateUser } from '~/modules/users/domain';

import { CreateUserPayloadDTO, UserDTO } from '../../dtos';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(CREATE_USER)
    private readonly createUser: CreateUser,
  ) {}

  @Post()
  async store(@Body() dto: CreateUserPayloadDTO): Promise<UserDTO> {
    const user = await this.createUser.execute(dto);

    return plainToClass(UserDTO, user);
  }
}
