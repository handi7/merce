import { decrypt, encrypt } from "../../../helper/server/password";
import { createToken } from "../../../helper/server/token";
import db from "../../../lib/db";

export default async function login(req, res) {
  try {
    let query = `select * from admins where email = ?;`;

    const [[result]] = await db.execute(query, [req.body.email]);

    if (!result) {
      return res.status(200).send("Account not found!");
    }

    if (!result.is_verified) {
      return res.status(200).send("Your account is not verified!");
    }

    if (!result.is_active) {
      return res.status(200).send("Your account is deactived!");
    }

    if (!decrypt(req.body.password, result.password)) {
      return res.status(200).send("Incorrect password!");
    }

    delete result.password;
    const token = createToken({ id: result.id, email: result.email });

    res.status(200).send({ userData: result, token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
