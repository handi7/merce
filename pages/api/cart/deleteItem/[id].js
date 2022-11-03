import db from "../../../../lib/db";

export default async function deleteItem(req, res) {
  try {
    let query = `delete from carts where id = ?;`;

    await db.execute(query, [req.query.id]);
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
