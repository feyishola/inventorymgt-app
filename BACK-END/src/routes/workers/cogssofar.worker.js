const { workerData, parentPort } = require("worker_threads");
const salesController = require("../../controller/sales.controller");
require("../../connections/mongodb.con")();

async function salesCogs() {
  try {
    let salesRecords = await salesController.getAllSalesRecords();

    // console.log(salesRecord);
    let cogs = 0;

    if (salesRecords.length == 0) {
      throw new Error("No sales Record Found");
    }

    for (const { totalAmount } of salesRecords) {
      cogs += totalAmount;
    }
    return cogs;
  } catch (error) {
    return error.message;
  }
}

(async () => {
  const result = await salesCogs();
  parentPort.postMessage({ status: true, payload: result });
})();
