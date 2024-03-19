const salesController = require("../controller/sales.controller");
const authorization = require("../middleware/authorization.middleware");
const verifyUser = require("../middleware/verification.middleware");
const api = require("express").Router();
const { Worker } = require("worker_threads");

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

  // cogs sold so far and the goods list

  api.get(
    "/records",
    //    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const salesRecord = await salesController.getAllSalesRecords();

        const worker = new Worker(__dirname + "/workers/cogssofar.worker.js");

        worker.on("message", (message) => {
          if (message.status) {
            res.status(200).json({
              response: true,
              payload: { worth: message.payload, salesRecord },
            });
          } else {
            res.status(400).json({
              response: false,
              payload: "Error occured getting all sales records",
            });
          }
        });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  // cost of goods sold(cogs) for a salesperson (i.e salesBySalesPerson)
  api.get(
    "/salesperson/:id",
    //    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const salesPersonId = req.params.id;

        const worker = new Worker(
          __dirname + "/workers/salespersoncogs.worker.js",
          {
            workerData: { salesPersonId },
          }
        );

        worker.on("message", (message) => {
          if (message.status) {
            res.status(200).json({ response: true, payload: message.payload });
          }
        });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  // cost of goods sold(cogs) for a salesperson at choosing interval

  api.post(
    "/salespersoncogswithininterval/:id",
    //    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const salesPersonId = req.params.id;
        let { startDate, endDate } = req.body;

        const worker = new Worker(
          __dirname + "/workers/salespersonintervalcogs.worker.js",
          {
            workerData: { salesPersonId, startDate, endDate },
          }
        );

        worker.on("message", (message) => {
          if (message.status) {
            res.status(200).json({ response: true, payload: message.payload });
          }
        });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  // cost of goods sold(cogs) at choosing interval and list

  api.post(
    "/cogsalesinterval",
    //    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        let { startDate, endDate } = req.body;

        const list = await salesController.getSalesRecordsAtIntervals(
          startDate,
          endDate
        );

        const worker = new Worker(
          __dirname + "/workers/cogsSalesInterval.worker.js",
          {
            workerData: { startDate, endDate },
          }
        );

        worker.on("message", (message) => {
          if (message.status) {
            res.status(200).json({
              response: true,
              payload: { worth: message.payload, list },
            });
          }
        });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  api.delete("/deleterecord/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const record = await salesController.deleteSalesRecord(id);
      res.status(200).json({ response: true, payload: record });
    } catch (error) {
      res.status(500).json({ response: false, payload: error.message });
    }
  });

  return api;
};
