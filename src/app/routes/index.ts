import { Router } from "express";
import { ParcelRoutes } from "../modules/parcel/parcel.routes";


export const router = Router();

const moduleRoutes = [
  {
    path: "/parcel",
    route: ParcelRoutes,
  },

];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});