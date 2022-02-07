import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { ResponseModel, ErrorModel } from '~/common/domain';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const httpArgumentHost = host.switchToHttp();
    const response = httpArgumentHost.getResponse();
    const status = exception.getStatus();

    const parsedResponse: ResponseModel = {
      success: false,
      data: null,
      error: exception.getResponse() as ErrorModel,
    };

    response.status(status).json(parsedResponse);
  }
}
