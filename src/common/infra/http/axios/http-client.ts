import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

import { HttpClient, HttpRequestConfig, HttpResponse } from '~/common/data';

@Injectable()
export class AxiosHttpClient implements HttpClient {
  constructor(private readonly httpService: HttpService) {}

  request<TDataType = any>(
    config: HttpRequestConfig,
  ): Promise<HttpResponse<TDataType>> {
    const requestBody = this.getRequestBody(config);

    return firstValueFrom(
      this.httpService.request({ ...config, data: requestBody }),
    );
  }

  private getRequestBody(config: HttpRequestConfig): any {
    if (config.data) {
      return config.data;
    }

    const isPost = config.method === 'post' || config.method === 'POST';

    if (isPost) {
      return {};
    }

    return undefined;
  }
}
