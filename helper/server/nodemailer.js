import nodemailer from "nodemailer";
import path from "path";
import { EMAIL, MAILER_PASS } from "../../lib/constants";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: MAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./helper/server/handlebars/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./helper/server/handlebars/"),
};
