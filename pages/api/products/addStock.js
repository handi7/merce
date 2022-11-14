import db from "../../../lib/db";

export default async function addStock(req, res) {
  try {
    const { id, add_stock, stock_pkg } = req.body;
    let query = `update products set stock = stock + ?, stock_pkg = ? where id = ?;`;

    await db.execute(query, [add_stock, stock_pkg, id]);
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
  }
}
