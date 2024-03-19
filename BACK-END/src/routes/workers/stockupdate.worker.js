const { parentPort, workerData } = require("worker_threads");
const stockController = require("../../controller/stock.controller");
const productController = require("../../controller/product.controller");
require("../../connections/mongodb.con")();

async function updateStock(newStock) {
  try {
    for (const { productId, restockQuantity } of newStock) {
      const product = await productController.getProduct(productId);
      if (!product) {
        return "product not found";
      }
      const updatedProductQuantity = product.productQuantity + restockQuantity;

      await productController.updateProductQuantity(
        productId,
        updatedProductQuantity
      );
    }
    return "Product Updated";
  } catch (error) {
    return error.message;
  }
}

(async () => {
  const newStock = workerData.stockRecordArr;
  const result = await updateStock(newStock);
  parentPort.postMessage({ status: true, payload: result });
})();
