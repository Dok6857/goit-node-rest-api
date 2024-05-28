import nodemailer from "nodemailer";
import "dotenv/config";

const { HOST, HOST_PORT, HOST_USERNAME, HOST_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  host: HOST,
  port: HOST_PORT,
  auth: {
    user: HOST_USERNAME,
    pass: HOST_PASSWORD,
  },
});

const message = {
  to: "dok6857@gmail.com",
  from: "dok6857@gmail.com",
  subject: "Testing nodemailer",
  html: `<h1 style="color: teal">Hi, I'm a test mail!</h1>`,
  text: "Hi, I'm a test mail!",
};

export function sendMail(message) {
  return transport.sendMail(message).then(console.log).catch(console.error);
}
