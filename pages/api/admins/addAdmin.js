import hbs from "nodemailer-express-handlebars";
import {
  handlebarOptions,
  transporter,
} from "../../../helper/server/nodemailer";
import { encrypt, generate } from "../../../helper/server/password";
import { createToken } from "../../../helper/server/token";
import db from "../../../lib/db";

export default async function addAdmin(req, res) {
  try {
    const { first_name, last_name, email } = req.body;
    let checkQuery = `select * from admins where email = ?;`;
    let insertQuery = `insert into admins (username, email, first_name, last_name, password) 
                    values (?, ?, ?, ?, ?);`;

    const [resEmail] = await db.execute(checkQuery, [email]);

    if (resEmail.length)
      return res.status(200).send("Email already registered!");

    const generated = generate(6);
    const password = encrypt(generated);
    const username = "admin" + Date.now();

    const [result] = await db.execute(insertQuery, [
      username,
      email,
      first_name,
      last_name,
      password,
    ]);

    if (result.insertId) {
      const token = createToken({ id: result.insertId, email });
      const mail = {
        from: `Merce <handev.co@gmail.com>`,
        to: `${email}`,
        subject: `Account Verification`,
        template: "verify",
        context: { first_name, token, generated },
      };

      transporter.use("compile", hbs(handlebarOptions));
      transporter.sendMail(mail);
      return res.status(200).send(true);
    }
    res.status(200).send(false);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
