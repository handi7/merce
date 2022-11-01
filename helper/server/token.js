import { JWT_PRIVATE_KEY } from "../../lib/constants";

const jwt = require("jsonwebtoken");

export const createToken = (data) =>
  jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60000,
      data,
    },
    JWT_PRIVATE_KEY
  );

export const authToken = (token) => {
  try {
    return jwt.verify(token, JWT_PRIVATE_KEY);
  } catch (error) {
    return false;
  }
};

export default {};
