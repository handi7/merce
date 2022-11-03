import db from "../../../lib/db";

export default async function checkout(req, res) {
  try {
    const { market, user_id, cart } = req.body;
    const invoice_id = `INV${Date.now()}`;
    let grand_total = 0;

    let headerQuery = `insert into invoice_headers (invoice_id, market_id, user_id, grand_total) values (?, ?, ?, ?);`;
    let detailsQuery = `insert into invoice_details (invoice_id, product_id, price, general_price, qty) values (?, ?, ?, ?, ?);`;
    let delCartQuery = `delete from carts where id = ?;`;

    await cart.forEach(async (item) => {
      grand_total += item.price * item.qty;
      await db.execute(detailsQuery, [
        invoice_id,
        item.product_id,
        item.price,
        item.general_price,
        item.qty,
      ]);
      await db.execute(delCartQuery, [item.id]);
    });

    await db.execute(headerQuery, [invoice_id, market, user_id, grand_total]);
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
