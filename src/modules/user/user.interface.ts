export interface IUser {
  name?: string;
  email: string;
  password: string;
  phone?: string;
  isActive?: boolean;
  avatar_url?: string;
}