import { Router } from "express";
import userRouter from "./userRoute.js";




const apiRouter = Router();

const routePath = [
    {
        path: "/user",
        router: userRouter,
    },
];

routePath.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;
