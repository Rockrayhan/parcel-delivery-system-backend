import express from "express";
import { ParcelController } from "./parcel.controller";

const router = express.Router();

router.post("/create", ParcelController.createParcel);
router.get("/", ParcelController.getAllParcels);
router.get("/:id", ParcelController.getSingleParcel);
router.patch("/update/:id", ParcelController.updateParcel);
router.delete("/delete/:id", ParcelController.deleteParcel);

export const ParcelRoutes = router;
