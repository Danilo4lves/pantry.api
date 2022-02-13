import { DeepPartial } from '~/common/domain';
import { UserModel } from '~/modules/users/domain';

export interface CreateUserRepository {
  create(user: DeepPartial<UserModel>): Promise<UserModel>;
}
