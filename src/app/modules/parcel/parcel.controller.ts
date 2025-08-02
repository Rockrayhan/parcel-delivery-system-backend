import { Request, Response } from "express";
import { ParcelService } from "./parcel.service";
import { catchAsync } from "../../ultis/catchAsync";
import { sendResponse } from "../../ultis/sendResponse";
import { Parcel } from "./parcel.model";
import { UserRole } from "../user/user.interface";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes"



const createParcel = catchAsync(async (req: Request, res: Response) => {
  const result = await ParcelService.createParcel(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Parcel created successfully",
    data: result,
  });
});




const getAllParcels = catchAsync(async (_req: Request, res: Response) => {
  const result = await ParcelService.getAllParcels();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Parcels retrieved successfully",
    data: result.data,
    meta: result.meta, // pass total count
  });
});


const getSingleParcel = catchAsync(async (req: Request, res: Response) => {
  const result = await ParcelService.getSingleParcel(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Parcel retrieved",
    data: result,
  });
});


const updateParcel = catchAsync(async (req: Request, res: Response) => {
  const result = await ParcelService.updateParcel(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Parcel updated successfully",
    data: result,
  });
});



const getMyParcels = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const role = req.user?.role;

  let parcels;

  if (role === UserRole.SENDER) {
    parcels = await Parcel.find({ sender: userId });
  } else if (role === UserRole.RECEIVER) {
    parcels = await Parcel.find({ receiver: userId });
  } else {
    throw new AppError(httpStatus.FORBIDDEN, "Unauthorized access");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `${role}'s parcels fetched successfully`,
    data: parcels,
  });
};


const cancelParcel = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const parcelId = req.params.id;

  const result = await ParcelService.cancelParcel(parcelId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Parcel cancelled successfully",
    data: result,
  });
});



const getIncomingParcels = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const result = await ParcelService.getIncomingParcelsByReceiver(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Receiver's parcels fetched successfully",
    data: result,
  });
});


const confirmDelivery = catchAsync(async (req: Request, res: Response) => {
  const parcelId = req.params.id;
  const userId = req.user?.userId;

  const result = await ParcelService.confirmParcelDelivery(parcelId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Parcel marked as delivered",
    data: result,
  });
});




const blockParcel = catchAsync(async (req: Request, res: Response) => {
  const parcelId = req.params.id;
  const result = await ParcelService.toggleParcelBlock(parcelId, true);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Parcel blocked successfully",
    data: result,
  });
});

const unblockParcel = catchAsync(async (req: Request, res: Response) => {
  const parcelId = req.params.id;
  const result = await ParcelService.toggleParcelBlock(parcelId, false);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Parcel unblocked successfully",
    data: result,
  });
});





const deleteParcel = catchAsync(async (req: Request, res: Response) => {
  const result = await ParcelService.deleteParcel(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Parcel deleted",
    data: result,
  });
});

export const ParcelController = {
  createParcel,
  getAllParcels,
  getSingleParcel,
  updateParcel,
  deleteParcel,
  getMyParcels,
  cancelParcel,
  getIncomingParcels,
  confirmDelivery,
  blockParcel,
  unblockParcel,
};
