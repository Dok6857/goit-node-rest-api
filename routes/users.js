// usersRouter

import express from "express";
import { tokenCheck } from "../middleware/tokenCheck.js";
import { uploadAvatar } from "../controllers/userControllers.js";
import uploadMIddleware from "../middleware/upload.js";


const usersRouter = express.Router();

usersRouter.patch("/avatars", uploadMIddleware.single("avatar"), tokenCheck, uploadAvatar);

export default usersRouter;
