const ProductController = require("../controller/product.controller");
const api = require("express").Router();
const verifyUser = require("../middleware/verification.middleware");
const authorization = require("../middleware/authorization.middleware");
const qrCode = require("qrcode");
const uploadImageMiddleware = require("../middleware/uploadimage.middleware");
const handleImageUpload = require("../middleware/handleimageupload.middleware");
const { Worker } = require("worker_threads");

module.exports = () => {
  api.get(
    "/single/:id",
    // [verifyUser, authorization(["Admin", "Regular"])],
    async (req, res) => {
      try {
        const id = req.params.id;
        const response = await ProductController.getProduct(id);
        res.status(200).json({ response: true, payload: response });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  api.get(
    "/",
    // [verifyUser, authorization(["Admin", "Regular"])],
    async (req, res) => {
      try {
        const response = await ProductController.getProducts();

        res.status(200).json({ response: true, payload: response });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  api.post(
    "/create-products",
    [
      verifyUser,
      authorization(["Admin"]),
      uploadImageMiddleware,
      handleImageUpload,
    ],
    async (req, res) => {
      const {
        productName,
        productAmount,
        initialStockQuantity,
        currentStockQuantity,
        productCategory,
        productImg,
        productQrCode,
        productQuantity,
        productDesc,
        productionDate,
        expiryDate,
      } = req.body;
      // req.body.productImg = req.productImg;
      try {
        const response = await ProductController.createProducts(
          productName,
          productAmount,
          initialStockQuantity,
          currentStockQuantity,
          productCategory,
          productImg,
          productQrCode,
          productQuantity,
          productDesc,
          productionDate,
          expiryDate
        );
        res.status(200).json({ response: true, payload: response });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  api.put(
    "/update-product/:id",
    // [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const id = req.params.id;
        const {
          productName,
          productAmount,
          productDesc,
          productImg,
          productQuantity,
          initialStockQuantity,
          currentStockQuantity,
        } = req.body;
        const response = await ProductController.updateProduct(
          id,
          productName,
          productAmount,
          productDesc,
          productImg,
          productQuantity,
          initialStockQuantity,
          currentStockQuantity
        );
        res
          .status(200)
          .json({ response: true, payload: "Product updated Successfully!" });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  // Generate qrcode on the fly

  api.get(
    "/qrcode/:id",
    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const id = req.params.id;
        const response = await ProductController.getProduct(id);
        //Generating qrcode for products using product id
        if (!response) {
          res
            .status(400)
            .json({ response: false, payload: "Error generating QR-Code" });
        }
        const qrImg = await qrCode.toString(id, {
          errorCorrectionLevel: "H",
          type: "svg",
          scale: 2,
          width: 350,
        });
        res.status(200).send(qrImg);
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  // Using Scanner for calculating cost of product bought

  api.post("/scan", async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const product = await ProductController.getProduct(productId);
      if (!product) {
        res.status(404).json({ response: false, payload: "No product found" });
      }
      quantity = quantity ? quantity : 1;
      if (!product.productQuantity >= quantity) {
        res.status(404).json({
          response: false,
          payload: "The quantity requested is more than what is in stock",
        });
      }
      const totalCost = product.productAmount * quantity;
      // Products successfully scanned should be pushed into an array
      res
        .status(200)
        .json({ response: true, payload: { productId, quantity, totalCost } });
    } catch (error) {
      res.status(500).json({ response: false, payload: error.message });
    }
  });

  // confirm-transaction

  api.post("/confirm-transaction", async (req, res) => {
    //The ScannedArr of products above should be sent here for processing
    const { productArr } = req.body;
    try {
      const worker = new Worker(
        __dirname + "/workers/updateproductquantity.worker.js",
        {
          workerData: { productArr },
        }
      );

      worker.on("message", (message) => {
        if (message.status) {
          res.status(200).json({ response: true, payload: message.payload });
        } else {
          res.status(500).json({ response: false, payload: "Error occurred" });
        }
      });
    } catch (error) {
      res.status(500).json({ response: false, payload: error.message });
    }
  });

  // route that calculates the inventory monetary worth.

  api.get("/inventoryvalue", async (req, res) => {
    try {
      const worker = new Worker(
        __dirname + "/workers/inventoryvalue.worker.js"
      );

      worker.on("message", (message) => {
        if (message.status) {
          res.status(200).json({ response: true, payload: message.payload });
        } else {
          res.status(400).json({
            response: false,
            payload: "Error occured from inventoryvalue worker",
          });
        }
      });
    } catch (error) {
      res.status(500).json({ response: false, payload: error.message });
    }
  });

  api.delete(
    "/delete-product/:id",
    // [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const id = req.params.id;
        const response = await ProductController.deleteProduct(id);
        res
          .status(200)
          .json({ response: true, payload: "Product Deleted Successfully!" });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  return api;
};
