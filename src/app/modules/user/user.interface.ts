export type UserRole = 'admin' | 'sender' | 'receiver';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isBlocked?: boolean;
}
