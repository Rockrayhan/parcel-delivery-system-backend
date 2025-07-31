import { User } from './user.model';
import { IUser } from './user.interface';

const createUser = async (userData: IUser): Promise<IUser> => {
  return await User.create(userData);
};

const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
