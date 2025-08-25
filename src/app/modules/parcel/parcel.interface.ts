import { Types } from 'mongoose';

export enum ParcelStatus {
  REQUESTED = 'Requested',
  APPROVED = 'Approved',
  DISPATCHED = 'Dispatched',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  RETURNED     = 'Returned',    
}

export interface IStatusLog {
  status: ParcelStatus;
  timestamp: Date;
  updatedBy: string;
  note?: string;
}

export interface IParcel {
  trackingId: string;
  type: string;
  weight: number;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  pickupAddress: string;
  deliveryAddress: string;
  fee: number;
  deliveryDate: Date;
  currentStatus: ParcelStatus;
  statusLogs: IStatusLog[];
  isBlocked?: boolean;
  isFlagged?: boolean;
  isHeld?: boolean;
}


// ✅ New: Request interface for createParcel API
export interface IParcelCreateRequest extends Partial<IParcel> {
  receiverEmail: string; // email instead of ObjectId
}