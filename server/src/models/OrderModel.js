const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  contactInfo: Object,
  items: Array,
});
const OrderModel = mongoose.model("Order", OrderSchema);

exports.OrderModel = OrderModel;
