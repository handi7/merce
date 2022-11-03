import db from "../../../lib/db";

export default async function updateItem(req, res) {
  try {
    let query = `update carts set qty = ? where id = ?;`;

    await db.execute(query, [req.body.qty, req.body.id]);
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
