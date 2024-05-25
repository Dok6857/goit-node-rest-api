// tokenCheck

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function tokenCheck(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send({ message: "Not authorized" });
  }

  const [bearer, token] = authorizationHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Not authorized" });
    }

    const user = await User.findById(decode.id);

    if (!user || user.token !== token) {
      return res.status(401).send({ message: "Not authorized" });
    }

    req.user = user;
    next();
  });
}