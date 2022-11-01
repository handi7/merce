import database from "../../lib/db";

export default async function getAdmins(req, res) {
  try {
    let query = `select id, username, email, first_name, last_name, image, 
            is_verified, is_active, created_at from admins;`;

    const [result] = await database.execute(query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
