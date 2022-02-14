import { Body, Controller, Inject, Post } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { UserRepository, USER_REPOSITORY } from '~/modules/users/data';

import { CreateUserPayloadDTO, UserDTO } from '../../dtos';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  async store(@Body() dto: CreateUserPayloadDTO): Promise<UserDTO> {
    const user = await this.userRepository.create(dto);

    return plainToClass(UserDTO, user);
  }
}
