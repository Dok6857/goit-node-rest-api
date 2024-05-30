// userController

import * as fs from "node:fs/promises";
import path from "node:path";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";
import Jimp from "jimp";

export async function uploadAvatar(req, res, next) {
  try {
    if (!req.file) {
      throw HttpError(400, "No file uploaded");
    }

    const tmpPath = req.file.path;
    const targetPath = path.resolve("public/avatars", req.file.filename);

    const image = await Jimp.read(tmpPath);
    await image.resize(250, 250).writeAsync(targetPath);

    await fs.unlink(tmpPath);

    const userId = req.user._id;
    const user = await User.findOneAndUpdate(
      userId,
      { avatarURL: `/avatars/${req.file.filename}` },
      { new: true }
    );

    if (user === null) {
      throw HttpError(404, "User not found");
    }

    res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
}

export async function verificationByToken(req, res, next) {
  const { verificationToken } = req.params;
  try {
    const user = await User.findOne({ verificationToken });

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    await User.findOneAndUpdate(
      user._id,
      {
        verify: true,
        verificationToken: null,
      },
      { new: true }
    );
    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
}

export async function repeatVerification(req, res, next) {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).send({ message: "missing required field email"})
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    
    if (user.verify === true) {
      return res.status(400).send({ message: "Verification has already been passed" })
    }
    
    const verificationToken = user.verificationToken;
    
    await sendMail({
      to: email,
      from: "dok6857@gmail.com",
      subject: "Thank you for registration",
      html: `<h1 style="color: teal">Follow this <a href="http://localhost:3000/api/users/verify/${verificationToken}">link</a> to verify your email</h1>`,
      text: `Follow this link to verify your email http://localhost:3000/api/users/verify/${verificationToken}`,
    });

    res.status(200).send({ message: "Verification mail sent, please check your email." })

  } catch (error) {
    next(error);
  }
}
