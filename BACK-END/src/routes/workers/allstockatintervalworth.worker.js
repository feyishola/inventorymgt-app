const { parentPort, workerData } = require("worker_threads");
const stockController = require("../../controller/stock.controller");
require("../../connections/mongodb.con")();

async function monetaryWorth(startDate, endDate) {
  try {
    const stockList = await stockController.getStocksAtInterval(
      startDate,
      endDate
    );
    // console.log(stockList);
    let totalWorth = 0;
    for (const { restockQuantity, cost } of stockList) {
      totalWorth += restockQuantity * cost;
    }
    return totalWorth;
  } catch (error) {
    return error.message;
  }
}

(async () => {
  const startDate = workerData.startDate;
  const endDate = workerData.endDate;
  const result = await monetaryWorth(startDate, endDate);
  parentPort.postMessage({ status: true, payload: result });
})();
