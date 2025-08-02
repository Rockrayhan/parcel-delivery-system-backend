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



const toggleBlockUser = async (
  userId: string,
  block: boolean
): Promise<IUser | null> => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.isBlocked = block;
  await user.save();
  return user;
};


const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  toggleBlockUser
};
