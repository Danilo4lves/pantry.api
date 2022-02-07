import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IGNORES_EXCEPTIONS_INTERCEPTOR } from '~/common/constants';
import { UnknownException, OperationalException } from '~/common/infra';

@Injectable()
export class ExceptionsInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ignoresInterceptor = this.reflector.get(
      IGNORES_EXCEPTIONS_INTERCEPTOR,
      context.getHandler(),
    );

    if (ignoresInterceptor) {
      return next.handle();
    }

    return next.handle().pipe(
      catchError(exception => {
        if (!(exception instanceof HttpException)) {
          return throwError(() => new UnknownException());
        }

        const exceptionStatusCode = exception.getStatus();
        const exceptionMessage = exception.message;
        const parsedException = new OperationalException(
          exceptionMessage,
          exceptionStatusCode,
        );

        return throwError(() => parsedException);
      }),
    );
  }
}
