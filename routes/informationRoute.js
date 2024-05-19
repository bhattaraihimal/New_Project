import { Router } from "express";
import { informationController } from "../controller/index.js";

const informationRouter = Router();

informationRouter.route("/create").post(informationController.createInformation);

informationRouter.route("/viewAll").get(informationController.viewAllInformation);

informationRouter.route("/view/:id").get(informationController.viewInformation);

informationRouter.route("/update/:id").patch(informationController.updateInformation);

informationRouter.route("/delete/:id").delete(informationController.deleteInformation);

informationRouter.route("/deleteAll").delete(informationController.deleteAllInformation);


export default informationRouter;

