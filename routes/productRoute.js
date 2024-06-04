import { Router } from "express";
import { productController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";


const productRouter = Router();

productRouter.route("/create").post(isAuthorize, productController.createProduct);

productRouter.route("/viewAll").get(isAuthorize, productController.viewAllProducts);

productRouter.route("/view/:id").get(isAuthorize, productController.viewProduct);

productRouter.route("/update/:id").patch(isAuthorize, productController.updateProduct);

productRouter.route("/delete/:id").delete(isAuthorize, productController.deleteProduct);

productRouter.route("/deleteAll").delete(isAuthorize, productController.deleteAllProducts);


export default productRouter;

