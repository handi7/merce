import { decrypt } from "../../../helper/server/password";
import db from "../../../lib/db";

export default async function changePassword(req, res) {
  try {
    let checkQuery = `Select password from admins where id = ?;`;
    let updateQuery = `update admins set password = ? where id = ?;`;

    const [[result]] = await db.execute(checkQuery, [req.body.id]);

    const match = decrypt(req.body.currentPassword, result.password);

    if (!match) {
      return res
        .status(200)
        .send({ message: "Current password did not match!" });
    }

    await db.execute(updateQuery, [req.body.newPassword, req.body.id]);
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
  }
}
