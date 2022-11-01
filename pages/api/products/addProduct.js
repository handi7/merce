import { uploader } from "../../../helper/server/uploader";
import db from "../../../lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function addProduct(req, res) {
  try {
    const upload = uploader("/products", "Product").single("file");

    upload(req, res, async () => {
      if (!req.body.description) {
        req.body.description = "";
      }

      let query = `insert into products (category_id, name, price, regular_price, 
                    stock, unit, per_pkg, stock_pkg, description, image) 
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      await db.execute(query, [
        +req.body.category_id,
        req.body.name,
        +req.body.price,
        +req.body.regular_price,
        +req.body.stock,
        req.body.unit,
        +req.body.per_pkg,
        +req.body.stock_pkg,
        req.body.description,
        req.file.filename,
      ]);
      res.status(200).send(true);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
