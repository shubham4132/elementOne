import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../features/order/orderSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { CheckCircle2, Truck } from "lucide-react";

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error } = useSelector((state) => state.order);

  useEffect(() => {
    const saveOrder = async () => {
      const pending = JSON.parse(sessionStorage.getItem("pendingOrder"));
      if (!pending) return; // already saved ya direct access

      await dispatch(
        createOrder({
          ...pending,
          paymentInfo: {
            id: reference,
            status: "paid",
          },
        }),
      );

      sessionStorage.removeItem("pendingOrder"); // cleanup
      dispatch(clearCart());
    };

    saveOrder();
  }, []); // sirf mount pe ek baar

  useEffect(() => {
    if (success) {
      setTimeout(() => navigate("/"), 4000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      alert(`Order save failed! Payment ID: ${reference}. Contact support.`);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle2 size={48} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-2">
          Thank you for your order. We'll send you a confirmation shortly.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Reference ID: <strong className="text-gray-600">{reference}</strong>
        </p>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Truck size={18} className="text-lime-500" />
            <span>
              Estimated delivery:{" "}
              <strong className="text-gray-800">3-5 business days</strong>
            </span>
          </div>
        </div>
        <p className="text-gray-400 text-sm">Redirecting to home...</p>
      </div>
    </div>
  );
}
