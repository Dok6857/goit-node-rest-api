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
