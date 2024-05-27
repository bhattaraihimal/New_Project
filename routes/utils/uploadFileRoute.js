import { Router } from "express";
import { isAuthorize } from "../../middleware/isAuthorize.js";
import upload from "../../middleware/uploadFile.js";
import { uploadController } from "../../controller/index.js";

//files
const uploadFilesRouter = Router();

uploadFilesRouter
  .route("/images/upload")
  .post(
    upload.array("images", 10),
    uploadController.uploadImages
  );

uploadFilesRouter
  .route("/images")
  .get(uploadController.getAllImages);

uploadFilesRouter
  .route("/images/:id")
  .get(uploadController.getImageById);


export default uploadFilesRouter;
