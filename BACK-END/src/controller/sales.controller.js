const salesModel = require("../model/sales.model");

class SalesController {
  async createSales(salesRecord, salesPerson) {
    const newSales = salesRecord.map((record) => ({
      productName: record.productName,
      quantitySold: record.quantitySold,
      salesPrice: record.salesPrice,
      totalAmount: record.totalAmount,
      salesPerson,
    }));

    const result = await salesModel.insertMany(newSales);

    return result;
  }

  async getAllSalesRecords() {
    const result = await salesModel.find();
    return result;
  }
}

module.exports = new SalesController();
