const stockModel = require("../model/restock.model");

class StockController {
  async addStocks(restockRecord) {
    const newStock = restockRecord.map((stock) => ({
      productId: stock.productId,
      cost: stock.cost,
      restockQuantity: stock.restockQuantity,
      restockDate: stock.restockDate,
    }));

    const result = await stockModel.insertMany(newStock);
    return result;
  }

  async getAllStock() {
    const result = await stockModel.find();
    // console.log(result);
    return result;
  }

  async getStock(productId) {
    const result = await stockModel.find({
      productId,
    });
    return result;
  }

  async getStocksAtInterval(startDate, endDate) {
    const result = await stockModel.find({
      restockDate: { $gte: startDate, $lte: endDate },
    });
    return result;
  }

  async stockAtInterval(productId, startDate, endDate) {
    const result = await stockModel.find({
      productId,
      restockDate: { $gte: startDate, $lte: endDate },
    });
    return result;
  }

  // remove this
  async deleteAllStock(stockId) {
    await stockModel.findByIdAndDelete(stockId);
    return "Deleted";
  }
}

module.exports = new StockController();
