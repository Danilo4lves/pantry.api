import { Injectable } from '@nestjs/common';

import { ValidatePasswordStrength } from '~/modules/users/domain';

@Injectable()
export class ValidatePasswordStrengthService
  implements ValidatePasswordStrength
{
  execute(password: string): boolean {
    const isLengthValid = password.length >= 8;
    const hasAtLeastOneUpperCaseChar = /[A-Z]+/g.test(password);
    const hasAtLeastOneLowerCaseChar = /[a-z]+/g.test(password);
    const hasAtLeastOneSpecialChar = /[^0-9a-z]+/gi.test(password);
    const hasAtLeastOneNumber = /\d+/g.test(password);

    return (
      isLengthValid &&
      hasAtLeastOneUpperCaseChar &&
      hasAtLeastOneLowerCaseChar &&
      hasAtLeastOneSpecialChar &&
      hasAtLeastOneNumber
    );
  }
}
