import { createUserPayloadFactory } from './create-user-payload.factory';
import { userFactory } from './user.factory';

export const usersFactories = {
  createUserPayload: createUserPayloadFactory,
  user: userFactory,
};
