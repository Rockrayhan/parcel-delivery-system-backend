import { Types } from "mongoose";

// export type UserRole = 'admin' | 'sender' | 'receiver';
export enum UserRole {
    ADMIN = "admin",
    SENDER = "sender", 
    RECEIVER = "receiver"
}

export interface IUser {
   _id ?: Types.ObjectId
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isBlocked?: boolean;
}
