import api from "./base";

export const createOrder = (data) => api.post("/payment/create-order", data);