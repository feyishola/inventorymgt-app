const { workerData, parentPort } = require("worker_threads");
const salesController = require("../../controller/sales.controller");
const formatDateTimeToIso = require("../../utils/dateconverter");
require("../../connections/mongodb.con")();

async function salesPersonCogInt(salesPersonId, startDate, endDate) {
  let start = formatDateTimeToIso(startDate);
  let stop = formatDateTimeToIso(endDate);
  try {
    let salesRecord =
      await salesController.getSalesRecordsAtIntervalBySalesPerson(
        salesPersonId,
        start,
        stop
      );
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
  const startDate = workerData.startDate;
  const endDate = workerData.endDate;
  const result = await salesPersonCogInt(salesPersonId, startDate, endDate);
  parentPort.postMessage({ status: true, payload: result });
})();
