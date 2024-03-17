require("dotenv").config();
require("./connections/mongodb.con")();
const userRoute = require("./routes/users.routes")();
const productRoute = require("./routes/products.routes")();
const salesRoute = require("./routes/sales.routes")();
const express = require("express");
const cors = require("cors");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/sales", salesRoute);

const Port = process.env.PORT || 4000;

app.listen(Port, () => {
  console.log(`connected to server on port ${Port}`);
});
