import { z } from "zod";
import { ParcelStatus } from "./parcel.interface";

export const createParcelZodSchema = z.object({
  // trackingId: z.string(),
  type: z.string(),
  weight: z.number().positive(),
  sender: z.string(),
  // receiver: z.string(),
  receiverEmail: z.string().email(),
  pickupAddress: z.string(),
  deliveryAddress: z.string(),
  fee: z.number().min(0),
  deliveryDate: z.coerce.date(),


  // currentStatus: z.nativeEnum(ParcelStatus),
  // statusLogs: z.array(
  //   z.object({
  //     status: z.nativeEnum(ParcelStatus),
  //     timestamp: z.coerce.date(),
  //     updatedBy: z.string(),
  //     note: z.string().optional(),
  //   })
  // ),


  isBlocked: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  isHeld: z.boolean().optional(),
});

export const updateParcelZodSchema = z.object({
  type: z.string().optional(),
  weight: z.number().positive().optional(),
  sender: z.string().optional(),
  receiver: z.string().optional(),
  pickupAddress: z.string().optional(),
  deliveryAddress: z.string().optional(),
  fee: z.number().min(0).optional(),
  deliveryDate: z.coerce.date().optional(),
  currentStatus: z.nativeEnum(ParcelStatus).optional(),
  note: z.string().optional(), // for custom status update notes

  statusLogs: z
    .array(
      z.object({
        status: z.nativeEnum(ParcelStatus),
        timestamp: z.coerce.date(),
        updatedBy: z.string(),
        note: z.string().optional(),
      })
    )
    .optional(),

  isBlocked: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  isHeld: z.boolean().optional(),
});
