"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelRoutes = void 0;
const express_1 = __importDefault(require("express"));
const parcel_controller_1 = require("./parcel.controller");
const validateRequest_1 = require("../../middlewires/validateRequest");
const parcel_validation_1 = require("./parcel.validation");
const user_interface_1 = require("../user/user.interface");
const checkAuth_1 = require("../../middlewires/checkAuth");
const router = express_1.default.Router();
// give them at last-> api with :id params 
// admin
router.get("/", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), parcel_controller_1.ParcelController.getAllParcels);
// sender
router.post("/create", (0, validateRequest_1.validateRequest)(parcel_validation_1.createParcelZodSchema), (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.SENDER), parcel_controller_1.ParcelController.createParcel);
// sender  & receiver // check history
router.get("/my-parcels", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.SENDER, user_interface_1.UserRole.RECEIVER), parcel_controller_1.ParcelController.getMyParcels);
// receiver
router.get("/incoming", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.RECEIVER), parcel_controller_1.ParcelController.getIncomingParcels);
// Sender & Receiver both can see parcel status history
router.get("/track/:trackingId", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.SENDER, user_interface_1.UserRole.RECEIVER), parcel_controller_1.ParcelController.trackParcelHistory);
// sender
router.patch("/cancel/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.SENDER), parcel_controller_1.ParcelController.cancelParcel);
// receiver
router.patch("/confirm/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.RECEIVER), parcel_controller_1.ParcelController.confirmDelivery);
// admin
router.patch("/block/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), parcel_controller_1.ParcelController.blockParcel);
router.patch("/unblock/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), parcel_controller_1.ParcelController.unblockParcel);
router.get("/:id", parcel_controller_1.ParcelController.getSingleParcel);
router.patch("/update/:id", parcel_controller_1.ParcelController.updateParcel);
router.delete("/delete/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), parcel_controller_1.ParcelController.deleteParcel);
exports.ParcelRoutes = router;
