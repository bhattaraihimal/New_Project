import { Router } from "express";
import { adsController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";
import upload from "../middleware/uploadFile.js";

const adsRouter = Router();

adsRouter.route("/create").post(isAuthorize, upload.single("images"), adsController.createAd);

adsRouter.route("/viewAll").get(isAuthorize, adsController.viewAllAds);

adsRouter.route("/view/:id").get(isAuthorize, adsController.viewAd);

adsRouter.route("/update/:id").patch(isAuthorize, upload.single("images"), adsController.updateAd);

adsRouter.route("/delete/:id").delete(isAuthorize, adsController.deleteAd);

adsRouter.route("/deleteAll").delete(isAuthorize, adsController.deleteAllAds);


export default adsRouter;

