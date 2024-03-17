const productModel = require("../model/products.model");

class ProductController {
  async createProducts(
    productName,
    productAmount,
    productCategory,
    productImg,
    productQrCode,
    productQuantity,
    productDesc,
    productionDate,
    expiryDate
  ) {
    // convert image to buffer base64 and saves it to firebase in return a url which is saved on mongodb.
    // const imageBuffer = Buffer.from(productImg, "base64");
    // const productImgUrl = await uploadImageToFireBase(imageBuffer, productImg);

    const newProduct = new productModel({
      productName,
      productAmount,
      productCategory,
      productImg,
      productQrCode,
      productQuantity,
      productDesc,
      productionDate,
      expiryDate,
    });
    // console.log({ data });
    const result = await newProduct.save();
    return result;
  }

  async getProduct(id) {
    const result = await productModel.findById(id);
    return result;
  }

  async getProducts() {
    const result = await productModel.find();
    return result;
  }

  async updateProduct(
    id,
    productAmount,
    productDesc,
    productImg,
    productQuantity
  ) {
    const result = await productModel.findByIdAndUpdate(
      { _id: id },
      { $set: { productAmount, productDesc, productImg, productQuantity } }
    );
    return result;
  }

  async updateProductQuantity(id, productQuantity) {
    const result = await productModel.findByIdAndUpdate(
      id,
      { productQuantity },
      {
        new: true,
      }
    );
    return result;
  }

  async deleteProduct(id) {
    const result = await productModel.findByIdAndDelete(id);
    return result;
  }
}

module.exports = new ProductController();
