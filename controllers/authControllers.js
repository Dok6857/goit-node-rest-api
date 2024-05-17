// authController

import bcrypt from "bcrypt";
import User from "../models/user.js";

export async function register(req, res, next) {
  const { name, email, password } = req.body;

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

export async function login(req, res, next) {
  const { email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();

  try {
    const result = await User.findOne({ email: emailInLowerCase });

    if (result === null) {
      console.log('incorrect email');
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, result.password);

    if (isMatch === false) {
      console.log('incorrect password');
      return res.send({ message: "Email or password is incorrect" });
    }

    // токен відправляти тут
    res.status(200).send({ message: "User logged in successfully" });
  } catch (error) {
    next(error);
  }
}
