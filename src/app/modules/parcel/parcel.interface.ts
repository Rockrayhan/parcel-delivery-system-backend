export interface IStatusLog {
  status: string;
  timestamp: Date;
  updatedBy: string;
}

export interface IParcel {
  type: string;
  weight: number;
  sender: string; // User ID or name
  receiver: string; // User ID or name
  pickupAddress: string;
  deliveryAddress: string;
  fee: number;
  deliveryDate: Date;
  trackingId: string;
  currentStatus?: string;
  statusLogs?: IStatusLog[];
  isBlocked?: boolean;
}
