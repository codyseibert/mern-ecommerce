const { UserModel } = require("../models/UserModel");

const jwt = require("jsonwebtoken");

exports.secretString = "my-super-secret-password";

exports.loginController = async (req, res) => {
  const userInDb = await UserModel.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!userInDb) {
    res.status(401).send("invalid login");
  } else {
    const userObject = userInDb.toObject();
    delete userObject.password;
    const token = jwt.sign(userObject, exports.secretString);
    res.json({
      token,
      user: userObject,
    });
  }
};
