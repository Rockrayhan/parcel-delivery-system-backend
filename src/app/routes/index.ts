import { Router } from "express";
import { ParcelRoutes } from "../modules/parcel/parcel.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ServiceRoutes } from "../modules/services/service.route";


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
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },

];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});