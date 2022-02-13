import { Test, TestingModule } from '@nestjs/testing';

import { ValidatePasswordStrength } from '~/modules/users/domain';
import { factories } from '~/test/factories';

import { VALIDATE_PASSWORD_STRENGTH } from '../../constants';
import { ValidatePasswordStrengthService } from './validate-password-strength.service';

describe('ValidatePasswordStrengthService', () => {
  let sut: ValidatePasswordStrength;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: VALIDATE_PASSWORD_STRENGTH,
          useClass: ValidatePasswordStrengthService,
        },
      ],
    }).compile();

    sut = module.get(VALIDATE_PASSWORD_STRENGTH);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should validate password length', () => {
    const requiredChars = '1Aa@';
    const length = 8;
    const password = factories.faker.datatype.string(length) + requiredChars;
    const expected = password.length >= 8;

    const result = sut.execute(password);

    expect(result).toBe(expected);
  });

  it('should validate at least one upper case char', () => {
    const otherRequiredChars = '1a@';
    const length = 8;
    const password =
      factories.faker.datatype.string(length) + otherRequiredChars;
    const expected = /[A-Z]+/g.test(password);

    const result = sut.execute(password);

    expect(result).toBe(expected);
  });

  it('should validate at least one lower case char', () => {
    const otherRequiredChars = '1A@';
    const length = 8;
    const password =
      factories.faker.datatype.string(length) + otherRequiredChars;
    const expected = /[a-z]+/g.test(password);

    const result = sut.execute(password);

    expect(result).toBe(expected);
  });

  it('should validate at least one special char', () => {
    const otherRequiredChars = '1Aa';
    const length = 8;
    const password =
      factories.faker.datatype.string(length) + otherRequiredChars;
    const expected = /[^0-9a-z]+/gi.test(password);

    const result = sut.execute(password);

    expect(result).toBe(expected);
  });

  it('should validate at least one number', () => {
    const otherRequiredChars = 'Aa@';
    const length = 8;
    const password =
      factories.faker.datatype.string(length) + otherRequiredChars;
    const expected = /\d+/g.test(password);

    const result = sut.execute(password);

    expect(result).toBe(expected);
  });
});
