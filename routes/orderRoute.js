import { Router } from "express";
import { orderController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";


const orderRouter = Router();

orderRouter.route("/create").post(isAuthorize, orderController.createOrder);

orderRouter.route("/viewAll").get(isAuthorize, orderController.viewAllOrders);

orderRouter.route("/view/:id").get(isAuthorize, orderController.viewOrder);

orderRouter.route("/update/:id").patch(isAuthorize, orderController.updateOrder);

orderRouter.route("/delete/:id").delete(isAuthorize, orderController.deleteOrder);

orderRouter.route("/deleteAll").delete(isAuthorize, orderController.deleteAllOrders);


export default orderRouter;

