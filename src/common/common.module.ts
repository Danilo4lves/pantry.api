import { HttpModule } from '@nestjs/axios';
import { ClassSerializerInterceptor, Global, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerGuard } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  EVENT,
  EXTRACT_ERROR_FROM_HTTP_RESPONSE,
  HASH_TO_SHA256,
  HTTP_CLIENT,
} from './constants';
import {
  HttpExceptionFilter,
  AxiosExtractErrorFromHttpResponse,
  AxiosHttpClient,
  EventEmitterAdapter,
  CryptojsHashToSHA256,
} from './infra';
import { makeValidationPipe } from './main';
import {
  ExceptionsInterceptor,
  ResponseTransformerInterceptor,
} from './presentation';

@Global()
@Module({
  imports: [
    HttpModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },

    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },

    {
      provide: APP_PIPE,
      useFactory: makeValidationPipe,
    },

    {
      provide: EXTRACT_ERROR_FROM_HTTP_RESPONSE,
      useClass: AxiosExtractErrorFromHttpResponse,
    },
    {
      provide: HTTP_CLIENT,
      useClass: AxiosHttpClient,
    },
    { provide: EVENT, useClass: EventEmitterAdapter },
    { provide: HASH_TO_SHA256, useClass: CryptojsHashToSHA256 },
  ],
  exports: [
    {
      provide: EXTRACT_ERROR_FROM_HTTP_RESPONSE,
      useClass: AxiosExtractErrorFromHttpResponse,
    },
    {
      provide: HTTP_CLIENT,
      useClass: AxiosHttpClient,
    },
    { provide: EVENT, useClass: EventEmitterAdapter },
    { provide: HASH_TO_SHA256, useClass: CryptojsHashToSHA256 },
  ],
})
export class CommonModule {}
