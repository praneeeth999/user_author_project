const { verifyJwt } = require("../utils");

const auth = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    const err = new Error("access token missing");
    err.status = 401;
    throw err;
  }

  const payload = verifyJwt(token);
  req.user = payload;

  next();
};

module.exports = { auth };
