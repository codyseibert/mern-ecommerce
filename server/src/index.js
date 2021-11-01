const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const {
  createProductController,
} = require("./controllers/createProductController");
const {
  getProductsController,
} = require("./controllers/getProductsController");

app.use(express.json());
app.use(cors());

app.post("/products", createProductController);
app.get("/products", getProductsController);

mongoose.connect("mongodb://localhost/shopping_cart").then(() => {
  app.listen(8080);
});
