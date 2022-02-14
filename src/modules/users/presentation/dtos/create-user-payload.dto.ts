import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

import { CreateUserPayloadModel } from '../../domain';

@Expose()
export class CreateUserPayloadDTO implements CreateUserPayloadModel {
  constructor(partial: Partial<CreateUserPayloadDTO>) {
    Object.assign(this, partial);
  }

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;

  @IsOptional()
  @IsNumber()
  phone?: number;
}
