import { User } from './user.model';
import { IUser } from './user.interface';
import AppError from '../../errorHelpers/AppError';
import httpStatus from "http-status-codes";




const createUser = async (userData: IUser): Promise<IUser> => {
  return await User.create(userData);
};

const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};


const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return {
        data: user
    }
};


// const toggleBlockUser = async (userId: string, isBlocked: boolean) => {
//   const user = await User.findByIdAndUpdate(
//     userId,
//     { isBlocked },
//     { new: true, runValidators: true }
//   );
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }
//   return user;
// };

const setBlockStatus = async (userId: string, isBlocked: boolean) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isBlocked },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

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
  // toggleBlockUser,
  setBlockStatus,
  getMe,
};
