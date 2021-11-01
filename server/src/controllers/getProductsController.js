const { ProductModel } = require("../models/ProductModel");

exports.getProductsController = async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
};
