const salesController = require("../controller/sales.controller");
const authorization = require("../middleware/authorization.middleware");
const verifyUser = require("../middleware/verification.middleware");
const api = require("express").Router();

module.exports = () => {
  api.post(
    "/createSalesRecords",
    // [verifyUser, authorization(["Admin", "Regular"])],
    async (req, res) => {
      try {
        const { salesRecord, salesPerson } = req.body;
        const result = await salesController.createSales(
          salesRecord,
          salesPerson
        );
        res
          .status(200)
          .json({ response: true, payload: "Sales Record Saved." });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  api.get(
    "/records",
    //    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const salesRecord = await salesController.getAllSalesRecords();
        res.status(200).json({ response: true, payload: salesRecord });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  return api;
};
