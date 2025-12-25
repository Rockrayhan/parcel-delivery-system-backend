import { Schema, model } from "mongoose";
import { IServiceDocument } from "./service.interface";

const serviceSchema = new Schema<IServiceDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    img_url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = model<IServiceDocument>(
  "Service",
  serviceSchema
);
