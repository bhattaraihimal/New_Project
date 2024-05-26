import { Router } from "express";
import { noticeController } from "../controller/index.js";
import { isAuthorize } from "../middleware/isAuthorize.js";
import upload from "../middleware/uploadFile.js";


const noticeRouter = Router();

noticeRouter.route("/create").post(isAuthorize, noticeController.createNotice);

noticeRouter.route("/viewAll").get(isAuthorize, noticeController.viewAllNotices);

noticeRouter.route("/view/:id").get(isAuthorize, noticeController.viewNotice);

noticeRouter.route("/update/:id").patch(isAuthorize, noticeController.updateNotice);

noticeRouter.route("/delete/:id").delete(isAuthorize, noticeController.deleteNotice);

noticeRouter.route("/deleteAll").delete(isAuthorize, noticeController.deleteAllNotices);


export default noticeRouter;

