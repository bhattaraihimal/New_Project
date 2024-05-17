import { Router } from "express";
import userRouter from "./userRoute.js";
import noticeRouter from "./noticeRoute.js";



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
];

routePath.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;
