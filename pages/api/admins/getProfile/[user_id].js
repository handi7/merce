import db from "../../../../lib/db";

export default async function getProfile(req, res) {
  try {
    let query = `select first_name, last_name, username, image from admins where id = ?;`;
    const [[result]] = await db.execute(query, [req.query.user_id]);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}
