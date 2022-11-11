import db from "../../../lib/db";

export default async function updateProfile(req, res) {
  try {
    const forIn = (data) => {
      let temp = "";
      for (const key in data) {
        if (key === "id") continue;
        if (temp) {
          temp += `, ${key} = '${data[key]}'`;
        } else {
          temp += `${key} = '${data[key]}'`;
        }
      }
      return temp;
    };

    const checkUsername = async (username) => {
      let checkQuery = `select username from admins where username = ?;`;
      const [[user]] = await db.execute(checkQuery, [username]);
      if (user) {
        return res
          .status(200)
          .send({ message: `${user.username} already used!` });
      }
    };

    console.log(req.body);
    if (req.body) {
      if (req.body.username) {
        checkUsername(req.body.username);
      }

      const val = forIn(req.body);

      let query = `UPDATE admins set ${val} where id = ?;`;
      await db.execute(query, [req.body.id]);
      res.status(200).send(true);
    }
  } catch (error) {
    console.log(error);
  }
}
