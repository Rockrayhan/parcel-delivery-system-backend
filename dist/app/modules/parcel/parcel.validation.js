"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParcelZodSchema = void 0;
const zod_1 = require("zod");
const parcel_interface_1 = require("./parcel.interface");
exports.createParcelZodSchema = zod_1.z.object({
    // trackingId: z.string(),
    type: zod_1.z.string(),
    weight: zod_1.z.number().positive(),
    sender: zod_1.z.string(),
    receiver: zod_1.z.string(),
    pickupAddress: zod_1.z.string(),
    deliveryAddress: zod_1.z.string(),
    fee: zod_1.z.number().min(0),
    deliveryDate: zod_1.z.coerce.date(),
    currentStatus: zod_1.z.nativeEnum(parcel_interface_1.ParcelStatus),
    statusLogs: zod_1.z.array(zod_1.z.object({
        status: zod_1.z.nativeEnum(parcel_interface_1.ParcelStatus),
        timestamp: zod_1.z.coerce.date(),
        updatedBy: zod_1.z.string(),
        note: zod_1.z.string().optional(),
    })),
    isBlocked: zod_1.z.boolean().optional(),
    isFlagged: zod_1.z.boolean().optional(),
    isHeld: zod_1.z.boolean().optional(),
});
