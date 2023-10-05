const { Router } = require("express");
const Joi = require("joi");
const { BadgeModel } = require("../../models/Badge");
const { UserModel } = require("../../models/User");
const { default: mongoose } = require("mongoose");

const badgesRouter = Router();

const createBadgeSchema = Joi.object({
  title: Joi.string().required(),
  issuer: Joi.string().required(),
  dateOfIssuance: Joi.date().required(),
});

badgesRouter.post("/", async (req, res) => {
  const { title, issuer, dateOfIssuance } =
    await createBadgeSchema.validateAsync(req.body);
  const { _id } = req.user;

  const badge = await new BadgeModel({
    user: _id,
    title,
    issuer,
    dateOfIssuance,
  }).save();

  await UserModel.updateOne(
    { _id },
    { $addToSet: { badges: new mongoose.Types.ObjectId(badge._id) } }
  );

  res.send(badge);
});

module.exports = badgesRouter;
