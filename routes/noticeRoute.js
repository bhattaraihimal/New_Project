import { Router } from "express";
import { noticeController } from "../controller/index.js";

const noticeRouter = Router();

noticeRouter.route("/create").post(noticeController.createNotice);

noticeRouter.route("/viewAll").get(noticeController.viewAllNotices);

noticeRouter.route("/view/:id").get(noticeController.viewNotice);

noticeRouter.route("/update/:id").patch(noticeController.updateNotice);

noticeRouter.route("/delete/:id").delete(noticeController.deleteNotice);

noticeRouter.route("/deleteAll").delete(noticeController.deleteAllNotices);


export default noticeRouter;

