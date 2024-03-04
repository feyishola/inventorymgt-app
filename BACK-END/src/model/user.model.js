const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const inventSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  img: { type: String, default: "something.jpeg" },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, unique: true },
  password: { type: String, required: true },
  userRole: { type: String, enum: ["Admin", "Regular"], default: "Regular" },
});

const inventModel = model("users", inventSchema);
module.exports = inventModel;
