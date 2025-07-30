import { Parcel } from "./parcel.model";
import { IParcel } from "./parcel.interface";

const createParcel = async (payload: IParcel) => {
  const existing = await Parcel.findOne({ trackingId: payload.trackingId });
  if (existing) throw new Error("Tracking ID already exists");

  // Add initial status log
  const statusLog = {
    status: "Requested",
    timestamp: new Date(),
    updatedBy: payload.sender,
  };

  const newParcel = await Parcel.create({
    ...payload,
    currentStatus: "Requested",
    statusLogs: [statusLog],
  });

  return newParcel;
};

const getAllParcels = async () => {
  return await Parcel.find();
};

const getSingleParcel = async (id: string) => {
  return await Parcel.findById(id);
};

const deleteParcel = async (id: string) => {
  return await Parcel.findByIdAndDelete(id);
};

export const ParcelService = {
  createParcel,
  getAllParcels,
  getSingleParcel,
  deleteParcel,
};
