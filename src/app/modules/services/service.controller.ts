import { Request, Response } from "express";
import { ServiceService } from "./service.service";

// Create
export const createService = async (req: Request, res: Response) => {
  const result = await ServiceService.createService(req.body);

  res.status(201).json({
    success: true,
    message: "Service created successfully",
    data: result,
  });
};

// Get all
export const getAllServices = async (_req: Request, res: Response) => {
  const result = await ServiceService.getAllServices();

  res.status(200).json({
    success: true,
    data: result,
  });
};

// Get by ID
export const getServiceById = async (req: Request, res: Response) => {
  const result = await ServiceService.getServiceById(req.params.id);

  res.status(200).json({
    success: true,
    data: result,
  });
};

// Update
export const updateService = async (req: Request, res: Response) => {
  const result = await ServiceService.updateService(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Service updated successfully",
    data: result,
  });
};

// Delete
export const deleteService = async (req: Request, res: Response) => {
  await ServiceService.deleteService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
};
