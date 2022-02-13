export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  phone?: number;
}
