const api = require("express").Router();
const StockController = require("../controller/stock.controller");
const authorization = require("../middleware/authorization.middleware");
const verifyUser = require("../middleware/verification.middleware");
const { Worker } = require("worker_threads");

module.exports = () => {
  // get all the stock records and worth
  api.get(
    "/all/records",
    //    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const allStock = await StockController.getAllStock();
        // console.log({ test: allStock });
        const worker = new Worker(
          __dirname + "/workers/allstocksmonetaryworth.worker.js"
        );

        worker.on("message", (message) => {
          if (message.status) {
            res.status(200).json({
              response: true,
              payload: {
                worth: message.payload,
                allStock,
              },
            });
          } else {
            res.status(400).json({
              response: false,
              payload: "Error occured calculating stock worth",
            });
          }
        });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  // get records of a stock and worth
  api.get(
    "/single/records/:id",
    //    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const productId = req.params.id;
        const allStock = await StockController.getStock(productId);

        const worker = new Worker(
          __dirname + "/workers/singlestocksmonetaryworth.worker.js",
          {
            workerData: { productId },
          }
        );

        worker.on("message", (message) => {
          if (message.status) {
            res.status(200).json({
              response: true,
              payload: {
                worth: message.payload,
                stockList: allStock,
              },
            });
          } else {
            res.status(400).json({
              response: false,
              payload: "Error occured calculating single stocklist worth",
            });
          }
        });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  // get All stock records within an interval and worth
  api.post(
    "/interval/records",
    //    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const { startDate, endDate } = req.body;

        const stockList = await StockController.getStocksAtInterval(
          startDate,
          endDate
        );

        const worker = new Worker(
          __dirname + "/workers/allstockatintervalworth.worker.js",
          {
            workerData: { startDate, endDate },
          }
        );

        worker.on("message", (message) => {
          if (message.status) {
            res.status(200).json({
              response: true,
              payload: {
                worth: message.payload,
                stockList,
              },
            });
          } else {
            res.status(400).json({
              response: false,
              payload: "Error occured at all interval records",
            });
          }
        });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  // get records of a stock at interval and worth

  api.post(
    "/single/interval/records/:id",
    //    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const productId = req.params.id;
        const { startDate, endDate } = req.body;

        const stockList = await StockController.stockAtInterval(
          productId,
          startDate,
          endDate
        );

        const worker = new Worker(
          __dirname + "/workers/singlestocksmonetaryworthinterval.worker.js",
          {
            workerData: { productId, startDate, endDate },
          }
        );

        worker.on("message", (message) => {
          if (message.status) {
            res.status(200).json({
              response: true,
              payload: {
                worth: message.payload,
                stockList,
              },
            });
          } else {
            res.status(400).json({
              response: false,
              payload:
                "Error occured calculating single stocklist at interval worth",
            });
          }
        });
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
            res.status(400).json({
              response: false,
              payload: "Error occurred updating stock",
            });
          }
        });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  api.delete("/delete/stocks/:id", async (req, res) => {
    try {
      const stockId = req.params.id;
      await StockController.deleteAllStock(stockId);
      res.status(200).json({ response: true, payload: "Stock Record Deleted" });
    } catch (error) {
      res.status(500).json({ response: false, payload: error.message });
    }
  });

  return api;
};
