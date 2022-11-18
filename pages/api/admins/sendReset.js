import hbs from "nodemailer-express-handlebars";
import {
  handlebarOptions,
  transporter,
} from "../../../helper/server/nodemailer";
import { createToken } from "../../../helper/server/token";
import db from "../../../lib/db";

export default async function sendReset(req, res) {
  try {
    let check = `select * from admins where email = ?;`;

    const [[admin]] = await db.execute(check, [req.body.email]);

    if (!admin) {
      console.log(admin);
      return res.status(404).send("Email not registered");
    }

    const { id, first_name, email } = admin;
    const token = createToken({ id, email });
    const mail = {
      from: `Merce <handev.co@gmail.com>`,
      to: `${email}`,
      subject: `Reset Password`,
      template: "resetpass",
      context: { first_name, token },
    };

    transporter.use("compile", hbs(handlebarOptions));
    transporter.sendMail(mail);
    res.status(200).send("Link sent to your email.");
  } catch (error) {
    console.log(error);
  }
}
