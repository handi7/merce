import { authToken } from "../../../helper/server/token";

export default async function checkLink(req, res) {
  try {
    const auth = authToken(req.body.token);

    if (!auth) {
      return res.status(404).send("Link expired");
    }
    res.status(200).send(auth.data.id);
  } catch (error) {
    console.log(error);
  }
}
