import db from "../../../lib/db";

export default async function addMarket(req, res) {
  try {
    let query = `insert into markets (market) values (?);`;

    await db.execute(query, [req.body.market]);
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
