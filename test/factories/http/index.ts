import { axiosHttpResponseFactory } from './axios-http-response.factory';
import { httpHeadersFactory } from './http-headers.factory';

export const httpFactories = {
  axiosHttpResponse: axiosHttpResponseFactory,
  httpHeaders: httpHeadersFactory,
};
