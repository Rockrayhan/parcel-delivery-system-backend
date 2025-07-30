import { Schema, model } from "mongoose";
import { IParcel } from "./parcel.interface";

const statusLogSchema = new Schema(
  {
    status: { type: String, required: true },
    timestamp: { type: Date, required: true },
    updatedBy: { type: String, required: true },
  },
  { _id: false }
);

const parcelSchema = new Schema<IParcel>(
  {
    type: { type: String, required: true },
    weight: { type: Number, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    fee: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    trackingId: { type: String, required: true, unique: true },
    currentStatus: { type: String, default: "Requested" },
    statusLogs: { type: [statusLogSchema], default: [] },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Parcel = model<IParcel>("Parcel", parcelSchema);
