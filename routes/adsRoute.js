import { Router } from "express";
import { adsController } from "../controller/index.js";

const adsRouter = Router();

adsRouter.route("/create").post(adsController.createAd);

adsRouter.route("/viewAll").get(adsController.viewAllAds);

adsRouter.route("/view/:id").get(adsController.viewAd);

adsRouter.route("/update/:id").patch(adsController.updateAd);

adsRouter.route("/delete/:id").delete(adsController.deleteAd);

adsRouter.route("/deleteAll").delete(adsController.deleteAllAds);


export default adsRouter;

