import { Router } from "express";
import { userController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";



const userRouter = Router();

userRouter.route("/register").post(userController.registerUser);

userRouter.route("/login").post(userController.loginUser);

userRouter.route("/reset-password").post(userController.updateUserPassword);

userRouter.route("/reset-password/:token").post(userController.updateUserPasswordValidation);

userRouter.route("/update/:id").patch(userController.updateUser);

userRouter.route("/delete/:id").delete(userController.deleteUser);

userRouter.route("/viewAll").get(userController.viewAllUsers);

userRouter.route("/view/:id").get(userController.viewUser);


export default userRouter;

