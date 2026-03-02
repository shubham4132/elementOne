import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../features/products/productSlice";

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct({}));
  }, [dispatch]);

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

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
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              image={product.image?.[0]?.url ?? ""} // ✅ extract .url from image object
              title={product.name}
              originalPrice={product.originalPrice ?? 0}
              discountedPrice={product.price ?? 0}
              salePercentage={
                product.discountPercent ?? // ✅ backend sends discountPercent
                Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100,
                )
              }
              onViewDetails={() => handleViewDetails(product)}
            />
          ))
        ) : (
          <div className="col-span-4 text-center py-20 text-gray-400">
            Loading products...
          </div>
        )}
      </div>
    </div>
  );
}
