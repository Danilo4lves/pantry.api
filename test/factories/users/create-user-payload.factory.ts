import * as faker from 'faker';
import { Factory } from 'fishery';

import { CreateUserPayloadModel } from '~/modules/users/domain';

import { miscellaneousFactories } from '../miscellaneous';

export const createUserPayloadFactory = Factory.define<CreateUserPayloadModel>(
  () => ({
    name: faker.datatype.string(),
    email: faker.internet.email(),
    password: faker.datatype.string(),
    passwordConfirmation: faker.datatype.string(),
    phone: miscellaneousFactories.optional.build(
      faker.datatype.number({ min: 11, max: 11 }),
    ),
  }),
);
