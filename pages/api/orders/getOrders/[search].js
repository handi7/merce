import db from "../../../../lib/db";

export default async function searchOrder(req, res) {
  try {
    const { search } = req.query;
    let countQuery = `select count(id) count from invoice_headers;`;
    let query = `select inh.id, inh.invoice_id, inh.market_id, inh.user_id, inh.grand_total, 
            inh.status, inh.created_at, a.first_name, a.last_name, a.image, m.market  
            from invoice_headers inh left join admins a on inh.user_id = a.id 
            left join markets m on inh.market_id = m.id where invoice_id like '${search}%' 
            or a.first_name like '${search}%' or m.market like '${search}%' order by created_at desc;`;

    const [[allOrders]] = await db.execute(countQuery);
    const [orders] = await db.execute(query);
    res.status(200).send({ count: allOrders.count, orders });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
