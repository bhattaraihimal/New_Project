import { Router } from "express";
import { rolePermissionController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";

const rolePermissionRouter = Router();

rolePermissionRouter.route("/create").post(isAuthorize, rolePermissionController.createRolePermission);

rolePermissionRouter.route("/viewAll").get(isAuthorize, rolePermissionController.viewAllRolePermissions);

rolePermissionRouter.route("/view/:id").get(isAuthorize, rolePermissionController.viewRolePermission);

rolePermissionRouter.route("/update/:id").patch(isAuthorize, rolePermissionController.updateRolePermission);

rolePermissionRouter.route("/delete/:id").delete(isAuthorize, rolePermissionController.deleteRolePermission);

// rolePermissionRouter.route("/deleteAll").delete(rolePermissionController.deleteAllRolePermission);


export default rolePermissionRouter;

