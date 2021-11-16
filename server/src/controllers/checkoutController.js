const { OrderModel } = require("../models/OrderModel");

exports.checkoutController = async (req, res) => {
  const order = new OrderModel(req.body);
  const createdOrder = await order.save();
  // TODO: process the user card information using stripe or something,
  // send back success message with confirmation code
  res.json(createdOrder);
};
