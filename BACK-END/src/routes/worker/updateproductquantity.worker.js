const { parentPort, workerData } = require("worker_threads");
const productController = require("../../controller/product.controller");
require("../../connections/mongodb.con")();

// Function to update product quantity
(async () => {
  async function updateProductQuantities(productListsArr) {
    try {
      for (const { productId, quantity, totalCost } of productListsArr) {
        const product = await productController.getProduct(productId);
        if (!product) {
          throw new Error(`Product with productId ${productId} not found`);
        }
        const presentQuantity = product.productQuantity - quantity;
        // console.log(product.productName, product.presentQuantity);
        await productController.updateProductQuantity(
          productId,
          (productQuantity = presentQuantity)
        );
      }
      return { status: true, payload: "Stock Successfully Updated" };
    } catch (error) {
      return { status: false, payload: error.message };
    }
  }

  const result = await updateProductQuantities(workerData.productArr);
  parentPort.postMessage({ response: result });
})();
