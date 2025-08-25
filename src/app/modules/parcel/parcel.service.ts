import { Parcel } from "./parcel.model";
import { IParcel, IParcelCreateRequest } from "./parcel.interface";
import { ParcelStatus } from "./parcel.interface";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";


function generateTrackingId(): string {
  const date = new Date();
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `TRK-${yyyy}${mm}${dd}-${randomNum}`;
}


// const createParcel = async (payload: Partial<IParcel>) => {
//   const senderId = payload.sender;
//   const sender = await User.findById(senderId);

//   if (!sender) {
//     throw new AppError(httpStatus.NOT_FOUND, "Sender not found.");
//   }

//   if (sender.isBlocked) {
//     throw new AppError(
//       httpStatus.FORBIDDEN,
//       "Blocked users cannot create parcels."
//     );
//   }

//   const trackingId = generateTrackingId();

//   const parcelData = {
//     ...payload,
//     trackingId,
//     currentStatus: "Requested", // initial status
//     statusLogs: [
//       {
//         status: "Requested",
//         timestamp: new Date(),
//         updatedBy: "system",
//         note: "Parcel created",
//       },
//     ],
//   };

//   const parcel = await Parcel.create(parcelData);

//   return parcel;
// };

const createParcel = async (payload: IParcelCreateRequest) => {
  const senderId = payload.sender;
  const sender = await User.findById(senderId);

  if (!sender) {
    throw new AppError(httpStatus.NOT_FOUND, "Sender not found.");
  }
  if (sender.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "Blocked users cannot create parcels.");
  }

  // ✅ Resolve receiver by email
  const receiver = await User.findOne({ email: payload.receiverEmail });
  if (!receiver) {
    throw new AppError(httpStatus.NOT_FOUND, "Receiver not found with this email.");
  }

  const trackingId = generateTrackingId();

  const parcelData: Partial<IParcel> = {
    ...payload,
    receiver: receiver._id,  // store ObjectId in DB
    trackingId,
    currentStatus: ParcelStatus.REQUESTED,
    statusLogs: [
      {
        status: ParcelStatus.REQUESTED,
        timestamp: new Date(),
        updatedBy: "system",
        note: "Parcel created",
      },
    ],
  };

  delete (parcelData as any).receiverEmail; // not in schema

  return await Parcel.create(parcelData);
};




const getAllParcels = async () => {
  const parcels = await Parcel.find()
    .populate("receiver", "name email")  // ✅ fetch only name & email
    .populate("sender", "name email");   // (optional) also show sender info

  const total = await Parcel.countDocuments();

  return {
    meta: {
      total,
    },
    data: parcels,
  };
};




const getSingleParcel = async (id: string): Promise<IParcel | null> => {
  return await Parcel.findById(id);
};






const updateParcel = async (
  id: string,
  payload: Partial<IParcel>
): Promise<IParcel | null> => {
  const parcel = await Parcel.findById(id);
  if (!parcel) throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");

  // Handle status change and log it
  if (payload.currentStatus && payload.currentStatus !== parcel.currentStatus) {
    parcel.statusLogs.push({
      status: payload.currentStatus,
      timestamp: new Date(),
      updatedBy: "admin", // or dynamically from req.user.role
      note: (payload as any).note || `Status updated to ${payload.currentStatus}`,

    });

    parcel.currentStatus = payload.currentStatus;
  }

  // Update other fields directly
  Object.assign(parcel, payload);
  
  await parcel.save();
  return parcel;
};





const getParcelsBySenderId = async (senderId: string) => {
  return await Parcel.find({ sender: senderId });
};


const cancelParcel = async (parcelId: string, senderId: string) => {
  const parcel = await Parcel.findOne({ _id: parcelId, sender: senderId });

  if (!parcel)
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Parcel not found or access denied"
    );

    
if (parcel.currentStatus !== "Requested" && parcel.currentStatus !== "Approved") {
  throw new AppError(
    httpStatus.BAD_REQUEST,
    "Parcel cannot be canceled after dispatch"
  );
}

  parcel.currentStatus = ParcelStatus.CANCELLED;

  parcel.statusLogs.push({
    status: ParcelStatus.CANCELLED,
    timestamp: new Date(),
    updatedBy: "sender",
    note: "Cancelled by sender",
  });

  await parcel.save();
  return parcel;
};

const confirmParcelDelivery = async (parcelId: string, receiverId: string) => {
  const parcel = await Parcel.findOne({ _id: parcelId, receiver: receiverId });

  if (!parcel)
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Parcel not found or access denied"
    );
  if (parcel.currentStatus === "Delivered")
    throw new AppError(httpStatus.BAD_REQUEST, "Already delivered");
  if (parcel.currentStatus === "Cancelled")
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Parcel has Already cancelled by sender, can't confirm. !!"
    );

  if (parcel.isBlocked === true)
    throw new AppError(httpStatus.BAD_REQUEST, " Parcel is blocked ");

  parcel.currentStatus = ParcelStatus.DELIVERED;
  parcel.statusLogs.push({
    status: ParcelStatus.DELIVERED,
    timestamp: new Date(),
    updatedBy: "receiver",
    note: "Confirmed by receiver",
  });

  await parcel.save();
  return parcel;
};


const getIncomingParcelsByReceiver = async (receiverId: string) => {
  return await Parcel.find({
    receiver: receiverId,
    currentStatus: { $nin: ["Cancelled", "Delivered"] }, // exclude these statuses
  })
    .populate("sender", "name email")   // only fetch name & email
    .populate("receiver", "name email"); // same for receiver
};



const toggleParcelBlock = async (parcelId: string, block: boolean) => {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");

  parcel.isBlocked = block;

  parcel.statusLogs.push({
    status: parcel.currentStatus,
    timestamp: new Date(),
    updatedBy: "admin",
    note: block
      ? "Parcel was blocked by admin"
      : "Parcel was unblocked by admin",
  });

  await parcel.save();
  return parcel;
};

const deleteParcel = async (id: string): Promise<IParcel | null> => {
  return await Parcel.findByIdAndDelete(id);
};

export const ParcelService = {
  createParcel,
  getAllParcels,
  getSingleParcel,
  deleteParcel,
  updateParcel,
  getParcelsBySenderId,
  cancelParcel,
  getIncomingParcelsByReceiver,
  confirmParcelDelivery,
  toggleParcelBlock,
};
