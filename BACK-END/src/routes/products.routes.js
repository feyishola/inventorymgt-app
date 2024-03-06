const ProductController = require("../controller/product.controller");
const api = require("express").Router();
const verifyUser = require("../middleware/verification.middleware");
const authorization = require("../middleware/authorization.middleware");
const qrCode = require("qrcode");
const uploadImageMiddleware = require("../middleware/uploadimage.middleware");
const handleImageUpload = require("../middleware/handleimageupload.middleware");

module.exports = () => {
  api.get(
    "/products",
    [verifyUser, authorization(["Admin", "Regular"])],
    async (req, res) => {
      try {
        const response = await ProductController.getProducts();
        res.status(200).json({ response: true, payload: response });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

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

  api.get(
    "/:id",
    [verifyUser, authorization(["Admin", "Regular"])],
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
    [verifyUser, authorization(["Admin"])],
    async (req, res) => {
      try {
        const id = req.params.id;
        const { productAmount, productDesc, productImg, productQuantity } =
          req.body;
        const response = await ProductController.updateProduct(
          id,
          productAmount,
          productDesc,
          productImg,
          productQuantity
        );
        res
          .status(200)
          .json({ response: true, payload: "Product updated Successfully!" });
      } catch (error) {
        res.status(500).json({ response: false, payload: error.message });
      }
    }
  );

  api.delete(
    "/delete-product/:id",
    [verifyUser, authorization(["Admin"])],
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
