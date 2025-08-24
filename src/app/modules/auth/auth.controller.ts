import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { setAuthCookie } from "../../ultis/setCookie";
import { sendResponse } from "../../ultis/sendResponse";
import { catchAsync } from "../../ultis/catchAsync";
import { AuthServices } from "./auth.service";
import { envVars } from "../../config/env";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);

    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    // })

    setAuthCookie(res, loginInfo);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged In Successfully",
      data: loginInfo,
    });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    // res.clearCookie("accessToken", {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "lax",
    // });
    // res.clearCookie("refreshToken", {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "lax",
    // });

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production", // true on vercel
      sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged Out Successfully",
      data: null,
    });
  }
);

export const AuthControllers = {
  credentialsLogin,
  logout,
};
