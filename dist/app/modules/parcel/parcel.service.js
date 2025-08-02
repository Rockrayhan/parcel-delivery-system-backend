"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelService = void 0;
// parcel.service.ts
const parcel_model_1 = require("./parcel.model");
const parcel_interface_1 = require("./parcel.interface");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = require("../user/user.model");
// const createParcel = async (payload: IParcel): Promise<IParcel> => {
//   // Auto-push first log into statusLogs
//   const initialStatusLog = {
//     status: payload.currentStatus || ParcelStatus.REQUESTED,
//     timestamp: new Date(),
//     updatedBy: "system", // Replace with user ID or role if available
//     note: "Parcel created",
//   };
//   const newParcel = new Parcel({
//     ...payload,
//     currentStatus: payload.currentStatus || ParcelStatus.REQUESTED,
//     statusLogs: [initialStatusLog],
//   });
//   return await newParcel.save();
// };
function generateTrackingId() {
    const date = new Date();
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `TRK-${yyyy}${mm}${dd}-${randomNum}`;
}
const createParcel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const senderId = payload.sender;
    const sender = yield user_model_1.User.findById(senderId);
    if (!sender) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Sender not found.");
    }
    if (sender.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Blocked users cannot create parcels.");
    }
    const trackingId = generateTrackingId();
    const parcelData = Object.assign(Object.assign({}, payload), { trackingId, currentStatus: "Requested", statusLogs: [
            {
                status: "Requested",
                timestamp: new Date(),
                updatedBy: "system",
                note: "Parcel created",
            },
        ] });
    // Step 4: Create parcel in DB
    const parcel = yield parcel_model_1.Parcel.create(parcelData);
    return parcel;
});
const getAllParcels = () => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find();
    const total = yield parcel_model_1.Parcel.countDocuments();
    return {
        meta: {
            total,
        },
        data: parcels,
    };
});
const getSingleParcel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield parcel_model_1.Parcel.findById(id);
});
const updateParcel = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return parcel;
});
const getParcelsBySenderId = (senderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield parcel_model_1.Parcel.find({ sender: senderId });
});
const cancelParcel = (parcelId, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findOne({ _id: parcelId, sender: senderId });
    if (!parcel)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found or access denied");
    if (parcel.currentStatus !== "Requested") {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Parcel cannot be canceled after dispatch");
    }
    parcel.currentStatus = parcel_interface_1.ParcelStatus.CANCELLED;
    parcel.statusLogs.push({
        status: parcel_interface_1.ParcelStatus.CANCELLED,
        timestamp: new Date(),
        updatedBy: "sender",
        note: "Cancelled by sender",
    });
    yield parcel.save();
    return parcel;
});
const confirmParcelDelivery = (parcelId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findOne({ _id: parcelId, receiver: receiverId });
    if (!parcel)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found or access denied");
    if (parcel.currentStatus === "Delivered")
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Already delivered");
    if (parcel.currentStatus === "Cancelled")
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Parcel has Already cancelled by sender, can't confirm. !!");
    if (parcel.isBlocked === true)
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, " Parcel is blocked ");
    parcel.currentStatus = parcel_interface_1.ParcelStatus.DELIVERED;
    parcel.statusLogs.push({
        status: parcel_interface_1.ParcelStatus.DELIVERED,
        timestamp: new Date(),
        updatedBy: "receiver",
        note: "Confirmed by receiver",
    });
    yield parcel.save();
    return parcel;
});
const getIncomingParcelsByReceiver = (receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield parcel_model_1.Parcel.find({
        receiver: receiverId,
        currentStatus: { $nin: ["Cancelled", "Delivered"] }, // exclude these statuses
    });
});
const toggleParcelBlock = (parcelId, block) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
    parcel.isBlocked = block;
    parcel.statusLogs.push({
        status: parcel.currentStatus,
        timestamp: new Date(),
        updatedBy: "admin",
        note: block
            ? "Parcel was blocked by admin"
            : "Parcel was unblocked by admin",
    });
    yield parcel.save();
    return parcel;
});
const deleteParcel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield parcel_model_1.Parcel.findByIdAndDelete(id);
});
exports.ParcelService = {
    createParcel,
    getAllParcels,
    getSingleParcel,
    deleteParcel,
    updateParcel,
    getParcelsBySenderId,
    cancelParcel,
    getIncomingParcelsByReceiver,
    confirmParcelDelivery,
    toggleParcelBlock,
};
