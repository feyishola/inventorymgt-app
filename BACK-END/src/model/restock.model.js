const { Schema, model } = require("mongoose");

const reStockSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
  restockQuantity: { type: Number, required: true },
  restockDate: { type: Date, default: Date.now },
});

const reStockModel = model("stocks", reStockSchema);

module.exports = reStockModel;
