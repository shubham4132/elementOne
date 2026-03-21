import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getWishlist,
  toggleWishlist,
} from "../../features/wishlist/wishlistSlice";
import { addItemsToCart } from "../../features/cart/cartSlice.js";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addItemsToCart({ id: product._id, quantity: 1 }));
    toast.success(`${product.name} added to cart! 🛒`, {
      position: "top-right",
      autoClose: 1500,
    });
  };

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{
        background:
          "linear-gradient(135deg, #f0fdf4 0%, #fafffe 50%, #f8fafc 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 font-medium text-sm transition-all duration-200 group"
        >
          <span className="p-1.5 rounded-full bg-white shadow-sm border border-gray-100 group-hover:border-gray-300 transition-all">
            <ArrowLeft size={15} />
          </span>
          Back
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
            <Heart className="text-red-500 fill-red-500" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              My Wishlist
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              {products.length > 0
                ? `${products.length} saved item${products.length > 1 ? "s" : ""}`
                : "No items saved yet"}
            </p>
          </div>
          {products.length > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-sm shadow-red-200">
              {products.length}
            </span>
          )}
        </div>

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <div className="w-28 h-28 rounded-full bg-white border border-red-100 shadow-sm flex items-center justify-center">
              <Heart size={44} className="text-red-200" />
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-bold text-xl mb-1">
                Your wishlist is empty
              </p>
              <p className="text-gray-400 text-sm">
                Save products you love by clicking the heart icon
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="mt-2 px-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-700 transition-all shadow-sm text-sm"
            >
              Browse Products
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100"
              >
                <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-4 bg-gray-100 rounded-full animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-100 rounded-full animate-pulse w-1/2" />
                  <div className="h-9 bg-gray-100 rounded-xl animate-pulse mt-1" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const savings = product.originalPrice - product.price;
              const discountPercent =
                product.originalPrice > 0
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )
                  : 0;

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
                >
                  {/* Image */}
                  <div
                    className="relative h-56 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6 cursor-pointer overflow-hidden group"
                    onClick={() =>
                      navigate(`/product/${product._id}`, {
                        state: { product },
                      })
                    }
                  >
                    {discountPercent > 0 && (
                      <span
                        className="absolute top-3 left-3 z-10 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md"
                        style={{
                          background:
                            "linear-gradient(135deg, #FF416C, #FF4B2B)",
                        }}
                      >
                        {discountPercent}% OFF
                      </span>
                    )}
                    {product.image?.[0]?.url ? (
                      <img
                        src={product.image[0].url}
                        alt={product.name}
                        className="h-full w-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-sm"
                      />
                    ) : (
                      <ShoppingBag size={32} className="text-gray-200" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <h3
                      className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug cursor-pointer hover:text-red-600 transition-colors"
                      onClick={() =>
                        navigate(`/product/${product._id}`, {
                          state: { product },
                        })
                      }
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-xl font-black text-gray-900">
                        ₹{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through font-medium">
                          ₹{product.originalPrice}
                        </span>
                      )}
                      {savings > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-green-50 text-green-700 border border-green-100">
                          Save ₹{savings}
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-auto pt-1">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 hover:opacity-90 active:scale-95"
                        style={{
                          background:
                            "linear-gradient(135deg, #1f2937, #111827)",
                        }}
                      >
                        <ShoppingBag size={13} /> Add to Cart
                      </button>
                      <button
                        onClick={() => dispatch(toggleWishlist(product._id))}
                        className="w-10 h-10 rounded-xl border-2 border-red-100 bg-red-50 flex items-center justify-center hover:bg-red-100 hover:border-red-200 transition-all active:scale-95"
                      >
                        <Trash2 size={15} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
