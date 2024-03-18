const { workerData, parentPort } = require("worker_threads");
const salesController = require("../../controller/sales.controller");
const formatDateTimeToIso = require("../../utils/dateconverter");
require("../../connections/mongodb.con")();

async function cogsInt(startDate, endDate) {
  let start = formatDateTimeToIso(startDate);
  let stop = formatDateTimeToIso(endDate);
  let cogs = 0;
  try {
    let salesRecord = await salesController.getSalesRecordsAtIntervals(
      start,
      stop
    );

    if (salesRecord.length == 0) {
      throw new Error("Please check intervals or date");
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
  try {
    const startDate = workerData.startDate;
    const endDate = workerData.endDate;

    const result = await cogsInt(startDate, endDate);
    parentPort.postMessage({ status: true, payload: result });
  } catch (error) {
    parentPort.postMessage({ status: false, payload: error.message });
  }
})();
