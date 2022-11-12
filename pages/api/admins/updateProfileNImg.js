import fs from "fs";
import { uploader } from "../../../helper/server/uploader";
import db from "../../../lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function updateProfile(req, res) {
  try {
    const forIn = (data) => {
      let temp = "";
      for (const key in data) {
        if (key === "id" || key === "oldImg") continue;
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

    const upload = uploader("/profiles", "Profile").single("file");

    upload(req, res, async () => {
      if (req.body.username) {
        checkUsername(req.body.username);
      }

      let val = `image = '${req.file.filename}'`;
      const val2 = forIn(req.body);
      if (val2) val += `, ${val2}`;

      let query = `UPDATE admins set ${val} where id = ?;`;
      const [result] = await db.execute(query, [req.body.id]);

      if (result.changedRows) {
        const oldImg = `public/profiles/${req.body.oldImg}`;
        if (req.body.oldImg !== "profile.png") {
          if (fs.existsSync(oldImg)) {
            fs.unlinkSync(oldImg);
          }
        }
      }
      res.status(200).send(true);
    });
  } catch (error) {
    console.log(error);
  }
}
