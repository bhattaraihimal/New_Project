import { Router } from "express";
import { userController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";

const userRouter = Router();

userRouter.route("/verify").post(userController.verifyUserToken);

userRouter.route("/register").post(userController.registerUser);

userRouter.route("/login").post(userController.loginUser);

userRouter
  .route("/reset-password")
  .post(isAuthorize, userController.updateUserPassword);

userRouter
  .route("/reset-password/:token")
  .post(isAuthorize, userController.updateUserPasswordValidation);

userRouter.route("/update/:id").patch(isAuthorize, userController.updateUser);

userRouter.route("/delete/:id").delete(isAuthorize, userController.deleteUser);

userRouter.route("/viewAll").get(isAuthorize, userController.viewAllUsers);

userRouter.route("/view/:id").get(isAuthorize, userController.viewUser);

export default userRouter;
