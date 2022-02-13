import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CREATE_USER_REPOSITORY, USER_REPOSITORY } from './data';
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
  ],
})
export class UsersModule {}
