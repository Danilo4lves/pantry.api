export interface CreateUserPayloadModel {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone?: number;
}
