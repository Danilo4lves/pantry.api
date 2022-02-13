import * as faker from 'faker';
import { Factory } from 'fishery';

import { UserModel } from '~/modules/users/domain';

import { miscellaneousFactories } from '../miscellaneous';

export const userFactory = Factory.define<UserModel>(() => ({
  id: faker.datatype.number(),
  name: faker.datatype.string(),
  email: faker.datatype.string(),
  createdAt: faker.date.recent(),
  lastUpdatedAt: faker.date.recent(),
  phone: miscellaneousFactories.optional.build(faker.datatype.number()),
}));
