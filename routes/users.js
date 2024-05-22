// usersRouter

import express from "express";
import { tokenCheck } from "../middleware/tokenCheck.js";
import { uploadAvatar } from "../controllers/userControllers.js";

const usersRouter = express.Router();

usersRouter.patch("/avatars", tokenCheck, uploadAvatar);

export default usersRouter;
