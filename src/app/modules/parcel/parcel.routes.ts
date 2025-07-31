import express from "express";
import { ParcelController } from "./parcel.controller";
import { validateRequest } from "../../middlewires/validateRequest";
import { createParcelZodSchema } from "./parcel.validation";

const router = express.Router();

router.post("/create", validateRequest(createParcelZodSchema), ParcelController.createParcel);
router.get("/", ParcelController.getAllParcels);
router.get("/:id", ParcelController.getSingleParcel);
router.patch("/update/:id", ParcelController.updateParcel);
router.delete("/delete/:id", ParcelController.deleteParcel);

export const ParcelRoutes = router;
