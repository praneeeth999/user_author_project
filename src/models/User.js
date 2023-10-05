const { Schema, default: mongoose } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "badge" }],
  certificates: [{ type: mongoose.Schema.Types.ObjectId, ref: "certificate" }],
});

module.exports = { UserModel: mongoose.model("user", schema) };
