const mongoose = require("mongoose");

const { Schema, model } = mongoose;

// Schema for sales

const salesSchema = new Schema({
  // productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  salesPersonId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  productName: { type: String, required: true },
  quantitySold: { type: Number, required: true },
  salesPrice: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  salesPerson: { type: String, required: true },
  dateOfSale: { type: Date, default: Date.now },
  transactionId: { type: String },
});

const salesModel = model("sales", salesSchema);

module.exports = salesModel;
