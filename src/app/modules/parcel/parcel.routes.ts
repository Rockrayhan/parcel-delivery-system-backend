import { Router } from "express";
import { ParcelController } from "./parcel.controller";

import { createParcelZodSchema } from "./parcel.validation";

const router = Router();

router.post("/create", ParcelController.createParcel);
router.get("/", ParcelController.getAllParcels);
router.get("/:id", ParcelController.getSingleParcel);
router.delete("/:id", ParcelController.deleteParcel);

export const ParcelRoutes = router;
