import { Router } from "express";
import { userProductStatusController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";


const userProductStatusRouter = Router();

// productRouter.route("/create").post(isAuthorize, productController.createProduct);

userProductStatusRouter.route("/viewAll").get(isAuthorize, userProductStatusController.viewAllUserProductStatus);

userProductStatusRouter.route("/view/:id").get(isAuthorize, userProductStatusController.viewUserProductStatus);

// productRouter.route("/update/:id").patch(isAuthorize, productController.updateProduct);

userProductStatusRouter.route("/delete/:id").delete(isAuthorize, userProductStatusController.deleteUserProductStatus);

userProductStatusRouter.route("/deleteAll").delete(isAuthorize, userProductStatusController.deleteAllUserProductStatus);


export default userProductStatusRouter;

