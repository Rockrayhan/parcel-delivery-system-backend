import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../ultis/catchAsync";
import { sendResponse } from "../../ultis/sendResponse";
import { UserService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved",
    data: result,
  });
});

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await UserService.getMe(decodedToken.userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Your profile Retrieved Successfully",
      data: result.data,
    });
  }
);

// const toggleBlockUser = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { isBlocked } = req.body;

//   const result = await UserService.toggleBlockUser(id, isBlocked);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: `User has been ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
//     data: result,
//   });
// });

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.setBlockStatus(id, true); // block

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `User has been blocked successfully`,
    data: result,
  });
});

const unblockUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.setBlockStatus(id, false); // unblock

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `User has been unblocked successfully`,
    data: result,
  });
});


const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User deleted",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  // toggleBlockUser,
  getMe,
  blockUser,
  unblockUser,
};
