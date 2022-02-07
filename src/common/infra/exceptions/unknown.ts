import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorModel } from '~/common/domain';

export class UnknownException extends HttpException {
  constructor() {
    const message = 'Falha ao processar a solicitação';
    const status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const exception: ErrorModel = { code: 1, message };

    super(exception, status);
  }
}
