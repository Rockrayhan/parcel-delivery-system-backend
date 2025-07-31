import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status-codes"
import { setAuthCookie } from "../../ultis/setCookie"
import { sendResponse } from "../../ultis/sendResponse"
import { catchAsync } from "../../ultis/catchAsync"
import { AuthServices } from "./auth.service"




const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body)

    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })


    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    // })

    setAuthCookie(res, loginInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo,
    })
})


export const AuthControllers = {
    credentialsLogin,
    // getNewAccessToken,
    // logout,
    // resetPassword,
    // googleCallbackController
}