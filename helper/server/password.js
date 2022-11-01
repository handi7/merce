const bcrypt = require("bcrypt");

export const encrypt = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const decrypt = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
