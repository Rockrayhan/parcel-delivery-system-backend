import { z } from "zod";

export const createParcelZodSchema = z.object({
  body: z.object({
    type: z.string(),
    weight: z.number(),
    sender: z.string(),
    receiver: z.string(),
    pickupAddress: z.string(),
    deliveryAddress: z.string(),
    fee: z.number(),
    deliveryDate: z.string().datetime(), // ISO format date
    trackingId: z.string(),
  }),
});
