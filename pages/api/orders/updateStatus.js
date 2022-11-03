import db from "../../../lib/db";

export default async function updateStatus(req, res) {
  try {
    let query = `update invoice_headers set status = ? where invoice_id = ?;`;

    await db.execute(query, [req.body.status, req.body.invId]);
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
