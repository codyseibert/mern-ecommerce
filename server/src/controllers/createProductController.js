const { ProductModel } = require("../models/ProductModel");

exports.createProductController = async (req, res) => {
  console.log(req.body);
  const instance = new ProductModel(req.body);
  await instance.save();
  res.json(instance);
};
