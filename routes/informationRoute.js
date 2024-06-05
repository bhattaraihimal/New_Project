import { Router } from "express";
import { informationController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";
import upload from "../middleware/uploadFile.js";


const informationRouter = Router();

informationRouter.route("/create").post(isAuthorize, informationController.createInformation);

informationRouter.route("/viewAll").get(informationController.viewAllInformation);

informationRouter.route("/view/:id").get(isAuthorize, informationController.viewInformation);

informationRouter.route("/viewUser").get(isAuthorize, informationController.viewUserInformations);


informationRouter.route("/update/:id").patch(isAuthorize, informationController.updateInformation);

informationRouter.route("/delete/:id").delete(isAuthorize, informationController.deleteInformation);

informationRouter.route("/deleteAll").delete(isAuthorize, informationController.deleteAllInformation);


export default informationRouter;

