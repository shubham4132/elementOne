import handleAsyncError from "../middleware/handleAsyncError.js";
import Order from "../models/orderModel.js";
export const createOrder = handleAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    subtotal,
    discount,
    shippingPrice,
    totalAmount,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentMethod: "cod",
    paymentStatus: "pending",
    subtotal,
    discount,
    shippingPrice,
    totalAmount,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});
