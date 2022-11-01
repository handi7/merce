import { authToken, createToken } from "../../../helper/server/token";
import db from "../../../lib/db";

export default async function keepLogin(req, res) {
  try {
    const auth = authToken(req.body.token);

    if (!auth) {
      return res.status(200).send(false);
    }

    let query = `select * from admins where id = ?;`;

    const [[result]] = await db.execute(query, [auth.data.id]);

    if (!result) {
      return res.status(200).send(false);
    }

    delete result.password;
    const token = createToken({ id: result.id, email: result.email });

    res.status(200).send({ userData: result, token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
