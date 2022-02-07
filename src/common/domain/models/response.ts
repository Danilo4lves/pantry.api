import { ErrorModel } from './error';

export interface ResponseModel<TDataType = any> {
  success: boolean;
  data: TDataType | null;
  error: ErrorModel | null;
}
