import { Router } from "express";
import userRouter from "./userRoute.js";
import noticeRouter from "./noticeRoute.js";
import adsRouter from "./adsRoute.js";
import employeeRouter from "./employeeRoute.js";
import informationRouter from "./informationRoute.js";
import roleRouter from "./roleRoute.js";
import rolePermissionRouter from "./rolePermissionRoute.js";
import uploadFilesRouter from "./utils/uploadFileRoute.js";
import exchangeRouter from "./currencyRoute.js";
import productRouter from "./productRoute.js";
import orderRouter from "./orderRoute.js";
import userProductStatusRouter from "./userProductStatusRoute.js";




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

    {
        path: "/file",
        router: uploadFilesRouter,
    },

    {
        path: "/currency",
        router: exchangeRouter,
    },

    {
        path: "/product",
        router: productRouter,
    },

    {
        path: "/order",
        router: orderRouter,
    },

    {
        path: "/productStatus",
        router: userProductStatusRouter,
    },



    
];

routePath.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;
