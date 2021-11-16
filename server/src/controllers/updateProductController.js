const { ProductModel } = require("../models/ProductModel");

exports.updateProductController = async (req, res) => {
  const { cost, name, description } = req.body;
  const { productId } = req.params;
  const product = await ProductModel.findById(productId);
  const image = req.file?.filename;
  Object.assign(product, { cost, name, description });
  if (image) {
    product.image = image;
  }
  await product.save();
  res.json(product);
};
