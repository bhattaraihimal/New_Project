import { Router } from "express";
import userRouter from "./userRoute.js";
import noticeRouter from "./noticeRoute.js";
import adsRouter from "./adsRoute.js";
import employeeRouter from "./employeeRoute.js";
import informationRouter from "./informationRoute.js";
import roleRouter from "./roleRoute.js";
import rolePermissionRouter from "./rolePermissionRoute.js";

const apiRouter = Router();

const routePath = [
    {
        path: "/user",
        router: userRouter,
    },
    
    {
        path: "/notice",
        router: noticeRouter,
    },

    {
        path: "/ads",
        router: adsRouter,
    },

    {
        path: "/employee",
        router: employeeRouter,
    },

    {
        path: "/information",
        router: informationRouter,
    },

    {
        path: "/role",
        router: roleRouter,
    },

    {
        path: "/rolePermission",
        router: rolePermissionRouter,
    },
    
];

routePath.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;
