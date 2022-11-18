import db from "../../../lib/db";

export default async function getTopProducts(req, res) {
  try {
    let query = `select i.product_id, p.name, p.price, p.image, c.category, sum(qty) sold 
    from invoice_details i join products p on i.product_id = p.id join categories c on p.category_id = c.id
     group by i.product_id order by sold desc limit 5;`;

    const [result] = await db.execute(query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}
