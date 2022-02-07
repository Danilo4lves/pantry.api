import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IS_AN_UNTRANSFORMED_RESPONSE_ROUTE } from '~/common/constants';
import { ResponseModel } from '~/common/domain';

@Injectable()
export class ResponseTransformerInterceptor<TDataType>
  implements NestInterceptor<TDataType, ResponseModel<TDataType>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseModel<TDataType>> {
    const isAnUntransformedResponseRoute = this.reflector.get(
      IS_AN_UNTRANSFORMED_RESPONSE_ROUTE,
      context.getHandler(),
    );

    if (isAnUntransformedResponseRoute) {
      return next.handle();
    }

    return next.handle().pipe(
      map(data => {
        const response: ResponseModel = {
          success: true,
          data: data ?? null,
          error: null,
        };

        return response;
      }),
    );
  }
}
