const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const saltRounds = 10;

const hashPassword = (password) => bcrypt.hash(password, saltRounds);
const comparePassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

const signJwt = (payload) => sign(payload, JWT_SECRET);
const verifyJwt = (token) => verify(token, JWT_SECRET);

module.exports = { hashPassword, comparePassword, signJwt, verifyJwt };
