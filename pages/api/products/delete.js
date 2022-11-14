import db from "../../../lib/db";

export default async function deleteProduct(req, res) {
  try {
    let query = `update products set is_deleted = true where id = ?;`;

    await db.execute(query, [req.body.id]);
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
  }
}
