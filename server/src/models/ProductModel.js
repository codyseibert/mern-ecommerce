const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  cost: Number,
  name: String,
  description: String,
});
const ProductModel = mongoose.model("Product", ProductSchema);

exports.ProductModel = ProductModel;
