import { Router } from "express";
import userRouter from "./userRoute.js";
import noticeRouter from "./noticeRoute.js";
import adsRouter from "./adsRoute.js";
import employeeRouter from "./employeeRoute.js";
import informationRouter from "./informationRoute.js";


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
    
];

routePath.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;
