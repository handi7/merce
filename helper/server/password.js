const bcrypt = require("bcrypt");

export const encrypt = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const decrypt = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export const generate = (length) => {
  let chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$&ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = "";
  // Generate Password
  for (let i = 0; i < length; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
};
