import * as faker from 'faker';

import { httpFactories } from './http';
import { miscellaneousFactories } from './miscellaneous';

export const factories = {
  faker,
  http: httpFactories,
  miscellaneous: miscellaneousFactories,
};
