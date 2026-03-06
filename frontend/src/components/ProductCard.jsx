import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../features/cart/cartSlice";

export function ProductCard({
  image,
  title,
  originalPrice,
  discountedPrice,
  salePercentage,
  onViewDetails,
  product,
}) {
  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const dispatch = useDispatch();

  const handleAddToBasket = (e) => {
    e.stopPropagation();
    setAdding(true);
    setTimeout(() => setAdding(false), 1200);
    dispatch(addItemsToCart({ id: product._id, quantity: 1 }));
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  // ✅ Safe fallbacks so toFixed never crashes on undefined
  const safeOriginal = Number(originalPrice) || 0;
  const safeDiscounted = Number(discountedPrice) || 0;
  const savings = safeOriginal - safeDiscounted;

  const discountPercent =
    salePercentage ??
    (safeOriginal > 0
      ? Math.round(((safeOriginal - safeDiscounted) / safeOriginal) * 100)
      : 0);

  return (
    <div
      onClick={onViewDetails}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(220,38,38,0.18)";
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* ── Image Section ── */}
      <div
        className="relative w-full h-72 overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #fff9f9 0%, #f3f4f6 100%)",
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0.07 }}
        >
          <div
            className="w-52 h-52 rounded-full"
            style={{
              background: "radial-gradient(circle, #ef4444, transparent)",
            }}
          />
        </div>

        {/* Product Image */}
        {image ? (
          <img
            src={image}
            alt={title}
            className="relative z-10 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          // Placeholder if no image
          <div className="relative z-10 w-full h-full flex items-center justify-center text-gray-300 text-sm">
            No Image
          </div>
        )}

        {/* Sale Badge */}
        {discountPercent > 0 && (
          <div
            className="absolute top-3 left-3 z-20 text-white text-xs font-black px-3 py-1.5 rounded-full tracking-wide"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
              boxShadow: "0 2px 8px rgba(239,68,68,0.45)",
            }}
          >
            {discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
        >
          <span
            style={{
              color: wishlisted ? "#ef4444" : "#d1d5db",
              fontSize: "18px",
            }}
          >
            {wishlisted ? "♥" : "♡"}
          </span>
        </button>

        {/* Bottom shimmer */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(239,68,68,0.07), transparent)",
          }}
        />
      </div>

      {/* ── Info Section ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug min-h-[40px] group-hover:text-red-600 transition-colors duration-200">
          {title || "Product"}
        </h3>

        {/* Price Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-black"
              style={{ color: "#dc2626", letterSpacing: "-0.5px" }}
            >
              ₹{safeDiscounted.toFixed(0)}
            </span>
            <span className="text-xs text-gray-400 line-through font-medium">
              ₹{safeOriginal.toFixed(0)}
            </span>
          </div>
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

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Add to Basket Button */}
        <button
          onClick={handleAddToBasket}
          className="w-full text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm tracking-wide"
          style={{
            background: adding
              ? "linear-gradient(135deg, #16a34a, #15803d)"
              : "linear-gradient(135deg, #ef4444, #b91c1c)",
            boxShadow: adding
              ? "0 4px 14px rgba(22,163,74,0.35)"
              : "0 4px 14px rgba(239,68,68,0.35)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
            transform: adding ? "scale(0.97)" : "scale(1)",
          }}
        >
          {adding ? (
            <>
              <span>✓</span> ADDED!
            </>
          ) : (
            <>
              <span>🛒</span> ADD TO BASKET
            </>
          )}
        </button>
      </div>
    </div>
  );
}
