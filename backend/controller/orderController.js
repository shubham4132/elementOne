import handleAsyncError from "../middleware/handleAsyncError.js";
import Order from "../models/orderModel.js";

export const createOrder = handleAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    subtotal,
    discount,
    shippingPrice,
    totalAmount,
  } = req.body;

  const isRazorpay = paymentMethod === "razorpay";

  const order = await Order.create({
    user: req.user._id,
    shippingInfo,
    orderItems,

    paymentMethod,
    paymentStatus: isRazorpay ? "paid" : "pending",

    // ✅ Sirf razorpay pe paymentInfo + paidAt save hoga
    ...(isRazorpay && {
      paymentInfo: {
        razorpayPaymentId: paymentInfo?.id,
        razorpayOrderId: paymentInfo?.orderId,
        razorpaySignature: paymentInfo?.signature,
      },
      paidAt: Date.now(),
    }),

    subtotal,
    discount,
    shippingPrice,
    totalAmount,

    // ✅ Initial status history
    statusHistory: [{ status: "processing", note: "Order placed" }],
  });

  res.status(201).json({
    success: true,
    order,
  });
});

export const allMyOrders = handleAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return next(new HandleError("No order found", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
});

//Getting all orders
export const getAllOrders = handleAsyncError(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email phone"); // ← yeh line change ki

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalAmount; // ← totalPrice tha, totalAmount kiya
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});
