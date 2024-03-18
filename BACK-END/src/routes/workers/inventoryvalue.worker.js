const { parentPort } = require("worker_threads");
const productController = require("../../controller/product.controller");
require("../../connections/mongodb.con")();

const totalInventoryValue = async () => {
  try {
    const totalProducts = await productController.getProducts();

    let totalValue = 0;
    for (const { productAmount, productQuantity } of totalProducts) {
      totalValue += productAmount * productQuantity;
    }
    // console.log({ totalValue });
    return totalValue;
  } catch (error) {
    return error.message;
  }
};

(async () => {
  try {
    const inventoryValue = await totalInventoryValue();
    // console.log({ inventoryValue });
    parentPort.postMessage({ status: true, payload: inventoryValue });
  } catch (error) {
    parentPort.postMessage({ status: false, payload: error.message });
  }
})();
