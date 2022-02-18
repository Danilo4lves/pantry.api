export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  phone?: number;
}
