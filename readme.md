========== datatables ============

// user Schema 

| Field       | Type    | Required | Description                       |
| ----------- | ------- | -------- | --------------------------------- |
| `name`      | String  | ✅        | Full name of the user             |
| `email`     | String  | ✅        | Unique, used for login            |
| `password`  | String  | ✅        | Hashed using bcrypt               |
| `role`      | Enum    | ✅        | `admin` | `sender` | `receiver`   |
| `isBlocked` | Boolean | ❌        | Optional, default `false`         |
| `createdAt` | Date    | ✅        | Auto-managed                      |
| `updatedAt` | Date    | ✅        | Auto-managed                      |




// parcel schema 


| Field             | Type     | Required | Description                                 |
| ----------------- | -------- | -------- | ------------------------------------------- |
| `trackingId`      | String   | ✅        | Unique, format: `TRK-YYYYMMDD-XXXX`         |
| `type`            | String   | ✅        | e.g., Document, Box, Large Package          |
| `weight`          | Number   | ✅        | Weight in KG                                |
| `sender`          | ObjectId | ✅        | Ref to `User` (sender)                      |
| `receiver`        | ObjectId | ✅        | Ref to `User` (receiver)                    |
| `pickupAddress`   | String   | ✅        | Pickup location                             |
| `deliveryAddress` | String   | ✅        | Delivery location                           |
| `fee`             | Number   | ✅        | Delivery charge                             |
| `deliveryDate`    | Date     | ✅        | Estimated or scheduled delivery date        |
| `currentStatus`   | `enum`   | ✅        | Enum: Requested → Approved → ...            |
| `statusLogs`      | Array    | ✅        | Embedded logs of status changes             |
| `isBlocked`       | Boolean  | ❌        | Optional, for admin control (default false) |
| `isFlagged`       | Boolean  | ❌        | Optional, for admin alert (default false)   |
| `isHeld`          | Boolean  | ❌        | Optional, if held mid-way (default false)   |
| `createdAt`       | Date     | ✅        | Auto-managed by Mongoose                    |
| `updatedAt`       | Date     | ✅        | Auto-managed by Mongoose                    |







export enum ParcelStatus {
  REQUESTED = 'Requested',
  APPROVED = 'Approved',
  DISPATCHED = 'Dispatched',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}



export interface IStatusLog {
  status: ParcelStatus;
  timestamp: Date;
  updatedBy: string; // userId or role name
  note?: string;     // optional message for the log
}
