const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const {
  createProductController,
} = require("./controllers/createProductController");

app.use(express.json());
app.use(cors());

app.post("/products", createProductController);

mongoose.connect("mongodb://localhost/shopping_cart").then(() => {
  app.listen(8080);
});
