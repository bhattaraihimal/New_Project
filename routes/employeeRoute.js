import { Router } from "express";
import { employeeController } from "../controller/index.js";

const employeeRouter = Router();

employeeRouter.route("/create").post(employeeController.createEmployee);

employeeRouter.route("/viewAll").get(employeeController.viewAllEmployee);

employeeRouter.route("/view/:id").get(employeeController.viewEmployee);

employeeRouter.route("/update/:id").patch(employeeController.updateEmployee);

employeeRouter.route("/delete/:id").delete(employeeController.deleteEmployee);

employeeRouter.route("/deleteAll").delete(employeeController.deleteAllEmployee);


export default employeeRouter;

