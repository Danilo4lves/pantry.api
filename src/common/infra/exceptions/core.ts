import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorModel } from '~/common/domain';

export class CoreException extends HttpException {
  constructor(status: HttpStatus, error?: ErrorModel, stackTrace?: string) {
    let message = 'Falha ao processar a solicitação';
    const code = 2;

    const hasErrorMessage = !!error && !!error.message;
    const isFriendly = hasErrorMessage && error.code === 2;

    if (hasErrorMessage && isFriendly) {
      message = error.message;
    }

    const exception = { code, message, stackTrace };

    super(exception, status);
  }
}
