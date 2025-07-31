import express from "express";
import { ParcelController } from "./parcel.controller";
import { validateRequest } from "../../middlewires/validateRequest";
import { createParcelZodSchema } from "./parcel.validation";
import { UserRole } from "../user/user.interface";
import { checkAuth } from "../../middlewires/checkAuth";

const router = express.Router();


// give them at last-> api with :id params 
router.post("/create", validateRequest(createParcelZodSchema), ParcelController.createParcel);
router.get("/", checkAuth(UserRole.ADMIN), ParcelController.getAllParcels);
router.get("/my-parcels",checkAuth(UserRole.SENDER),ParcelController.getMyParcels);




router.get("/:id", ParcelController.getSingleParcel);
router.patch("/update/:id", ParcelController.updateParcel);
router.delete("/delete/:id", ParcelController.deleteParcel);

export const ParcelRoutes = router;
