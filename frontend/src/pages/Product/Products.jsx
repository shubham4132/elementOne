import ashwagandha from "../../assets/productimage/A.jpg";
import keto from "../../assets/productimage/Advance.png";
import carbBlocker from "../../assets/productimage/CARB-BLOCKER-.jpg";

let Products1 = [
  {
    id: 1,
    title: "Ashwagandha Extract 60 Capsules",
    image: ashwagandha,
    discountedPrice: 499,
    originalPrice: 699,
    rating: 4.5,
    category: "Ayurveda",
    stock: 20,
  },
  {
    id: 2,
    title: "Best Advance Keto Slimfast Kit Pack 4",
    image: keto,
    discountedPrice: 999,
    originalPrice: 1299,
    rating: 4.2,
    category: "Nutrition",
    stock: 15,
  },
  {
    id: 3,
    title: "Carb Blocker 60 Capsules",
    image: carbBlocker,
    discountedPrice: 499,
    originalPrice: 699,
    rating: 4.5,
    category: "Ayurveda",
    stock: 20,
  },
  {
    id: 4,
    title: "Best Advance Keto Slimfast Kit Pack 4",
    image: keto,
    discountedPrice: 999,
    originalPrice: 1299,
    rating: 4.2,
    category: "Nutrition",
    stock: 15,
  },
  {
    id: 5,
    title: "Ashwagandha Extract 60 Capsules",
    image: ashwagandha,
    discountedPrice: 499,
    originalPrice: 699,
    rating: 4.5,
    category: "Ayurveda",
    stock: 20,
  },
  {
    id: 6,
    title: "Best Advance Keto Slimfast Kit Pack 4",
    image: keto,
    discountedPrice: 999,
    originalPrice: 1299,
    rating: 4.2,
    category: "Nutrition",
    stock: 15,
  },
  {
    id: 7,
    title: "Ashwagandha Extract 60 Capsules",
    image: ashwagandha,
    discountedPrice: 499,
    originalPrice: 699,
    rating: 4.5,
    category: "Ayurveda",
    stock: 20,
  },
  {
    id: 8,
    title: "Best Advance Keto Slimfast Kit Pack 4",
    image: keto,
    discountedPrice: 999,
    originalPrice: 1299,
    rating: 4.2,
    category: "Nutrition",
    stock: 15,
  },
];

import React from "react";
import { ProductCard } from "../../components/ProductCard";

export default function Products() {
  return (
    <div className="w-full">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">
          Discover Our Most Selling Products
        </h2>
        <div className="w-48 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 mx-auto rounded-full" />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Products1.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            originalPrice={product.originalPrice}
            discountedPrice={product.discountedPrice}
            // onAddToBasket={() => onAddToBasket && onAddToBasket(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
