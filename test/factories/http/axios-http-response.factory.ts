import { HttpStatus } from '@nestjs/common';

import { AxiosResponse } from 'axios';
import * as faker from 'faker';
import { Factory } from 'fishery';

import { ResponseModel } from '~/common/domain';

export const axiosHttpResponseFactory = Factory.define<
  AxiosResponse<ResponseModel>
>(() => ({
  config: {},
  data: { data: null, error: null, success: true },
  headers: {},
  status: HttpStatus.OK,
  statusText: faker.lorem.word(),
}));
