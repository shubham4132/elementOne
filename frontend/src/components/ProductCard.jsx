import React from "react";

export function ProductCard({ image, title, originalPrice, discountedPrice }) {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product Image */}
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 mb-3 line-clamp-2 min-h-10">
          {title}
        </h3>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 line-through">
              ₹{originalPrice.toFixed(2)}
            </span>
            <span className="text-lg font-bold text-red-600">
              ₹{discountedPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Add to Basket Button */}
        <button
          //   onClick={onAddToBasket}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mt-auto transition-colors duration-200"
        >
          🛒 ADD TO BASKET
        </button>
      </div>
    </div>
  );
}
