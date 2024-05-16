import { Router } from "express";
import { userController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";



const userRouter = Router();

userRouter.route("/register").post(userController.registerUser);

userRouter.route("/login").post(userController.loginUser);

userRouter.route("/reset-password").post(userController.updateUserPassword);

userRouter.route("/reset-password/:token").post(userController.updateUserPasswordValidation);

export default userRouter;

