const { ProductModel } = require("../models/ProductModel");
const jwt = require("jsonwebtoken");
const { secretString } = require("./loginController");

exports.createProductController = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.substring(7);
  try {
    const user = jwt.verify(token, secretString);
    if (user.role !== "admin") {
      return res.status(403).send("authorization error");
    }
    const instance = new ProductModel(req.body);
    await instance.save();
    res.json(instance);
  } catch (err) {
    res.status(403).send("authorization error");
  }
};
