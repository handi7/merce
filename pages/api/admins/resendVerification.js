import hbs from "nodemailer-express-handlebars";
import {
  handlebarOptions,
  transporter,
} from "../../../helper/server/nodemailer";
import { encrypt, generate } from "../../../helper/server/password";
import { createToken } from "../../../helper/server/token";
import db from "../../../lib/db";

export default async function resendVerification(req, res) {
  try {
    const { id, first_name, email } = req.body;
    const generated = generate(6);
    const password = encrypt(generated);
    let query = `update admins set password = ? where id = ?;`;

    const [result] = await db.execute(query, [password, id]);

    if (result.changedRows) {
      const token = createToken({ id, email });
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
