import { HttpStatus } from '@nestjs/common';

import { HttpHeaders, HttpMethod } from '~/common/domain';

export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

export interface HttpRequestConfig {
  baseURL?: string;
  url?: string;
  method?: HttpMethod;
  headers?: HttpHeaders;
  data?: any;
  responseType?: ResponseType;
}

export interface HttpResponse<TDataType = any> {
  data: TDataType;
  status: HttpStatus;
  headers: HttpHeaders;
}

export interface HttpClient {
  request<TDataType = any>(
    config: HttpRequestConfig,
  ): Promise<HttpResponse<TDataType>>;
}
