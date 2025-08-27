import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";
import AppError from "../../errorHelpers/AppError";
import { createUserTokens } from "../../ultis/userToken";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }

  if (isUserExist.isBlocked) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is blocked. Please contact support."
    );
  }

  // const jwtPayload = {
  //     userId: isUserExist._id,
  //     email: isUserExist.email,
  //     role: isUserExist.role
  // }
  // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

  // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

  const userTokens = createUserTokens(isUserExist);

  // delete isUserExist.password;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = isUserExist.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

export const AuthServices = {
  credentialsLogin,
  // getNewAccessToken,
  // resetPassword
};
