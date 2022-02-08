export interface UserModel {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  phone?: number;
}
