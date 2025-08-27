import { Request, Response } from "express";
import { ParcelService } from "./parcel.service";
import { catchAsync } from "../../ultis/catchAsync";
import { sendResponse } from "../../ultis/sendResponse";
import { Parcel } from "./parcel.model";
import { UserRole } from "../user/user.interface";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { ParcelStatus } from "./parcel.interface";

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




// const updateParcel = catchAsync(async (req: Request, res: Response) => {
//   const result = await ParcelService.updateParcel(req.params.id, req.body);
//   console.log("REQ BODY:", req.body);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Parcel updated successfully",
//     data: result,
//   });
// });



const updateParcelStatus = async (req: Request, res: Response) => {
  try {
    const parcelId = req.params.id;
    
    console.log(req.body);
    
    // Alternative way to access the body
    const currentStatus = req.body.currentStatus;
    
    // Or even more defensive:
    // const currentStatus = req.body?.currentStatus;

    if (!currentStatus) {
      return res.status(400).json({ 
        success: false,
        message: "currentStatus is required in the request body" 
      });
    }

    const updatedParcel = await ParcelService.updateParcelStatus(parcelId, currentStatus);

    res.status(200).json({
      success: true,
      message: "Parcel status updated successfully",
      data: updatedParcel,
    });
  } catch (err: any) {
    console.error("Update Parcel Status Error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to update parcel status",
      error: err.message 
    });
  }
};



// const getMyParcels = async (req: Request, res: Response) => {
//   const userId = req.user?.userId;
//   const role = req.user?.role;
//   const status = req.query.status as string; 

//   let filter: any = {};

//   if (role === UserRole.SENDER) {
//     filter.sender = userId;
//   } else if (role === UserRole.RECEIVER) {
//     filter.receiver = userId;
//   } else {
//     throw new AppError(httpStatus.FORBIDDEN, "Unauthorized access");
//   }


//   // check proper filer value
//   if (status && !Object.values(ParcelStatus).includes(status as ParcelStatus)) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Invalid parcel status");
//   }



//   if (status) {
//     filter.currentStatus = status;
//   }

//   const parcels = await Parcel.find(filter);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: `${role}'s parcels fetched successfully`,
//     data: parcels,
//   });
// };


const getMyParcels = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const role = req.user?.role;
  const status = req.query.status as string;

  let filter: any = {};

  if (role === UserRole.SENDER) {
    filter.sender = userId;
  } else if (role === UserRole.RECEIVER) {
    filter.receiver = userId;
  } else {
    throw new AppError(httpStatus.FORBIDDEN, "Unauthorized access");
  }

  if (status && !Object.values(ParcelStatus).includes(status as ParcelStatus)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid parcel status");
  }

  if (status) {
    filter.currentStatus = status;
  }

  // ✅ Populate sender and receiver info
  const parcels = await Parcel.find(filter)
    .populate("sender", "name email")    // show sender name & email
    .populate("receiver", "name email"); // show receiver name & email

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `${role}'s parcels fetched successfully`,
    data: parcels,
  });
};




const trackParcelHistory = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const role = req.user?.role;
  const { trackingId } = req.params;

  const parcel = await Parcel.findOne({ trackingId });

  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");
  }

  // Ensure the user is either sender or receiver of the parcel
  // if (
  //   (role === UserRole.SENDER && parcel.sender.toString() !== userId) ||
  //   (role === UserRole.RECEIVER && parcel.receiver.toString() !== userId)
  // ) {
  //   throw new AppError(
  //     httpStatus.FORBIDDEN,
  //     "Unauthorized access to parcel history"
  //   );
  // }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Parcel tracking history fetched successfully",
    data: parcel.statusLogs,
  });
});




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
  // updateParcel,
  deleteParcel,
  getMyParcels,
  cancelParcel,
  getIncomingParcels,
  confirmDelivery,
  blockParcel,
  unblockParcel,
  trackParcelHistory,
  updateParcelStatus,
};
