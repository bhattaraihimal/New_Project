import { Router } from "express";
import { rolePermissionController } from "../controller/index.js";

const rolePermissionRouter = Router();

rolePermissionRouter.route("/create").post(rolePermissionController.createRolePermission);

rolePermissionRouter.route("/viewAll").get(rolePermissionController.viewAllRolePermissions);

rolePermissionRouter.route("/view/:id").get(rolePermissionController.viewRolePermission);

rolePermissionRouter.route("/update/:id").patch(rolePermissionController.updateRolePermission);

rolePermissionRouter.route("/delete/:id").delete(rolePermissionController.deleteRolePermission);

// rolePermissionRouter.route("/deleteAll").delete(rolePermissionController.deleteAllRolePermission);


export default rolePermissionRouter;

