import { Types } from "mongoose";

export interface IService {
  title: string;
  img_url: string;
  description: string;
}

export interface IServiceDocument extends IService {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
