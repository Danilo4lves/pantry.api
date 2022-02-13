import * as faker from 'faker';

import { httpFactories } from './http';
import { miscellaneousFactories } from './miscellaneous';
import { usersFactories } from './users';

export const factories = {
  faker,
  http: httpFactories,
  miscellaneous: miscellaneousFactories,
  users: usersFactories,
};
