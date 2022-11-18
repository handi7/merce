import { encrypt } from "../../../helper/server/password";
import db from "../../../lib/db";

export default async function changePassword(req, res) {
  try {
    const password = encrypt(req.body.newPassword);
    let updateQuery = `update admins set password = ? where id = ?;`;

    await db.execute(updateQuery, [password, req.body.id]);
    res.status(200).send("Password has been reset");
  } catch (error) {
    console.log(error);
  }
}
