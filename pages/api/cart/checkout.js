import db from "../../../lib/db";

export default async function checkout(req, res) {
  try {
    const { market, user_id, cart } = req.body;
    const invoice_id = `INV${Date.now()}`;
    let grand_total = 0;

    let headerQuery = `insert into invoice_headers (invoice_id, market_id, user_id, grand_total) values (?, ?, ?, ?);`;
    let detailsQuery = `insert into invoice_details (invoice_id, market_id, product_id, price, general_price, qty) values (?, ?, ?, ?, ?, ?);`;
    let delCartQuery = `delete from carts where id = ?;`;
    let productQuery = `select * from products where id = ?;`;
    let updateQuery = `update products set stock = ?, stock_pkg = ? where id = ?;`;

    await cart.forEach(async (item) => {
      grand_total += item.price * item.qty;

      // INSERT TO INVOICE DETAILS
      await db.execute(detailsQuery, [
        invoice_id,
        market,
        item.product_id,
        item.price,
        item.general_price,
        item.qty,
      ]);

      // UPDATE STOCK PRODUCT
      const [[product]] = await db.execute(productQuery, [item.product_id]);
      if (product) {
        const stock = product.stock - item.qty;
        const stock_pkg = stock / product.per_pkg;
        await db.execute(updateQuery, [stock, stock_pkg, product.id]);
      }

      // DELETE CART
      await db.execute(delCartQuery, [item.id]);
    });

    // INSERT INVOICE HEADER
    await db.execute(headerQuery, [invoice_id, market, user_id, grand_total]);
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
