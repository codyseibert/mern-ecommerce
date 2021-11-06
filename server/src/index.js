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
const { registerController } = require("./controllers/registerController");
const { loginController } = require("./controllers/loginController");
const { getProductController } = require("./controllers/getProductController");
const {
  updateProductController,
} = require("./controllers/updateProductController");

app.use(express.json());
app.use(cors());

app.post("/products", createProductController);
app.get("/products", getProductsController);
app.get("/products/:productId", getProductController);
app.patch("/products/:productId", updateProductController);
app.post("/register", registerController);
app.post("/login", loginController);

mongoose.connect("mongodb://localhost/shopping_cart").then(() => {
  app.listen(8080);
});
