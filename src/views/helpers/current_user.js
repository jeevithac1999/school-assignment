const { validateToken } = require("../../services/jwtService");

const current_user = token => {
  var { name: current_user = "User" } = validateToken(token);
  return current_user;
};

module.exports = current_user;
