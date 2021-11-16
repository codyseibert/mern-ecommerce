const { ProductModel } = require("../models/ProductModel");

exports.createProductController = async (req, res) => {
  const instance = new ProductModel({
    ...req.body,
    image: req.file?.filename,
  });
  await instance.save();
  res.json(instance);
};
