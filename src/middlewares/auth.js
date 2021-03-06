const { validateToken } = require("../services/jwtService");

const auth = (req, res, next) => {
  const { jwt = "" } = req.cookies;
  const admin = validateToken(jwt);
  if (admin) {
    req.admin = admin;
    next();
  } else {
    res.redirect("/auth/login");
  }
};

module.exports = auth;
