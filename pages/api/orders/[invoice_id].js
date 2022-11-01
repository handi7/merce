import db from "../../../lib/db";

export default async function byId(req, res) {
  try {
    let invoiceQuery = `select * from invoice_headers where invoice_id = ?;`;
    let detailsQuery = `select * from invoice_details where invoice_id = ?;`;

    const [[invoice]] = await db.execute(invoiceQuery, [req.query.invoice_id]);
    const [items] = await db.execute(detailsQuery, [req.query.invoice_id]);
    res.status(200).send({ invoice, items });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
