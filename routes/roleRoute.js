import { Router } from "express";
import { roleController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";

const roleRouter = Router();

roleRouter.route("/create").post(isAuthorize, roleController.createRole);

roleRouter.route("/viewAll").get(roleController.viewAllRole);

roleRouter.route("/view/:id").get(isAuthorize, roleController.viewRole);

roleRouter.route("/update/:id").patch(isAuthorize, roleController.updateRole);

roleRouter.route("/delete/:id").delete(isAuthorize, roleController.deleteRole);

// roleRouter.route("/deleteAll").delete(roleController.deleteAllRole);


export default roleRouter;

