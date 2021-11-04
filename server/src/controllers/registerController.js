const { UserModel } = require("../models/UserModel");

exports.registerController = async (req, res) => {
  const userInstance = new UserModel(req.body);
  await userInstance.save();
  res.json(userInstance);
};
