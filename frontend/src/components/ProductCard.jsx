import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../features/cart/cartSlice";
import { Heart, ShoppingBag, CheckCircle2 } from "lucide-react";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

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
  // ✅ 1. Redux se wishlist products lo
  const { products: wishlistProducts } = useSelector((state) => state.wishlist);

  // ✅ 2. Check karo current product wishlist mein hai kya
  const isWishlisted = wishlistProducts?.some(
    (p) => (p._id || p) === product._id,
  );

  const handleAddToBasket = (e) => {
    e.stopPropagation();
    setAdding(true);
    setTimeout(() => setAdding(false), 1200);
    dispatch(addItemsToCart({ id: product._id, quantity: 1 }));
    toast.success(`${title} added to cart! 🛒`, {
      position: "top-right",
      autoClose: 1500,
    });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product._id));
    if (isWishlisted) {
      toast.info(`${title} removed from wishlist`, {
        position: "top-right",
        autoClose: 1500,
      });
    } else {
      toast.success(`${title} added to wishlist! ❤️`, {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  // Safe fallbacks so toFixed never crashes on undefined
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
      className="group flex flex-col bg-white rounded-[24px] overflow-hidden cursor-pointer border border-gray-100 relative"
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = "rgba(225,29,72,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#f3f4f6";
      }}
    >
      {/* ── Image Section ── */}
      <div className="relative w-full h-72 overflow-hidden bg-gray-50 flex items-center justify-center p-6">
        {/* Soft radial backdrop behind image */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)] opacity-80 pointer-events-none" />

        {/* Product Image */}
        {image ? (
          <img
            src={image}
            alt={title}
            className="relative z-10 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-md"
          />
        ) : (
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
            <ShoppingBag size={32} className="opacity-50" />
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}

        {/* Sale Badge */}
        {discountPercent > 0 && (
          <div
            className="absolute top-4 left-4 z-20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/20 backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, #FF416C, #FF4B2B)",
            }}
          >
            {discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center border border-gray-100 opacity-100 transition-all duration-300 hover:scale-110 shadow-sm"
        >
          <Heart
            size={18}
            className={`transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

      {/* ── Info Section ── */}
      <div className="flex flex-col flex-1 p-5 gap-4 bg-white relative">
        {/* Title */}
        <h3 className="text-[15px] font-bold text-gray-900 line-clamp-2 leading-snug min-h-[44px] group-hover:text-red-600 transition-colors duration-300">
          {title || "Premium Product"}
        </h3>

        {/* Price Row */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-2 items-baseline flex-wrap">
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              ₹{safeDiscounted.toFixed(0)}
            </span>
            {safeOriginal > safeDiscounted && (
              <span className="text-xs text-gray-400 line-through font-semibold">
                ₹{safeOriginal.toFixed(0)}
              </span>
            )}
            {savings > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-green-200 bg-green-50 text-green-700 uppercase tracking-widest hidden sm:inline-block">
                Save ₹{savings}
              </span>
            )}
          </div>
        </div>

        {/* Add to Basket Button */}
        <button
          onClick={handleAddToBasket}
          className="w-full text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all duration-300 relative overflow-hidden active:scale-[0.98]"
          style={{
            background: adding
              ? "linear-gradient(135deg, #10b981, #059669)"
              : "linear-gradient(135deg, #1f2937, #111827)",
            boxShadow: adding
              ? "0 4px 14px rgba(16,185,129,0.3)"
              : "0 4px 14px rgba(0,0,0,0.1)",
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            {adding ? (
              <>
                <CheckCircle2 size={16} className="animate-bounce" /> Added!
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Add to Cart
              </>
            )}
          </span>
          {/* Subtle gradient overlay effect on hover inside non-adding state */}
          {!adding && (
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          )}
        </button>
      </div>
    </div>
  );
}
