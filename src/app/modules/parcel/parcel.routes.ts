import express from "express";
import { ParcelController } from "./parcel.controller";
import { validateRequest } from "../../middlewires/validateRequest";
import { createParcelZodSchema, updateParcelZodSchema } from "./parcel.validation";
import { UserRole } from "../user/user.interface";
import { checkAuth } from "../../middlewires/checkAuth";

const router = express.Router();


// give them at last-> api with :id params 

// admin
router.get("/", checkAuth(UserRole.ADMIN), ParcelController.getAllParcels);

// sender
router.post("/create", validateRequest(createParcelZodSchema), checkAuth(UserRole.SENDER) ,ParcelController.createParcel);

// sender  & receiver // check history
router.get("/my-parcels", checkAuth(UserRole.SENDER, UserRole.RECEIVER), ParcelController.getMyParcels);

// receiver
router.get("/incoming", checkAuth(UserRole.RECEIVER), ParcelController.getIncomingParcels);


// Sender & Receiver both can see parcel status history
router.get("/track/:trackingId", checkAuth(UserRole.SENDER, UserRole.RECEIVER), ParcelController.trackParcelHistory);


// sender
router.patch("/cancel/:id", checkAuth(UserRole.SENDER),  ParcelController.cancelParcel);


// receiver
router.patch("/confirm/:id", checkAuth(UserRole.RECEIVER), ParcelController.confirmDelivery);


// admin
router.patch("/block/:id", checkAuth(UserRole.ADMIN),  ParcelController.blockParcel);
router.patch("/unblock/:id", checkAuth(UserRole.ADMIN),  ParcelController.unblockParcel);



// router.get("/:id", ParcelController.getSingleParcel);
router.patch("/update/:id", checkAuth(UserRole.ADMIN), validateRequest(updateParcelZodSchema), ParcelController.updateParcel);
router.delete("/delete/:id",  checkAuth(UserRole.ADMIN),  ParcelController.deleteParcel);

export const ParcelRoutes = router;
