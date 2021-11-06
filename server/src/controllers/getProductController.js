const { ProductModel } = require("../models/ProductModel");

exports.getProductController = async (req, res) => {
  const { productId } = req.params;
  const product = await ProductModel.findById(productId);
  res.json(product);
};
