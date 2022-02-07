import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorModel } from '~/common/domain';

export class OperationalException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    stackTrace?: string,
  ) {
    const exception: ErrorModel = { code: 2, message, stackTrace };

    super(exception, status);
  }
}
