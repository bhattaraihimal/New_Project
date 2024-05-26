import { Router } from "express";
import { employeeController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";
import upload from "../middleware/uploadFile.js";

const employeeRouter = Router();

employeeRouter.route("/create").post(isAuthorize, upload.single('images'), employeeController.createEmployee);

employeeRouter.route("/viewAll").get(isAuthorize, employeeController.viewAllEmployee);

employeeRouter.route("/view/:id").get(isAuthorize, employeeController.viewEmployee);

employeeRouter.route("/update/:id").patch(isAuthorize, upload.single('images'), employeeController.updateEmployee);

employeeRouter.route("/delete/:id").delete(isAuthorize, employeeController.deleteEmployee);

employeeRouter.route("/deleteAll").delete(isAuthorize, employeeController.deleteAllEmployee);


export default employeeRouter;

