const api = require("express").Router();
const StockController = require("../controller/stock.controller");
const authorization = require("../middleware/authorization.middleware");
const verifyUser = require("../middleware/verification.middleware");

module.exports = () => {
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

  api.post(
    "/addstocks",
    //  [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const { stockRecordArr } = req.body;
        const result = await StockController.addStocks(stockRecordArr);
        res.status(200).json({ response: true, payload: result });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  return api;
};
