"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParcelZodSchema = exports.createParcelZodSchema = void 0;
const zod_1 = require("zod");
const parcel_interface_1 = require("./parcel.interface");
exports.createParcelZodSchema = zod_1.z.object({
    // trackingId: z.string(),
    type: zod_1.z.string(),
    weight: zod_1.z.number().positive(),
    sender: zod_1.z.string(),
    // receiver: z.string(),
    receiverEmail: zod_1.z.string().email(),
    pickupAddress: zod_1.z.string(),
    deliveryAddress: zod_1.z.string(),
    fee: zod_1.z.number().min(0),
    deliveryDate: zod_1.z.coerce.date(),
    // currentStatus: z.nativeEnum(ParcelStatus),
    // statusLogs: z.array(
    //   z.object({
    //     status: z.nativeEnum(ParcelStatus),
    //     timestamp: z.coerce.date(),
    //     updatedBy: z.string(),
    //     note: z.string().optional(),
    //   })
    // ),
    isBlocked: zod_1.z.boolean().optional(),
    isFlagged: zod_1.z.boolean().optional(),
    isHeld: zod_1.z.boolean().optional(),
});
exports.updateParcelZodSchema = zod_1.z.object({
    type: zod_1.z.string().optional(),
    weight: zod_1.z.number().positive().optional(),
    sender: zod_1.z.string().optional(),
    receiver: zod_1.z.string().optional(),
    pickupAddress: zod_1.z.string().optional(),
    deliveryAddress: zod_1.z.string().optional(),
    fee: zod_1.z.number().min(0).optional(),
    deliveryDate: zod_1.z.coerce.date().optional(),
    currentStatus: zod_1.z.nativeEnum(parcel_interface_1.ParcelStatus).optional(),
    note: zod_1.z.string().optional(), // for custom status update notes
    statusLogs: zod_1.z
        .array(zod_1.z.object({
        status: zod_1.z.nativeEnum(parcel_interface_1.ParcelStatus),
        timestamp: zod_1.z.coerce.date(),
        updatedBy: zod_1.z.string(),
        note: zod_1.z.string().optional(),
    }))
        .optional(),
    isBlocked: zod_1.z.boolean().optional(),
    isFlagged: zod_1.z.boolean().optional(),
    isHeld: zod_1.z.boolean().optional(),
});
