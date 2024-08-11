const bcript = require("bcrypt");
const saltRounds = 10;

const encript = (password) => {
  return bcript.hashSync(password, saltRounds);
};

const compare = (password, hash) => {
  return bcript.compareSync(password, hash);
};

module.exports = { encript, compare };
