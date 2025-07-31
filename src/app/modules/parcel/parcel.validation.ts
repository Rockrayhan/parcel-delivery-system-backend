import { z } from 'zod';
import { ParcelStatus } from './parcel.interface';

export const createParcelZodSchema = z.object({
  // trackingId: z.string(),
  type: z.string(),
  weight: z.number().positive(),
  sender: z.string(), 
  receiver: z.string(),
  pickupAddress: z.string(),
  deliveryAddress: z.string(),
  fee: z.number().min(0),
  deliveryDate: z.coerce.date(),
  currentStatus: z.nativeEnum(ParcelStatus),
  statusLogs: z.array(
    z.object({
      status: z.nativeEnum(ParcelStatus),
      timestamp: z.coerce.date(),
      updatedBy: z.string(),
      note: z.string().optional(),
    })
  ),
  isBlocked: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  isHeld: z.boolean().optional(),
});
