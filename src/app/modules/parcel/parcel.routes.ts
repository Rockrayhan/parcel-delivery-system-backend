import express from "express";
import { ParcelController } from "./parcel.controller";
import { validateRequest } from "../../middlewires/validateRequest";
import { createParcelZodSchema } from "./parcel.validation";
import { UserRole } from "../user/user.interface";
import { checkAuth } from "../../middlewires/checkAuth";

const router = express.Router();


// give them at last-> api with :id params 
router.get("/", checkAuth(UserRole.ADMIN), ParcelController.getAllParcels);
router.post("/create", validateRequest(createParcelZodSchema), checkAuth(UserRole.SENDER, UserRole.ADMIN) ,ParcelController.createParcel);
router.get("/my-parcels", checkAuth(UserRole.SENDER,UserRole.RECEIVER ), ParcelController.getMyParcels);




router.get("/:id", ParcelController.getSingleParcel);
router.patch("/update/:id", ParcelController.updateParcel);
router.delete("/delete/:id", ParcelController.deleteParcel);

export const ParcelRoutes = router;
