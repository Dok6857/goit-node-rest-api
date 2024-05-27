// middleware upload.js

import multer from "multer";
import path, { basename } from "node:path";
import crypto from "node:crypto";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve("tmp"));
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();

    cb(null, `${basename} - ${suffix}${extname}`);
  },
});
const uploadMIddleware = multer({ storage });
uploadMIddleware.single("avatar");

export default uploadMIddleware;
