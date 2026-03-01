import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProductDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-lg">Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-red-600 font-semibold hover:underline"
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  // ── Map MongoDB / backend fields ────────────────────────────────
  const name = product.name ?? "Product";
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;

  // ✅ image is Array of objects {url, public_id} — extract just the URL strings
  const images =
    Array.isArray(product.image) && product.image.length > 0
      ? product.image.map((img) => img?.url ?? img) // handles both object & string
      : [];

  const description = product.description ?? "";
  const longDesc = product.longDescription ?? description;
  const benefits = Array.isArray(product.benefits) ? product.benefits : [];
  const ingredients = Array.isArray(product.ingredients)
    ? product.ingredients
    : [];
  const itemsSold = product.itemsSold ?? 0;
  const viewersCount = product.viewersCount ?? 0;
  const category = product.category ?? "";
  const stock = product.stock ?? 0;

  const discountPercent =
    product.discountPercent ??
    (originalPrice > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0);

  const savings = originalPrice - price;

  const handleAddToBasket = () => {
    setAdding(true);
    setTimeout(() => setAdding(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-red-600 hover:text-red-800 mb-8 font-semibold text-sm transition-colors"
      >
        ← Back to Products
      </button>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* ── Left: Images ── */}
          <div className="p-6 flex flex-col gap-4 border-r border-gray-100">
            {/* Main Image */}
            <div
              className="relative h-80 w-full rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #fff9f9, #f3f4f6)",
              }}
            >
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage]}
                  alt={name}
                  className="object-contain h-full w-full p-4"
                />
              ) : (
                <div className="text-gray-300 text-sm">No Image</div>
              )}

              {/* Sale Badge */}
              {discountPercent > 0 && (
                <span
                  className="absolute top-4 left-4 text-white text-xs font-black px-3 py-1.5 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                    boxShadow: "0 2px 8px rgba(239,68,68,0.4)",
                  }}
                >
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails — only if more than 1 image */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200"
                    style={{
                      borderColor:
                        selectedImage === i ? "#ef4444" : "transparent",
                      background: "#f9fafb",
                    }}
                  >
                    <img
                      src={img}
                      alt={`view ${i + 1}`}
                      className="object-contain h-full w-full p-1"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Category & Stock badges */}
            <div className="flex gap-2 flex-wrap">
              {category && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  {category}
                </span>
              )}
              {stock > 0 ? (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
                  ✓ In Stock ({stock} left)
                </span>
              ) : (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* ── Right: Info ── */}
          <div className="p-6 flex flex-col gap-4">
            {/* Product Name */}
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span
                className="text-3xl font-black"
                style={{ color: "#dc2626" }}
              >
                ₹{price}
              </span>
              {originalPrice > 0 && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{originalPrice}
                </span>
              )}
              {savings > 0 && (
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #fef9c3, #fef08a)",
                    color: "#92400e",
                    border: "1px solid #fde68a",
                  }}
                >
                  Save ₹{savings}
                </span>
              )}
            </div>

            {/* Urgency Badges */}
            {(itemsSold > 0 || viewersCount > 0) && (
              <div
                className="flex flex-col gap-1.5 text-sm py-3 px-4 rounded-xl"
                style={{ background: "#fff9f9", border: "1px solid #fee2e2" }}
              >
                {itemsSold > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>🔥</span>
                    <span>
                      <b>{itemsSold}</b> items sold in the last 3 hours
                    </span>
                  </div>
                )}
                {viewersCount > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>👁️</span>
                    <span>
                      <b>{viewersCount}</b> people viewing this right now
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {longDesc && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {longDesc}
              </p>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">
                  Key Benefits
                </h3>
                <ul className="space-y-1.5">
                  {benefits.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span
                        className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0"
                        style={{ background: "#ef4444", fontSize: "10px" }}
                      >
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            {ingredients.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">
                  Ingredients
                </h3>
                <ul className="space-y-1">
                  {ingredients.map((ing, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-red-400 mt-0.5">•</span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <label className="font-semibold text-gray-700 text-sm">
                Qty:
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToBasket}
                disabled={adding || stock === 0}
                className="w-full text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: adding
                    ? "linear-gradient(135deg, #16a34a, #15803d)"
                    : "linear-gradient(135deg, #ef4444, #b91c1c)",
                  boxShadow: adding
                    ? "0 4px 14px rgba(22,163,74,0.35)"
                    : "0 4px 14px rgba(239,68,68,0.35)",
                  opacity: stock === 0 ? 0.5 : 1,
                }}
              >
                {adding ? (
                  <>
                    <span>✓</span> ADDED TO BASKET
                  </>
                ) : (
                  <>
                    <span>🛒</span> ADD TO BASKET
                  </>
                )}
              </button>

              <button
                className="w-full text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #1f2937, #111827)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                }}
              >
                ⚡ BUY NOW
              </button>
            </div>

            {/* Wishlist & Compare */}
            <div className="flex gap-3">
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="flex-1 flex items-center justify-center gap-2 border-2 rounded-xl py-2 px-3 text-sm font-semibold transition-all duration-200"
                style={{
                  borderColor: wishlisted ? "#ef4444" : "#e5e7eb",
                  color: wishlisted ? "#ef4444" : "#6b7280",
                  background: wishlisted ? "#fff9f9" : "white",
                }}
              >
                {wishlisted ? "♥" : "♡"} Wishlist
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 rounded-xl py-2 px-3 text-sm font-semibold text-gray-500 hover:border-gray-400 transition-colors">
                ⚖ Compare
              </button>
            </div>

            {/* Safe Checkout */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-semibold uppercase mb-2 tracking-wider">
                Guaranteed Safe Checkout
              </p>
              <div className="flex gap-2 flex-wrap">
                {["VISA", "Mastercard", "PayPal", "Maestro", "UPI"].map((m) => (
                  <div
                    key={m}
                    className="h-8 px-3 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500"
                    style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
