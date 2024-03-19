const stockModel = require("../model/restock.model");

class StockController {
  async addStocks(restockRecord) {
    const newStock = restockRecord.map((stock) => ({
      productId: stock.productId,
      restockQuantity: stock.restockQuantity,
      restockDate: stock.restockDate,
    }));

    const result = await stockModel.insertMany(newStock);
    return result;
  }

  async getAllStock() {
    const result = await stockModel.find();
    return result;
  }

  async getStocksAtInterval(startDate, endDate) {
    const result = await stockModel.find({
      restockDate: { $gte: startDate, $lte: endDate },
    });
    return result;
  }
}

module.exports = new StockController();
