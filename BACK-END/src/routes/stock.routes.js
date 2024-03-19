const api = require("express").Router();
const StockController = require("../controller/stock.controller");
const authorization = require("../middleware/authorization.middleware");
const verifyUser = require("../middleware/verification.middleware");
const { Worker } = require("worker_threads");

module.exports = () => {
  // get all the stock records
  api.get(
    "/all/records",
    //    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const result = await StockController.getAllStock();
        res.status(200).json({ response: true, payload: result });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  // get stock records within an interval
  api.post(
    "/interval/records",
    //    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const { startDate, endDate } = req.body;
        const result = await StockController.getStocksAtInterval(
          startDate,
          endDate
        );
        res.status(200).json({ response: true, payload: result });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  // creating new stock only wen u av successfully incremented the products

  api.post(
    "/addstocks",
    //  [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const { stockRecordArr } = req.body;

        const worker = new Worker(
          __dirname + "/workers/stockupdate.worker.js",
          {
            workerData: { stockRecordArr },
          }
        );
        worker.on("message", async (message) => {
          if (message.status) {
            const newStock = await StockController.addStocks(stockRecordArr);
            res.status(200).json({
              response: true,
              payload: { message: message.payload, newStock },
            });
          } else {
            res
              .status(500)
              .json({ response: false, payload: "Error occurred" });
          }
        });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  return api;
};
