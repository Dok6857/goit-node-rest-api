// usersRouter

import express from "express";
import { tokenCheck } from "../middleware/tokenCheck.js";
import { repeatVerification, uploadAvatar, verificationByToken } from "../controllers/userControllers.js";
import uploadMIddleware from "../middleware/upload.js";


const usersRouter = express.Router();

usersRouter.patch("/avatars", uploadMIddleware.single("avatar"), tokenCheck, uploadAvatar);
usersRouter.get("/verify/:verificationToken", verificationByToken)
usersRouter.post("/verify", repeatVerification)

export default usersRouter;
