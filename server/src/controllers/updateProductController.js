const { ProductModel } = require("../models/ProductModel");

exports.updateProductController = async (req, res) => {
  const { cost, name, description } = req.body;
  const { productId } = req.params;
  const product = await ProductModel.findById(productId);
  Object.assign(product, { cost, name, description });
  await product.save();
  res.json(product);
};
