const salesModel = require("../model/sales.model");

class SalesController {
  async createSales(salesRecord, salesPerson) {
    const newSales = salesRecord.map((record) => ({
      salesPersonId: record.salesPersonId,
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

  async getAllSalesRecordsBySalesPerson(salesPersonId) {
    const result = await salesModel.find({
      salesPersonId,
    });
    return result;
  }

  async getSalesRecordsAtIntervalBySalesPerson(
    salesPersonId,
    startDate,
    endDate
  ) {
    const result = await salesModel.find({
      salesPersonId,
      dateOfSale: { $gte: startDate, $lte: endDate },
    });

    return result;
  }

  async getSalesRecordsAtIntervals(startDate, endDate) {
    const result = await salesModel.find({
      dateOfSale: { $gte: startDate, $lte: endDate },
    });
    return result;
  }

  // Deleting sales record

  async deleteSalesRecord(id) {
    await salesModel.findByIdAndDelete(id);
    return "Record Deleted";
  }
}

module.exports = new SalesController();
