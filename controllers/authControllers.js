// authController

import bcrypt from "bcrypt";
import User from "../models/user.js";
import { userRegisterSchema } from "../schemas/userValidationSchema.js";

async function register(req, res, next) {
  const { name, email, password } = req.body;
  const { error } = userRegisterSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const emailInLowerCase = email.toLowerCase();

  try {
    const result = await User.findOne({ email: emailInLowerCase });
    console.log(result);

    if (result !== null) {
      return res.status(409).send({ message: "User already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: emailInLowerCase,
      password: passwordHash,
    });

    console.log("User created:", user);
    res.status(201).send({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
}

export default register;
