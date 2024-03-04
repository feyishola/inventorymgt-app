const mongoose = require("mongoose");

module.exports = async () => {
  const dbConn = mongoose.connection;

  dbConn
    .on("connected", () => {
      console.log("connected to mongodb");
    })
    .on("error", () => {
      console.log("Error connecting to mongodb");
    })
    .on("disconnected", () => {
      setTimeout(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
      }, 3000);
    });

  await mongoose.connect(process.env.MONGODB_URI);
};
