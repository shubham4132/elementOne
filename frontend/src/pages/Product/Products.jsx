import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../features/products/productSlice";

// ── Skeleton Card ────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
      <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-gray-200 rounded-full animate-pulse w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full animate-pulse w-1/2" />
        <div className="h-8 bg-gray-200 rounded-xl animate-pulse mt-2" />
      </div>
    </div>
  );
}

// ── Pagination ───────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-16">
      {/* Page Info Tag */}
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400">
        <span className="w-8 h-px bg-gray-200" />
        Page {currentPage} of {totalPages}
        <span className="w-8 h-px bg-gray-200" />
      </div>

      {/* Buttons Row */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold border-2 border-gray-200 text-gray-500 hover:border-green-500 hover:text-green-600 hover:bg-green-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Prev
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1.5">
          {getPageNumbers().map((item, idx) =>
            item === "..." ? (
              <span
                key={`dot-${idx}`}
                className="w-10 text-center text-gray-400 font-bold text-lg leading-none pb-1"
              >
                ···
              </span>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange(item)}
                className={`w-10 h-10 rounded-2xl text-sm font-black transition-all duration-200 ${
                  currentPage === item
                    ? "bg-gradient-to-br from-green-500 to-lime-400 text-white shadow-lg shadow-green-200 scale-110 border-2 border-green-400"
                    : "border-2 border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600 hover:bg-green-50 hover:scale-105"
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold border-2 border-gray-200 text-gray-500 hover:border-green-500 hover:text-green-600 hover:bg-green-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dot indicator */}
      <div className="flex items-center gap-1.5 mt-1">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`rounded-full transition-all duration-300 ${
              currentPage === i + 1
                ? "w-6 h-2 bg-green-500"
                : "w-2 h-2 bg-gray-300 hover:bg-green-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Products Page ───────────────────────────────────────────
export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, totalPages, productCount, loading } = useSelector(
    (state) => state.product,
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProduct({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleViewDetails = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* ── Section Header ── */}
      <div className="text-center mb-14 relative">
        {/* Background decorative text */}
        <p
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[80px] font-black text-gray-50 select-none pointer-events-none leading-none -z-10 hidden md:block"
          aria-hidden
        >
          PRODUCTS
        </p>

        {/* Tag */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Fresh Collection
        </div>

        <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-3">
          Discover Our Most
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-500">
            Selling Products
          </span>
        </h2>

        {/* Underline */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="w-12 h-0.5 bg-gray-200 rounded-full" />
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-lime-400 rounded-full" />
          <div className="w-12 h-0.5 bg-gray-200 rounded-full" />
        </div>

        {/* Product count */}
        {!loading && productCount > 0 && (
          <p className="text-sm text-gray-400 font-medium mt-3">
            Showing{" "}
            <span className="text-gray-700 font-bold">{products.length}</span>{" "}
            of <span className="text-gray-700 font-bold">{productCount}</span>{" "}
            products
          </p>
        )}
      </div>

      {/* ── Products Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : products && products.length > 0 ? (
          products.map((product, idx) => (
            <div
              key={product._id}
              className="opacity-0 animate-fadeInUp"
              style={{
                animationDelay: `${idx * 60}ms`,
                animationFillMode: "forwards",
              }}
            >
              <ProductCard
                product={product}
                image={product.image?.[0]?.url ?? ""}
                title={product.name}
                originalPrice={product.originalPrice ?? 0}
                discountedPrice={product.price ?? 0}
                salePercentage={
                  product.discountPercent ??
                  Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )
                }
                onViewDetails={() => handleViewDetails(product)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-4 flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
              🌿
            </div>
            <p className="text-gray-400 font-semibold text-lg">
              No products found
            </p>
            <p className="text-gray-300 text-sm">
              Try a different category or search
            </p>
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
