import db from "../../../lib/db";

export default async function getProducts(req, res) {
  try {
    let productsQuery = `select p.id, category_id, name, price, regular_price, 
                    description, image, unit, stock, per_pkg,stock_pkg, 
                    is_deleted, category from products p join categories c 
                    on p.category_id = c.id order by name;`;
    let categoriesQuery = `select * from categories;`;
    let unitsQuery = `select * from units;`;

    const [products] = await db.execute(productsQuery);
    const [categories] = await db.execute(categoriesQuery);
    const [units] = await db.execute(unitsQuery);

    res.status(200).send({ products, categories, units });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
