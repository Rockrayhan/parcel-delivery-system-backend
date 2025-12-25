import { IService } from "./service.interface";
import { Service } from "./service.model";

// Create
const createService = async (payload: IService) => {
  return await Service.create(payload);
};

// Get all
const getAllServices = async () => {
  return await Service.find();
};

// Get by ID
const getServiceById = async (id: string) => {
  return await Service.findById(id);
};

// Update
const updateService = async (
  id: string,
  payload: Partial<IService>
) => {
  return await Service.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

// Delete
const deleteService = async (id: string) => {
  return await Service.findByIdAndDelete(id);
};

export const ServiceService = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
