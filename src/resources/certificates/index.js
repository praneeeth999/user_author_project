const { Router } = require("express");
const Joi = require("joi");
const { CertificateModel } = require("../../models/Certificate");
const { UserModel } = require("../../models/User");
const { default: mongoose } = require("mongoose");

const certificateRouter = Router();

const createCertificateSchema = Joi.object({
  title: Joi.string().required(),
  issuer: Joi.string().required(),
  dateOfIssuance: Joi.date().required(),
});

certificateRouter.post("/", async (req, res) => {
  const { title, issuer, dateOfIssuance } =
    await createCertificateSchema.validateAsync(req.body);
  const { _id } = req.user;

  const certificate = await new CertificateModel({
    user: _id,
    title,
    issuer,
    dateOfIssuance,
  }).save();

  await UserModel.updateOne(
    { _id },
    {
      $addToSet: { certificates: new mongoose.Types.ObjectId(certificate._id) },
    }
  );

  res.send(certificate);
});

module.exports = certificateRouter;
