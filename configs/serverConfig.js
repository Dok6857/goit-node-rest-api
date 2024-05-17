// serverConfig

import dotenv from "dotenv";

dotenv.config();

export const {
  PORT = 3000,
  DB_URI = `mongodb+srv://dok6857:rpCgMcjc9zjN0sAp@cluster0.okqbwbp.mongodb.net/db-contacts
  `,
} = process.env;
