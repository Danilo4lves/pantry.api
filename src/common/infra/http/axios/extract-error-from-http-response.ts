import { HttpException, Injectable } from '@nestjs/common';

import { AxiosError, AxiosResponse } from 'axios';

import { ExtractErrorFromHttpResponse } from '~/common/data';
import { ResponseModel } from '~/common/domain';

import { UnknownException } from '../../exceptions';
import { CoreException } from '../../exceptions/core';

@Injectable()
export class AxiosExtractErrorFromHttpResponse
  implements ExtractErrorFromHttpResponse
{
  extract(error: AxiosError): HttpException;
  extract(error: Error): HttpException;

  extract(error: AxiosError): HttpException {
    if (error.response) {
      const response: AxiosResponse<ResponseModel> = error.response;

      const { data, status } = response;

      return new CoreException(status, data?.error);
    }

    return new UnknownException();
  }
}
