const uploadImageToFireBase = require("../utils/firebase.config");
const uuid = require("uuid").v4;

const handleImageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("No image uploaded");
    }
    const imageName = `${uuid()}-${req.file.originalname}`;
    const productImgUrl = await uploadImageToFireBase(
      req.file.buffer,
      imageName
    );
    req.body.productImg = productImgUrl;
    next();
  } catch (error) {
    res.status(500).json({ response: false, payload: error.message });
  }
};

module.exports = handleImageUpload;
