const { Router } = require("express");
const Joi = require("joi");
const { comparePassword, hashPassword, signJwt } = require("../../utils/index");
const { UserModel } = require("../../models/User");
const _ = require("lodash");
const { auth } = require("../../middleware/auth");

const authRouter = Router();

// validators
const createUserSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(1024).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(1024).required(),
});

authRouter.post("/signup", async (req, res) => {
  let { fullname, email, password } = await createUserSchema.validateAsync(
    req.body
  );
  // transform data
  email = email.toLowerCase();
  password = await hashPassword(password);
  const user = await new UserModel({ email, fullname, password }).save();
  res.status(201).send(user);
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = await loginUserSchema.validateAsync(req.body);
  const user = await UserModel.findOne({ email });
  // throw error if user not found in database
  if (!user) throw new Error("user not found in database");
  const isSamePassword = await comparePassword(password, user.password);
  if (!isSamePassword) throw new Error("wrong password");

  // remove password and send it in the response
  const responseToSend = _.omit(user.toJSON(), "password");
  const token = signJwt(responseToSend);

  res.setHeader("x-auth-token", token).send(responseToSend);
});

authRouter.post("/profile", auth, async (req, res) => {
  const user = await UserModel.findById(req.user._id).populate([
    { path: "badges" },
    { path: "certificates" },
  ]);

  if (!user) {
    const err = new Error("user not found in database");
    err.status = 400;
    throw err;
  }

  res.send(_.omit(user.toJSON(), "password"));
});

module.exports = authRouter;
