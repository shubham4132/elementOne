import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllMyOrders } from "../../features/order/orderSlice";
import {
  Search,
  ArrowLeft,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  X,
  RefreshCcw,
  ListOrdered,
  Eye,
  MapPin,
  CreditCard,
  Package
} from "lucide-react";

const statusConfig = {
  processing: {
    label: "Processing",
    styling: "text-lime-700 bg-lime-50 border-lime-200",
    icon: Clock,
  },
  delivered: {
    label: "Delivered",
    styling: "text-green-700 bg-green-50 border-green-200",
    icon: CheckCircle,
  },
  shipped: {
    label: "Shipped",
    styling: "text-sky-700 bg-sky-50 border-sky-200",
    icon: Truck,
  },
  cancelled: {
    label: "Cancelled",
    styling: "text-red-700 bg-red-50 border-red-200",
    icon: XCircle,
  },
  pending: {
    label: "Pending",
    styling: "text-amber-700 bg-amber-50 border-amber-200",
    icon: Clock,
  },
};

const filters = ["all", "processing", "shipped", "delivered", "cancelled"];

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.order);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detailOrder, setDetailOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllMyOrders());
  }, [dispatch]);

  const filtered = (orders || []).filter((o) => {
    const q = search.toLowerCase();
    const addr =
      `${o.shippingInfo?.address || ""} ${o.shippingInfo?.city || ""} ${o.shippingInfo?.state || ""}`.toLowerCase();
    const matchSearch = o._id.includes(q) || addr.includes(q);
    const matchStatus =
      statusFilter === "all" || o.orderStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center flex flex-col items-center">
          <RefreshCcw className="w-8 h-8 text-lime-500 animate-spin mb-3" />
          <div className="text-sm font-medium text-gray-500">
            Loading your orders...
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans p-4">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-red-100 max-w-sm w-full">
          <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <div className="text-red-600 font-medium mb-1">Failed to load orders</div>
          <p className="text-gray-500 text-xs mb-5">{error}</p>
          <button
            onClick={() => dispatch(getAllMyOrders())}
            className="w-full flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-10">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-1.5 text-gray-500 hover:text-lime-600 text-sm font-medium transition-colors mb-3 w-fit focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-lime-50 text-lime-600 rounded-lg border border-lime-100">
                <ListOrdered className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Order History</h1>
                <p className="text-xs text-gray-500 mt-0.5">Manage and track your recent purchases</p>
              </div>
            </div>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-md text-xs font-medium transition-colors border ${
                statusFilter === f
                  ? "bg-lime-50 border-lime-500 text-lime-700"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f === "all" ? `All (${orders?.length || 0})` : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((order) => {
                const sc = statusConfig[order.orderStatus] || statusConfig.processing;
                const StatusIcon = sc.icon;
                const date = new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                });
                const totalItems = order.orderItems?.reduce((a, b) => a + b.quantity, 0) || 0;
                const isPaid = order.paymentStatus === "paid";

                return (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded bg-lime-50 border border-lime-100 flex items-center justify-center text-lime-600">
                          <Package className="w-4 h-4" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-gray-900">
                            #{order._id.slice(-6).toUpperCase()}
                          </div>
                          <div className="text-xs text-gray-500">{totalItems} items</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{order.totalAmount?.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center text-xs font-medium ${isPaid ? "text-green-600" : "text-amber-600"}`}>
                        {isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${sc.styling}`}>
                        <StatusIcon className="w-3 h-3" />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setDetailOrder(order)}
                        className="text-lime-600 hover:text-lime-800 flex items-center justify-end gap-1.5 w-full focus:outline-none"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-xs text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>

        {/* Mobile List View */}
        <div className="md:hidden space-y-3">
          {filtered.map((order) => {
            const sc = statusConfig[order.orderStatus] || statusConfig.processing;
            const StatusIcon = sc.icon;
            const date = new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            });
            const totalItems = order.orderItems?.reduce((a, b) => a + b.quantity, 0) || 0;
            const isPaid = order.paymentStatus === "paid";

            return (
              <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                       #{order._id.slice(-6).toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{date} • {totalItems} items</div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${sc.styling}`}>
                    {sc.label}
                  </span>
                </div>
                
                <div className="flex justify-between items-end mt-4 pt-3 border-t border-gray-50">
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Total Amount</div>
                    <div className="text-sm font-bold text-gray-900">₹{order.totalAmount?.toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() => setDetailOrder(order)}
                    className="text-xs font-medium text-lime-600 hover:text-lime-700 bg-lime-50 px-3 py-1.5 rounded-md border border-lime-100 flex items-center gap-1"
                  >
                    View <ArrowLeft className="w-3 h-3 rotate-180" />
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-10 bg-white border border-gray-200 rounded-lg">
              <div className="text-gray-400 font-medium text-sm">No orders found</div>
            </div>
          )}
        </div>

      </div>

      {/* Detail Modal */}
      {detailOrder && (() => {
        const sc = statusConfig[detailOrder.orderStatus] || statusConfig.processing;
        const addr = `${detailOrder.shippingInfo?.address || ""}, ${detailOrder.shippingInfo?.city || ""}, ${detailOrder.shippingInfo?.state || ""} ${detailOrder.shippingInfo?.pincode || ""}`;
        const date = new Date(detailOrder.createdAt).toLocaleDateString("en-US", {
          month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
        });
        const isPaid = detailOrder.paymentStatus === "paid";

        return (
          <div
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setDetailOrder(null)}
          >
            <div
              className="bg-white rounded-lg w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Order Details
                  </h3>
                  <div className="text-xs text-gray-500 mt-0.5">ID: #{detailOrder._id.toUpperCase()}</div>
                </div>
                <button
                  onClick={() => setDetailOrder(null)}
                  className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500 transition-colors focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Info Column */}
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Ordered On
                      </h4>
                      <p className="text-sm text-gray-800">{date}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> Shipping Address
                      </h4>
                      <p className="text-sm text-gray-800 leading-relaxed bg-gray-50 p-2.5 rounded border border-gray-100">{addr}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5" /> Payment
                      </h4>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium uppercase border border-gray-200">
                          {detailOrder.paymentMethod || "N/A"}
                        </span>
                        <span className={`font-medium ${isPaid ? 'text-green-600' : 'text-amber-600'}`}>
                          {isPaid ? "Paid" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Status Column */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                       Order Status
                    </h4>
                    <div className={`p-3 rounded-md mb-6 border ${sc.styling} bg-opacity-40`}>
                      <div className="font-semibold text-sm">{sc.label}</div>
                      <div className="text-xs mt-1 opacity-80">This status was updated automatically.</div>
                    </div>

                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Order Summary
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-100 text-sm space-y-2.5">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium text-gray-900">₹{detailOrder.totalAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium text-gray-900">₹0</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="text-base font-bold text-lime-600">₹{detailOrder.totalAmount?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Items ({detailOrder.orderItems?.length || 0})
                  </h4>
                  <div className="space-y-2">
                    {detailOrder.orderItems?.map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-50 rounded border border-gray-100 flex items-center justify-center">
                             <Package className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price?.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                <button
                  onClick={() => setDetailOrder(null)}
                  className="px-5 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
