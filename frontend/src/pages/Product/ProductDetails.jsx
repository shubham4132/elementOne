import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Leaf,
  ShieldCheck,
  Star,
  Flame,
  Eye,
  CheckCircle2,
  Zap,
  Minus,
  Plus,
  Scale,
} from "lucide-react";

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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-gray-400 text-lg">Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>
      </div>
    );
  }

  const name = product.name ?? "Product";
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  const images =
    Array.isArray(product.image) && product.image.length > 0
      ? product.image.map((img) => img?.url ?? img)
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
    toast.success(`${name} added to cart! 🛒`, {
      position: "top-right",
      autoClose: 1500,
    });
    setTimeout(() => setAdding(false), 1200);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= Math.max(stock, 10)) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 mb-6 font-medium text-sm transition-all duration-300 group"
        >
          <span className="p-1.5 rounded-full bg-white shadow-sm border border-gray-100 group-hover:border-red-100 group-hover:bg-red-50 text-gray-400 group-hover:text-red-600 transition-all">
            <ArrowLeft size={16} />
          </span>
          Back to Shopping
        </button>

        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100">
          {/* TOP: 2 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
            {/* LEFT: Images */}
            <div className="p-6 lg:p-10 flex flex-col gap-6 md:border-r border-gray-100 bg-white md:sticky top-0 h-fit">
              <div
                className="relative h-96 w-full rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 group"
                style={{
                  background:
                    "radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%)",
                }}
              >
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage]}
                    alt={name}
                    className="object-contain h-full w-full p-8 group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <Leaf size={48} className="text-gray-200" />
                    <span className="text-sm font-medium">
                      No Image Available
                    </span>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {discountPercent > 0 && (
                    <span
                      className="text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/20 backdrop-blur-sm"
                      style={{
                        background: "linear-gradient(135deg, #FF416C, #FF4B2B)",
                      }}
                    >
                      {discountPercent}% OFF
                    </span>
                  )}
                  {category && (
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/90 text-gray-700 shadow-sm border border-gray-100 backdrop-blur-sm self-start">
                      {category}
                    </span>
                  )}
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className="relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 bg-gray-50 focus:outline-none"
                    >
                      <div
                        className={`absolute inset-0 border-2 rounded-xl transition-colors duration-200 z-10 ${selectedImage === i ? "border-red-500" : "border-transparent hover:border-gray-300"}`}
                      />
                      <img
                        src={img}
                        alt={`view ${i + 1}`}
                        className={`object-contain h-full w-full p-2 transition-transform duration-300 ${selectedImage === i ? "scale-110" : ""}`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product Info */}
            <div className="p-6 lg:p-10 flex flex-col gap-8 bg-[#FAFAFA]">
              {/* Header */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-[85%]">
                    {name}
                  </h1>
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className="p-2.5 rounded-full bg-white shadow-sm border border-gray-100 hover:border-red-200 hover:bg-red-50 transition-colors group focus:outline-none"
                  >
                    <Heart
                      size={20}
                      className={`transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-500"}`}
                    />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium">
                  {stock > 0 ? (
                    <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1 rounded-md">
                      <CheckCircle2 size={14} /> In Stock ({stock})
                    </span>
                  ) : (
                    <span className="text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                      Out of Stock
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} className="fill-amber-500" />
                    <Star size={14} className="fill-amber-500" />
                    <Star size={14} className="fill-amber-500" />
                    <Star size={14} className="fill-amber-500" />
                    <Star size={14} className="fill-amber-500 opacity-50" />
                    <span className="text-gray-500 ml-1 text-xs font-normal underline cursor-pointer">
                      4.0 (12 Reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-end gap-3 flex-wrap">
                  <span className="text-4xl font-black text-gray-900 tracking-tight">
                    ₹{price}
                  </span>
                  {originalPrice > 0 && (
                    <span className="text-lg text-gray-400 line-through mb-1 font-medium">
                      ₹{originalPrice}
                    </span>
                  )}
                  {savings > 0 && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-green-50 text-green-700 border border-green-200 mb-1.5 ml-1">
                      Save ₹{savings}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Social Proof */}
              {(itemsSold > 0 || viewersCount > 0) && (
                <div className="grid grid-cols-2 gap-3">
                  {itemsSold > 0 && (
                    <div className="flex items-center gap-3 bg-red-50 text-red-700 py-2.5 px-4 rounded-xl text-sm border border-red-100">
                      <Flame size={18} className="animate-pulse" />
                      <div>
                        <span className="font-bold">{itemsSold}</span>
                        <span className="opacity-80 ml-1 text-xs block">
                          sold today
                        </span>
                      </div>
                    </div>
                  )}
                  {viewersCount > 0 && (
                    <div className="flex items-center gap-3 bg-blue-50 text-blue-700 py-2.5 px-4 rounded-xl text-sm border border-blue-100">
                      <Eye size={18} />
                      <div>
                        <span className="font-bold">{viewersCount}</span>
                        <span className="opacity-80 ml-1 text-xs block">
                          watching now
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Benefits */}
              {benefits.length > 0 && (
                <div className="flex flex-col gap-3 pt-2">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck size={16} className="text-green-500" /> Why
                    choose this
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                    {benefits.slice(0, 4).map((b, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600 font-medium"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-green-500 shrink-0 mt-0.5"
                        />
                        <span className="leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Buttons */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm w-fit">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} strokeWidth={2.5} />
                    </button>
                    <div className="w-10 text-center font-bold text-gray-900 text-lg">
                      {quantity}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none disabled:opacity-50"
                      disabled={quantity >= stock}
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    Only {stock} available
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToBasket}
                    disabled={adding || stock === 0}
                    className="flex-1 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: adding
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : "linear-gradient(135deg, #E11D48, #BE123C)",
                      boxShadow: adding
                        ? "0 8px 20px rgba(16,185,129,0.3)"
                        : "0 8px 20px rgba(225,29,72,0.3)",
                      opacity: stock === 0 ? 0.6 : 1,
                    }}
                  >
                    {!adding && (
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    )}
                    <span className="relative flex items-center gap-2 z-10">
                      {adding ? (
                        <>
                          <CheckCircle2 size={20} className="animate-bounce" />{" "}
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={20} /> Add to Cart
                        </>
                      )}
                    </span>
                  </button>
                  <button
                    disabled={stock === 0}
                    className="flex-1 text-gray-900 bg-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-300 border-2 border-gray-900 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    <Zap
                      size={18}
                      className="fill-yellow-400 text-yellow-500"
                    />{" "}
                    Buy it Now
                  </button>
                </div>
              </div>

              {/* Compare & Safe Checkout */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-t border-b border-gray-100 mt-2">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors group">
                  <Scale
                    size={16}
                    className="text-gray-400 group-hover:text-gray-900 transition-colors"
                  />{" "}
                  Compare Product
                </button>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-green-500" />
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                    Safe Checkout
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ BOTTOM: Full width Description */}
          {longDesc && (
            <div className="px-6 lg:px-10 pb-10 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 py-6">
                About this product
              </h3>
              <div
                className="prose prose-sm prose-red max-w-none w-full text-gray-600 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                dangerouslySetInnerHTML={{ __html: longDesc }}
              />
            </div>
          )}

          {/* ✅ BOTTOM: Full width Ingredients */}
          {ingredients.length > 0 && (
            <div className="px-6 lg:px-10 pb-10">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Leaf size={18} className="text-green-500" /> Full Ingredients
              </h3>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-2">
                {ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg border border-green-100"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
