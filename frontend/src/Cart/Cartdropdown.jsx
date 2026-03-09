import { useState, useRef, useEffect } from "react";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  Plus,
  Minus,
  ShoppingBag,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItemFromCart, updateQuantity } from "../features/cart/cartSlice";
// import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems, "cartItems");

  // ✅ Dummy data — baad mein Redux se replace karo
  // const cartItems = [
  //   {
  //     _id: "1",
  //     name: "Ashwagandha Extract 60 Capsules",
  //     price: 499,
  //     originalPrice: 799,
  //     quantity: 2,
  //     image: "",
  //   },
  //   {
  //     _id: "2",
  //     name: "Best Junior Omega 3 Gummy",
  //     price: 550,
  //     originalPrice: 950,
  //     quantity: 1,
  //     image: "",
  //   },
  // ];

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const savings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0,
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRemove = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleQuantityChange = (id, delta) => {
    // dispatch(updateQuantity({ id, delta }));
    const item = cartItems.find((i) => i.product === id);
    if (!item) return;
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) {
      dispatch(removeItemFromCart(id));
      return;
    }
    if (newQuantity > item.stock) {
      alert("stock is not available");
      return;
    }
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ✅ Cart Button */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="relative p-1 cursor-pointer"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="text-gray-800" size={22} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </button>

      {/* ✅ Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          style={{ animation: "cartSlideIn 0.2s ease-out" }}
        >
          <style>{`
            @keyframes cartSlideIn {
              from { opacity: 0; transform: translateY(-8px) scale(0.98); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Header */}
          <div className="bg-lime-400 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-gray-800" />
              <h2 className="font-bold text-gray-800 text-base">My Cart</h2>
            </div>
            <span className="bg-white text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Items */}
          <div className="max-h-80 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <div className="w-16 h-16 bg-lime-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart size={28} className="text-lime-300" />
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  Your cart is empty
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="px-5 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-3">
                      {/* Image */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-lime-50 border border-lime-100 flex-shrink-0 flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ShoppingBag size={20} className="text-lime-300" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-green-700 font-bold text-sm">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                          {item.originalPrice && (
                            <span className="text-gray-400 text-xs line-through">
                              ₹{item.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        {/* Quantity + Remove */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.product, -1)
                              }
                              className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center hover:bg-lime-50 transition-colors"
                            >
                              <Minus size={11} className="text-gray-600" />
                            </button>
                            <span className="text-xs font-bold text-gray-800 w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.product, 1)
                              }
                              className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center hover:bg-lime-50 transition-colors"
                            >
                              <Plus size={11} className="text-gray-600" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemove(item.product)}
                            className="text-gray-300 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-gray-800">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
              {/* Savings */}
              {savings > 0 && (
                <div className="flex items-center justify-between mb-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                  <span className="text-green-700 text-xs font-semibold">
                    🎉 You're saving
                  </span>
                  <span className="text-green-700 text-xs font-bold">
                    ₹{savings.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              {/* Subtotal */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600 text-sm font-medium">
                  Subtotal
                </span>
                <span className="text-gray-900 font-bold text-lg">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-lime-400 hover:bg-lime-500 text-gray-800 font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md text-sm"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 text-gray-500 hover:text-gray-700 text-xs font-medium py-1.5 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
