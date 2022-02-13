import { Module } from '@nestjs/common';

import { CREATE_USER_REPOSITORY, USER_REPOSITORY } from './data';
import {
  FacadeTypeOrmUserRepository,
  TypeOrmCreateUserRepository,
} from './infra';

@Module({
  providers: [
    { provide: CREATE_USER_REPOSITORY, useClass: TypeOrmCreateUserRepository },
    { provide: USER_REPOSITORY, useClass: FacadeTypeOrmUserRepository },
  ],
})
export class UsersModule {}
