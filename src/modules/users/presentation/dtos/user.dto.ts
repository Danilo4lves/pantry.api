import { Exclude, Expose } from 'class-transformer';

import { UserModel } from '../../domain';

@Exclude()
export class UserDTO implements UserModel {
  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  password: string;

  @Expose()
  createdAt: Date;

  @Expose()
  lastUpdatedAt: Date;

  @Expose()
  phone?: number;
}
