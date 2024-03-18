const { workerData, parentPort } = require("worker_threads");
const salesController = require("../../controller/sales.controller");
require("../../connections/mongodb.con")();

async function salesPersonCog(salesPersonId) {
  try {
    let salesRecord = await salesController.getAllSalesRecordsBySalesPerson(
      salesPersonId
    );

    // console.log(salesRecord);
    let cogs = 0;

    if (salesRecord.length == 0) {
      throw new Error("Sales Person Id is Incorrect");
    }

    for (const { totalAmount } of salesRecord) {
      cogs += totalAmount;
    }
    return cogs;
  } catch (error) {
    return error.message;
  }
}

(async () => {
  const salesPersonId = workerData.salesPersonId;
  const result = await salesPersonCog(salesPersonId);
  parentPort.postMessage({ status: true, payload: result });
})();
