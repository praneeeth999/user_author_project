const { Schema, default: mongoose } = require("mongoose");

const schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    dateOfIssuance: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = { CertificateModel: mongoose.model("certificate", schema) };
