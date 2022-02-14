import * as faker from 'faker';
import { Factory } from 'fishery';

export const validPasswordFactory = Factory.define<string>(() => {
  const length = faker.datatype.number({ min: 4, max: 16 });
  const requiredCharacters = 'aA@1';
  const password = faker.datatype.string(length) + requiredCharacters;

  return password;
});
