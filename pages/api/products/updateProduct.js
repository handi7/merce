import { uploader } from "../../../helper/server/uploader";
import db from "../../../lib/db";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function updateProduct(req, res) {
  try {
    const upload = uploader("/products", "Product").single("file");

    upload(req, res, async () => {
      let val = "";
      if (req.file) {
        val += `image = '${req.file.filename}'`;
      }

      for (const key in req.body) {
        if (key === "id" || key === "oldImg") continue;
        const value = +req.body[key] ? req.body[key] : `'${req.body[key]}'`;
        if (val) {
          val += `, ${key} = ${value}`;
          continue;
        }
        val += `${key} = ${value}`;
      }
      let query = `update products set ${val} where id = ?;`;

      const [result] = await db.execute(query, [req.body.id]);

      if (result.changedRows) {
        const oldImg = `public/products/${req.body.oldImg}`;
        if (req.file) {
          if (fs.existsSync(oldImg)) {
            fs.unlinkSync(oldImg);
          }
        }
        res.status(200).send(true);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
