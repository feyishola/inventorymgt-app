const { parentPort, workerData } = require("worker_threads");
const stockController = require("../../controller/stock.controller");
require("../../connections/mongodb.con")();

async function monetaryWorth(productId) {
  try {
    const stockList = await stockController.getStock(productId);
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
  const productId = workerData.productId;
  const result = await monetaryWorth(productId);
  parentPort.postMessage({ status: true, payload: result });
})();
