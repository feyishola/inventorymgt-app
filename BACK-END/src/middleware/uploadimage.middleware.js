const multer = require("multer");

const multerStorage = multer.memoryStorage(); // use memory storage for storing files temporarily

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"), false);
    }
  },
});

const uploadImageMiddleware = upload.single("productImg");

module.exports = uploadImageMiddleware;
