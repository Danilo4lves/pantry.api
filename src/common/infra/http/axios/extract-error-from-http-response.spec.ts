import { Test, TestingModule } from '@nestjs/testing';

import { AxiosError } from 'axios';

import { factories } from '~/test/factories';

import { UnknownException } from '../../exceptions';
import { CoreException } from '../../exceptions/core';
import { AxiosExtractErrorFromHttpResponse } from './extract-error-from-http-response';

describe('AxiosExtractErrorFromHttpResponse', () => {
  let sut: AxiosExtractErrorFromHttpResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosExtractErrorFromHttpResponse],
    }).compile();

    sut = module.get(AxiosExtractErrorFromHttpResponse);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return CoreException when response is defined', () => {
    const response = factories.http.axiosHttpResponse.build();

    const error = new Error(factories.faker.lorem.sentence()) as AxiosError;

    error.response = response;
    error.isAxiosError = true;

    const exception = sut.extract(error);

    expect(exception).toBeInstanceOf(CoreException);
  });

  it('should return CoreException with the same error and status as response', () => {
    const response = factories.http.axiosHttpResponse.build({
      data: {
        success: false,
        data: null,
        error: { message: factories.faker.lorem.sentence(), code: 2 },
      },
    });

    const error = new Error(factories.faker.lorem.sentence()) as AxiosError;

    error.response = response;
    error.isAxiosError = true;

    const exception = sut.extract(error);

    expect(exception.getStatus()).toEqual(response.status);
    expect(exception.getResponse()).toEqual(response.data.error);
  });

  it('should return UnknownException when response is undefined', () => {
    const error = new Error(factories.faker.lorem.sentence());

    const exception = sut.extract(error);

    expect(exception).toBeInstanceOf(UnknownException);
  });
});
