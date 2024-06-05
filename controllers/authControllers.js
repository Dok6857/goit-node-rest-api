// authController

import bcrypt from "bcrypt";
import User from "../models/User.js";
import { sendMail } from "../mail/mailFunc.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

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
    const avatarURL = gravatar.url(
      emailInLowerCase,
      { s: "250", d: "retro" },
      true
    );

    const verificationToken = nanoid();
    const user = await User.create({
      email: emailInLowerCase,
      password: passwordHash,
      avatarURL: avatarURL,
      verificationToken,
    });

    sendMail({
      to: emailInLowerCase,
      from: "dok6857@gmail.com",
      subject: "Thank you for registration",
      html: `<h1 style="color: teal">Follow this <a href="http://localhost:3000/api/users/verify/${verificationToken}">link</a> to verify your email</h1>`,
      text: `Follow this link to verify your email http://localhost:3000/api/users/verify/${verificationToken}`,
    });

    res.status(201).send({
      user: {
        email: user.email,
        subscription: user.subscription,
        verificationToken: user.verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  const { email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (!user) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    console.log(`User found with verificationToken: ${user.verificationToken}`);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    if (user.verify === false) {
      return res.status(401).send({ message: "Please verify your email" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();

    res.status(200).send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).send({ message: "Not authorized" });
    }

    user.token = null;
    await user.save();

    res.status(204).send({ message: "User logged out" });
  } catch (error) {
    next(error);
  }
}

export async function getCurrent(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).send({ message: "Not authorized" });
    }

    res.status(200).send({
      email: user.email,
      subscription: user.subscription,
      token: user.token,
    });
  } catch (error) {
    next(error);
  }
}
