require("dotenv").config();
require("./connections/mongodb.con")();
const userRoute = require("./routes/users.routes")();
const productRoute = require("./routes/products.routes")();
const express = require("express");
const cors = require("cors");

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/product", productRoute);

const Port = process.env.PORT || 4000;

app.listen(Port, () => {
  console.log(`connected to server on port ${Port}`);
});
