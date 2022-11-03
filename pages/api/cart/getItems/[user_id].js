import db from "../../../../lib/db";

export default async function getCartItems(req, res) {
  try {
    let query = `select * from carts c join 
    (select p.id as pid, p.name, p.price, p.image, p.unit, p.stock, p.per_pkg, p.stock_pkg, ct.category 
    from products p join categories ct on p.category_id = ct.id) pj 
    on c.product_id = pj.pid where c.user_id = ? order by c.id desc;`;

    const [result] = await db.execute(query, [req.query.user_id]);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
