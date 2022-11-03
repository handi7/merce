import db from "../../../lib/db";

export default async function addItem(req, res) {
  try {
    const { user_id, product_id, qty } = req.body;
    let checkQuery = `select * from carts where user_id = ? and product_id = ?;`;
    let insertQuery = `insert into carts (user_id, product_id, qty) values (?, ?, ?);`;
    let updateQuery = `update carts set qty = ? where id = ?;`;

    const [[item]] = await db.execute(checkQuery, [user_id, product_id]);
    console.log(item);

    if (item) {
      await db.execute(updateQuery, [qty + item.qty, item.id]);
      return res.status(200).send("update");
    }

    await db.execute(insertQuery, [user_id, product_id, qty]);
    res.status(200).send("add");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
