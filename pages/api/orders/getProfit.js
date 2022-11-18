import db from "../../../lib/db";

export default async function getProfit(req, res) {
  try {
    const { last30d, thisMonth, lastMonth } = req.body;

    let l30dQuery = `select sum(grand_total) total, created_at 
            from invoice_headers where created_at between ? and ? 
            group by day(created_at);`;
    let revQuery = `select sum(grand_total) total from invoice_headers 
            where created_at between ? and ?;`;

    const [last30dRev] = await db.execute(l30dQuery, [last30d[0], last30d[1]]);
    const [[thisMRev]] = await db.execute(revQuery, [
      thisMonth[0],
      thisMonth[1],
    ]);
    const [[lastMRev]] = await db.execute(revQuery, [
      lastMonth[0],
      lastMonth[1],
    ]);
    res.status(200).send({
      last30dRev,
      thisMRev: +thisMRev.total * 0.11,
      lastMRev: +lastMRev.total * 0.11,
    });
  } catch (error) {
    console.log(error);
  }
}
