import { Schema, model } from 'mongoose';
import { IParcel, IStatusLog, ParcelStatus } from './parcel.interface';

const statusLogSchema = new Schema<IStatusLog>(
  {
    status: {
      type: String,
      enum: Object.values(ParcelStatus),
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
  },
  { _id: false }
);

const parcelSchema = new Schema<IParcel>(
  {
    trackingId: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    weight: { type: Number, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    fee: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    currentStatus: {
      type: String,
      enum: Object.values(ParcelStatus),
      required: true,
    },
    statusLogs: { type: [statusLogSchema], required: true },
    isBlocked: { type: Boolean, default: false },
    isFlagged: { type: Boolean, default: false },
    isHeld: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Parcel = model<IParcel>('Parcel', parcelSchema);
