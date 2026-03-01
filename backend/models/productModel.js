import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // ── STEP 1 : Basic Info ─────────────────────────────────────────
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
    maxLength: [120, "Product name cannot exceed 120 characters"],
  },

  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [7, "Price cannot exceed 7 digits"],
    min: [0, "Price cannot be negative"],
  },

  // MRP / crossed-out price — discount % virtual se calculate hoga
  originalPrice: {
    type: Number,
    default: null,
    min: [0, "Original price cannot be negative"],
  },

  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
    trim: true,
  },

  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [5, "Stock cannot exceed 5 digits"],
    default: 1,
    min: [0, "Stock cannot be negative"],
  },

  // ── STEP 1 : Social Proof ───────────────────────────────────────

  // Admin manually set karta hai — storefront pe "X sold" dikhta hai
  itemsSold: {
    type: Number,
    default: 0,
    min: [0, "Items sold cannot be negative"],
  },

  // Admin manually set karta hai — storefront pe "X watching" dikhta hai
  viewersCount: {
    type: Number,
    default: 0,
    min: [0, "Viewers count cannot be negative"],
  },

  // ── STEP 2 : Descriptions ───────────────────────────────────────

  // Short one-liner — product listing cards pe dikhta hai
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
    trim: true,
  },

  // Full detail — product detail page (PDP) pe dikhta hai
  longDescription: {
    type: String,
    trim: true,
    default: "",
    maxLength: [3000, "Long description cannot exceed 3000 characters"],
  },

  // ── STEP 3 : Ingredients & Benefits ────────────────────────────

  // e.g. ["Ashwagandha", "Amla", "Giloy"]
  ingredients: {
    type: [String],
    default: [],
  },

  // e.g. ["Supports bone density", "Boosts immunity"]
  benefits: {
    type: [String],
    default: [],
  },

  // ── STEP 4 : Images (Cloudinary) ───────────────────────────────
  // public_id → Cloudinary se delete karne ke liye
  // url       → frontend pe render hone wala CDN link
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  // ── Meta ────────────────────────────────────────────────────────
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ─────────────────────────────────────────────────────────────────
//  VIRTUAL : discountPercent
//  DB mein store nahi hota — price & originalPrice se auto-calculate
//  Example: price=550, originalPrice=950  →  discountPercent = 42
// ─────────────────────────────────────────────────────────────────
productSchema.virtual("discountPercent").get(function () {
  if (!this.originalPrice || this.originalPrice <= 0) return 0;
  return Math.round(
    ((this.originalPrice - this.price) / this.originalPrice) * 100,
  );
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export default mongoose.model("Product", productSchema);
