// app.js

import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, DB_URI } from "./configs/serverConfig.js";

mongoose.Promise = global.Promise;

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const connection = mongoose.connect(DB_URI);
connection
  .then(() => {
    console.log("Database connection was successful");
    app.listen(PORT, () => {
      console.log(`Server is running. Use Our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server is not running. ${err.message}`);
    process.exit(1);
  });
