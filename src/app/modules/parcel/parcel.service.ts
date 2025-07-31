// parcel.service.ts
import { Parcel } from "./parcel.model";
import { IParcel } from "./parcel.interface";
import { ParcelStatus } from "./parcel.interface";

// const createParcel = async (payload: IParcel): Promise<IParcel> => {
//   // Auto-push first log into statusLogs
//   const initialStatusLog = {
//     status: payload.currentStatus || ParcelStatus.REQUESTED,
//     timestamp: new Date(),
//     updatedBy: "system", // Replace with user ID or role if available
//     note: "Parcel created",
//   };

//   const newParcel = new Parcel({
//     ...payload,
//     currentStatus: payload.currentStatus || ParcelStatus.REQUESTED,
//     statusLogs: [initialStatusLog],
//   });

//   return await newParcel.save();
// };

function generateTrackingId(): string {
  const date = new Date();
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 digit random number
  return `TRK-${yyyy}${mm}${dd}-${randomNum}`;
}

const createParcel = async (payload: Partial<IParcel>) => {
  // generate trackingId automatically
  const trackingId = generateTrackingId();

  const parcelData = {
    ...payload,
    trackingId,
    currentStatus: "Requested", // initial status
    statusLogs: [
      {
        status: "Requested",
        timestamp: new Date(),
        updatedBy: "system",
        note: "Parcel created",
      },
    ],
  };

  // Then create in DB
  const parcel = await Parcel.create(parcelData);

  return parcel;
};

const getAllParcels = async () => {
  const parcels = await Parcel.find();
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
  const parcel = await Parcel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return parcel;
};


const getParcelsBySenderId = async (senderId: string) => {
  return await Parcel.find({ sender: senderId });
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
};
