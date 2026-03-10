import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shippingInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String, default: "" },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        image: { type: String, default: "" },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],

    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    // Razorpay specific — sirf razorpay orders mein populate hoga
    paymentInfo: {
      razorpayPaymentId: { type: String, default: null },
      razorpayOrderId: { type: String, default: null },
      razorpaySignature: { type: String, default: null },
    },

    paidAt: { type: Date, default: null },

    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    orderStatus: {
      type: String,
      enum: [
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "processing",
    },

    statusHistory: [
      {
        status: { type: String },
        changedAt: { type: Date, default: Date.now },
        note: { type: String, default: "" },
      },
    ],

    deliveredAt: { type: Date, default: null },
    cancelledAt: { type: Date, default: null },
    cancellationReason: { type: String, default: "" },
  },
  { timestamps: true },
);

// ── Indexes ──
orderSchema.index({ user: 1, createdAt: -1 }); // user ke orders newest first
orderSchema.index({ orderStatus: 1 }); // admin panel filtering
orderSchema.index({ "paymentInfo.razorpayPaymentId": 1 }); // payment lookup

export default mongoose.model("Order", orderSchema);
