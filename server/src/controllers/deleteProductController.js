const { ProductModel } = require("../models/ProductModel");

exports.deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const product = await ProductModel.findById(productId);
  await product.delete();
  res.json(product);
};
