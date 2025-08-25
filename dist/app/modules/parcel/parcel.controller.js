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
exports.ParcelController = void 0;
const parcel_service_1 = require("./parcel.service");
const catchAsync_1 = require("../../ultis/catchAsync");
const sendResponse_1 = require("../../ultis/sendResponse");
const parcel_model_1 = require("./parcel.model");
const user_interface_1 = require("../user/user.interface");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const parcel_interface_1 = require("./parcel.interface");
const createParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelService.createParcel(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Parcel created successfully",
        data: result,
    });
}));
const getAllParcels = (0, catchAsync_1.catchAsync)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelService.getAllParcels();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Parcels retrieved successfully",
        data: result.data,
        meta: result.meta, // pass total count
    });
}));
const getSingleParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelService.getSingleParcel(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Parcel retrieved",
        data: result,
    });
}));
const updateParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelService.updateParcel(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Parcel updated successfully",
        data: result,
    });
}));
// const getMyParcels = async (req: Request, res: Response) => {
//   const userId = req.user?.userId;
//   const role = req.user?.role;
//   const status = req.query.status as string; 
//   let filter: any = {};
//   if (role === UserRole.SENDER) {
//     filter.sender = userId;
//   } else if (role === UserRole.RECEIVER) {
//     filter.receiver = userId;
//   } else {
//     throw new AppError(httpStatus.FORBIDDEN, "Unauthorized access");
//   }
//   // check proper filer value
//   if (status && !Object.values(ParcelStatus).includes(status as ParcelStatus)) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Invalid parcel status");
//   }
//   if (status) {
//     filter.currentStatus = status;
//   }
//   const parcels = await Parcel.find(filter);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: `${role}'s parcels fetched successfully`,
//     data: parcels,
//   });
// };
const getMyParcels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    const status = req.query.status;
    let filter = {};
    if (role === user_interface_1.UserRole.SENDER) {
        filter.sender = userId;
    }
    else if (role === user_interface_1.UserRole.RECEIVER) {
        filter.receiver = userId;
    }
    else {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Unauthorized access");
    }
    if (status && !Object.values(parcel_interface_1.ParcelStatus).includes(status)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid parcel status");
    }
    if (status) {
        filter.currentStatus = status;
    }
    // ✅ Populate sender and receiver info
    const parcels = yield parcel_model_1.Parcel.find(filter)
        .populate("sender", "name email") // show sender name & email
        .populate("receiver", "name email"); // show receiver name & email
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: `${role}'s parcels fetched successfully`,
        data: parcels,
    });
});
const trackParcelHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    const { trackingId } = req.params;
    const parcel = yield parcel_model_1.Parcel.findOne({ trackingId });
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
    }
    // Ensure the user is either sender or receiver of the parcel
    if ((role === user_interface_1.UserRole.SENDER && parcel.sender.toString() !== userId) ||
        (role === user_interface_1.UserRole.RECEIVER && parcel.receiver.toString() !== userId)) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Unauthorized access to parcel history");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Parcel tracking history fetched successfully",
        data: parcel.statusLogs,
    });
}));
const cancelParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const parcelId = req.params.id;
    const result = yield parcel_service_1.ParcelService.cancelParcel(parcelId, userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Parcel cancelled successfully",
        data: result,
    });
}));
const getIncomingParcels = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield parcel_service_1.ParcelService.getIncomingParcelsByReceiver(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Receiver's parcels fetched successfully",
        data: result,
    });
}));
const confirmDelivery = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parcelId = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield parcel_service_1.ParcelService.confirmParcelDelivery(parcelId, userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Parcel marked as delivered",
        data: result,
    });
}));
const blockParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcelId = req.params.id;
    const result = yield parcel_service_1.ParcelService.toggleParcelBlock(parcelId, true);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Parcel blocked successfully",
        data: result,
    });
}));
const unblockParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcelId = req.params.id;
    const result = yield parcel_service_1.ParcelService.toggleParcelBlock(parcelId, false);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Parcel unblocked successfully",
        data: result,
    });
}));
const deleteParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelService.deleteParcel(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Parcel deleted",
        data: result,
    });
}));
exports.ParcelController = {
    createParcel,
    getAllParcels,
    getSingleParcel,
    updateParcel,
    deleteParcel,
    getMyParcels,
    cancelParcel,
    getIncomingParcels,
    confirmDelivery,
    blockParcel,
    unblockParcel,
    trackParcelHistory,
};
