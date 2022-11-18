import db from "../../../lib/db";

export default async function getRecentOrders(req, res) {
  try {
    let query = `select inh.id, inh.invoice_id, inh.market_id, inh.user_id, inh.grand_total, 
    inh.status, inh.created_at, a.first_name, a.last_name, a.image, m.market 
    from invoice_headers inh left join admins a on inh.user_id = a.id 
    left join markets m on inh.market_id = m.id  order by inh.created_at desc limit 5;`;

    const [result] = await db.execute(query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}
