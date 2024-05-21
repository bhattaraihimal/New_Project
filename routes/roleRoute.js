import { Router } from "express";
import { roleController } from "../controller/index.js";

const roleRouter = Router();

roleRouter.route("/create").post(roleController.createRole);

roleRouter.route("/viewAll").get(roleController.viewAllRole);

roleRouter.route("/view/:id").get(roleController.viewRole);

roleRouter.route("/update/:id").patch(roleController.updateRole);

roleRouter.route("/delete/:id").delete(roleController.deleteRole);

// roleRouter.route("/deleteAll").delete(roleController.deleteAllRole);


export default roleRouter;

