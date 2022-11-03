import db from "../../../lib/db";

export default async function getMarkets(req, res) {
  try {
    let query = `select * from markets order by market;`;

    const [result] = await db.execute(query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
