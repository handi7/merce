import { authToken } from "../../../helper/server/token";
import db from "../../../lib/db";

export default async function verify(req, res) {
  try {
    const auth = authToken(req.body.token);

    if (!auth) return res.status(200).send("Link expired!");

    let checkQuery = `select is_verified from admins where id = ?;`;
    let query = `update admins set is_verified = true where id = ?;`;

    const [[admin]] = await db.execute(checkQuery, [auth.data.id]);

    if (!admin) return res.status(200).send("Your email is not registered!");

    if (admin.is_verified) return res.status(200).send(true);

    const [result] = await db.execute(query, [auth.data.id]);

    if (!result.changedRows) return res.status(200).send("Server error!");

    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
