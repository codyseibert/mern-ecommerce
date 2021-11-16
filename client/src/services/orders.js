import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const createOrder = async (form, cart) => {
  const { data: order } = await axios.post(`${BASE_URL}/checkout`, {
    contactInfo: form,
    items: cart.map((item) => item._id),
  });
  return order;
};
