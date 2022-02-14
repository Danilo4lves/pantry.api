import { CreateUserPayloadModel, UserModel } from '../models';

export interface CreateUser {
  execute(payload: CreateUserPayloadModel): Promise<UserModel>;
}
