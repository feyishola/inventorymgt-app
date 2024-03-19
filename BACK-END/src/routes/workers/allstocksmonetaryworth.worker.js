const { parentPort, workerData } = require("worker_threads");
const stockController = require("../../controller/stock.controller");
require("../../connections/mongodb.con")();

async function monetaryWorth() {
  try {
    const allStocks = await stockController.getAllStock();

    // const stocks = allStocks.map((stock) => stock.toObject());
    // console.log({ allStocks });
    let totalWorth = 0;
    for (const { restockQuantity, cost } of allStocks) {
      totalWorth += restockQuantity * cost;
    }
    // console.log({ totalWorth });
    return totalWorth;
  } catch (error) {
    return error.message;
  }
}

(async () => {
  // const allStocks = workerData.allStock;
  const result = await monetaryWorth();
  parentPort.postMessage({ status: true, payload: result });
})();
