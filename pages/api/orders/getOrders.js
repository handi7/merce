import db from "../../../lib/db";

export default async function getOrders(req, res) {
  try {
    let query = `select inh.invoice_id, inh.market_id, inh.user_id, inh.grand_total, 
            inh.status, inh.created_at, a.first_name, a.last_name, a.image, m.market 
            from invoice_headers inh left join admins a on inh.user_id = a.id 
            left join markets m on inh.market_id = m.id order by created_at desc;`;

    const [result] = await db.execute(query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
