import { Router } from "express";
import multer from "multer";

import * as HomeController from "../controllers/homeController";

// const storageConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./tmp");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + Date.now() + ".jpg");
//   },
// });
// const storageConfig = multer.memoryStorage();

const upload = multer(
  // { storage: storageConfig }
  {
    dest: "./tmp",
    fileFilter: (req, file, cb) => {
      const allawed: string[] = ["image/jpeg", "image/jpg", "image/png"];
      cb(null, allawed.includes(file.mimetype));
    },
    limits: { fileSize: 1000000 },
  }
);

const router = Router();

router.get("/", HomeController.index);
router.post(
  "/upload",
  // upload.fields([
  //   { name: "image", maxCount: 1 },
  //   { name: "images", maxCount: 2 },
  // ]),
  upload.single("image"),
  HomeController.uploadFile
);

export default router;
