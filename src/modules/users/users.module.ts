import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CREATE_USER_REPOSITORY,
  USER_REPOSITORY,
  VALIDATE_PASSWORD_STRENGTH,
  ValidatePasswordStrengthService,
  CREATE_USER,
  CreateUserService,
} from './data';
import {
  FacadeTypeOrmUserRepository,
  TypeOrmCreateUserRepository,
  UserEntity,
} from './infra';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    { provide: CREATE_USER_REPOSITORY, useClass: TypeOrmCreateUserRepository },
    { provide: USER_REPOSITORY, useClass: FacadeTypeOrmUserRepository },
    {
      provide: VALIDATE_PASSWORD_STRENGTH,
      useClass: ValidatePasswordStrengthService,
    },
    { provide: CREATE_USER, useClass: CreateUserService },
  ],
})
export class UsersModule {}
