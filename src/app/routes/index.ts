import { Router } from "express";
import { ParcelRoutes } from "../modules/parcel/parcel.routes";
import { UserRoutes } from "../modules/user/user.routes";


export const router = Router();

const moduleRoutes = [
  {
    path: "/parcel",
    route: ParcelRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },

];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});