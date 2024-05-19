// authRouter

import express from "express";
import {register, login, logout, getCurrent} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import {userRegisterSchema} from '../schemas/userValidationSchema.js'
import { tokenCheck } from "../middleware/tokenCheck.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userRegisterSchema), register);
authRouter.post("/login", validateBody(userRegisterSchema), login)
authRouter.post("/logout", tokenCheck, logout)
authRouter.get("/current", tokenCheck, getCurrent)

export default authRouter;
