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
