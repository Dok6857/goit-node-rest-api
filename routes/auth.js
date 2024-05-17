// authRouter

import express from "express";
import {register, login} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import {userRegisterSchema} from '../schemas/userValidationSchema.js'

const authRouter = express.Router();

authRouter.post("/register", validateBody(userRegisterSchema), register);
authRouter.post("/login", validateBody(userRegisterSchema), login)

export default authRouter;
