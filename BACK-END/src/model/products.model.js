const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema({
  productName: { type: String, required: true },
  productAmount: { type: Number, required: true },
  productCategory: { type: String, required: true },
  productDesc: { type: String },
  productImg: { type: String, required: true },
  productQrCode: { type: String, required: true },
  productQuantity: { type: Number, required: true },
  productionDate: { type: Date },
  expiryDate: { type: Date },
});

const productModel = model("products", productSchema);

module.exports = productModel;
