import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../features/admin/adminSlice";
import {
  ShoppingBag,
  Search,
  Trash2,
  Edit2,
  Eye,
  X,
  Check,
  MapPin,
  User,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const statusStyle = {
  pending: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
  },
  processing: {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.25)",
  },
  shipped: {
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.25)",
  },
  delivered: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
  },
  cancelled: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
  },
};

const payStyle = {
  paid: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
  },
  pending: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
  },
};

export default function AdminOrders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.admin);

  const [localOverrides, setLocalOverrides] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const mergedOrders = (orders || [])
    .map((o) =>
      localOverrides[o._id] ? { ...o, ...localOverrides[o._id] } : o,
    )
    .filter((o) => !localOverrides[o._id]?.__deleted);

  const filtered = mergedOrders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      o.shortId?.toLowerCase().includes(q) ||
      o.user?.name?.toLowerCase().includes(q) ||
      o.user?.email?.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === "all" || o.orderStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const markPaid = (id) =>
    setLocalOverrides((prev) => ({
      ...prev,
      [id]: { ...prev[id], paymentStatus: "paid" },
    }));

  const deleteOrder = (id) => {
    setLocalOverrides((prev) => ({ ...prev, [id]: { __deleted: true } }));
    setDeleteConfirm(null);
  };

  const openEdit = (order) => {
    setEditData({
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
    });
    setEditOrder(order);
  };

  const saveEdit = () => {
    setLocalOverrides((prev) => ({
      ...prev,
      [editOrder._id]: { ...prev[editOrder._id], ...editData },
    }));
    setEditOrder(null);
  };

  const stats = [
    { label: "Total Orders", value: mergedOrders.length, color: "#4ade80" },
    {
      label: "Pending Payment",
      value: mergedOrders.filter((o) => o.paymentStatus === "pending").length,
      color: "#f59e0b",
    },
    {
      label: "Processing",
      value: mergedOrders.filter((o) => o.orderStatus === "processing").length,
      color: "#3b82f6",
    },
    {
      label: "Delivered",
      value: mergedOrders.filter((o) => o.orderStatus === "delivered").length,
      color: "#22c55e",
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f0f4f0",
          fontFamily: "'Segoe UI', sans-serif",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: "3px solid #e5e7eb",
            borderTop: "3px solid #1a4d2e",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ color: "#6b7280", fontSize: 14, fontWeight: 600 }}>
          Loading orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f0f4f0",
          fontFamily: "'Segoe UI', sans-serif",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #fecaca",
            borderRadius: 12,
            padding: "24px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
          <div style={{ color: "#ef4444", fontSize: 15, fontWeight: 700 }}>
            Failed to load orders
          </div>
          <div style={{ color: "#9ca3af", fontSize: 13, marginTop: 4 }}>
            {typeof error === "string" ? error : "Something went wrong"}
          </div>
          <button
            onClick={() => dispatch(fetchAllOrders())}
            style={{
              marginTop: 16,
              padding: "9px 24px",
              borderRadius: 8,
              border: "none",
              background: "#1a4d2e",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#f0f4f0",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "28px 32px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#6b7280",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 12,
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1a4d2e")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 4,
          }}
        >
          <ShoppingBag size={22} color="#1a4d2e" />
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 800,
              color: "#1a4d2e",
            }}
          >
            Orders
          </h1>
          <span
            style={{
              background: "#1a4d2e",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 20,
            }}
          >
            {mergedOrders.length}
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>
          Manage, edit and track all customer orders
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "16px 20px",
              border: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 4,
                }}
              >
                {s.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#111827" }}>
                {s.value}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: s.color + "22",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: s.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        {/* Toolbar */}
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            gap: 12,
            alignItems: "center",
            borderBottom: "1px solid #f3f4f6",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                left: 11,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, customer..."
              style={{
                width: "100%",
                paddingLeft: 32,
                paddingRight: 12,
                height: 38,
                borderRadius: 8,
                border: "1.5px solid #e5e7eb",
                fontSize: 13,
                outline: "none",
                color: "#111827",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["all", ...ORDER_STATUSES].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "1.5px solid",
                  borderColor: statusFilter === f ? "#1a4d2e" : "#e5e7eb",
                  background: statusFilter === f ? "#1a4d2e" : "#fff",
                  color: statusFilter === f ? "#fff" : "#6b7280",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  transition: "all 0.15s",
                }}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {[
                  "Order",
                  "Customer",
                  "Date",
                  "Items",
                  "Total",
                  "Payment",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const ss =
                  statusStyle[order.orderStatus] || statusStyle.pending;
                const ps = payStyle[order.paymentStatus] || payStyle.pending;
                return (
                  <tr
                    key={order._id}
                    style={{
                      borderBottom: "1px solid #f9fafb",
                      transition: "background 0.12s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fafafa")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "13px 16px" }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#1a4d2e",
                        }}
                      >
                        {order.shortId || order._id?.slice(-6).toUpperCase()}
                      </div>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 13,
                          color: "#111827",
                        }}
                      >
                        {order.user?.name || "—"}
                      </div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>
                        {order.user?.email || "—"}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "13px 16px",
                        fontSize: 12,
                        color: "#6b7280",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order.createdAt?.slice(0, 10)}
                    </td>
                    <td
                      style={{
                        padding: "13px 16px",
                        fontSize: 13,
                        color: "#374151",
                        textAlign: "center",
                      }}
                    >
                      {order.orderItems?.reduce((a, b) => a + b.qty, 0)}
                    </td>
                    <td
                      style={{
                        padding: "13px 16px",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#111827",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₹{order.totalAmount?.toLocaleString()}
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: ps.color,
                            background: ps.bg,
                            border: `1px solid ${ps.border}`,
                            padding: "3px 10px",
                            borderRadius: 20,
                            textTransform: "capitalize",
                          }}
                        >
                          {order.paymentStatus}
                        </span>
                        {order.paymentStatus === "pending" && (
                          <button
                            onClick={() => markPaid(order._id)}
                            title="Mark as Paid"
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              border: "1.5px solid #22c55e",
                              background: "rgba(34,197,94,0.1)",
                              color: "#22c55e",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Check size={12} />
                          </button>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "#9ca3af",
                          marginTop: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        {order.paymentMethod}
                      </div>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: ss.color,
                          background: ss.bg,
                          border: `1px solid ${ss.border}`,
                          padding: "3px 10px",
                          borderRadius: 20,
                          textTransform: "capitalize",
                        }}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {[
                          {
                            icon: <Eye size={13} />,
                            onClick: () => setViewOrder(order),
                            hover: "#1a4d2e",
                          },
                          {
                            icon: <Edit2 size={13} />,
                            onClick: () => openEdit(order),
                            hover: "#3b82f6",
                          },
                          {
                            icon: <Trash2 size={13} />,
                            onClick: () => setDeleteConfirm(order),
                            hover: "#ef4444",
                          },
                        ].map((btn, i) => (
                          <button
                            key={i}
                            onClick={btn.onClick}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 7,
                              border: "1.5px solid #e5e7eb",
                              background: "#fff",
                              color: "#6b7280",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = btn.hover;
                              e.currentTarget.style.color = btn.hover;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "#e5e7eb";
                              e.currentTarget.style.color = "#6b7280";
                            }}
                          >
                            {btn.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      padding: "52px",
                      textAlign: "center",
                      color: "#9ca3af",
                      fontSize: 14,
                    }}
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #f3f4f6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 12, color: "#9ca3af" }}>
            Showing {filtered.length} of {mergedOrders.length} orders
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: "1.5px solid",
                  borderColor: p === 1 ? "#1a4d2e" : "#e5e7eb",
                  background: p === 1 ? "#1a4d2e" : "#fff",
                  color: p === 1 ? "#fff" : "#9ca3af",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewOrder && (
        <Modal
          onClose={() => setViewOrder(null)}
          title={`Order Details — ${viewOrder.shortId || viewOrder._id?.slice(-6).toUpperCase()}`}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <InfoBlock icon={<User size={14} />} label="Customer">
              <div style={{ fontWeight: 600 }}>
                {viewOrder.user?.name || "—"}
              </div>
              <div style={{ color: "#6b7280", fontSize: 12 }}>
                {viewOrder.user?.email || "—"}
              </div>
              <div style={{ color: "#6b7280", fontSize: 12 }}>
                {viewOrder.user?.phone || "—"}
              </div>
            </InfoBlock>
            <InfoBlock icon={<MapPin size={14} />} label="Shipping Address">
              <div style={{ fontSize: 13, color: "#374151" }}>
                {viewOrder.shippingInfo?.address},{" "}
                {viewOrder.shippingInfo?.city}
                <br />
                {viewOrder.shippingInfo?.state} —{" "}
                {viewOrder.shippingInfo?.pincode}
              </div>
            </InfoBlock>
          </div>
          <div
            style={{
              background: "#f9fafb",
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Order Items
            </div>
            {viewOrder.orderItems?.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom:
                    i < viewOrder.orderItems.length - 1
                      ? "1px solid #e5e7eb"
                      : "none",
                }}
              >
                <span style={{ fontSize: 13, color: "#374151" }}>
                  {item.name} × {item.qty}
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}
                >
                  ₹{(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <Badge style={statusStyle[viewOrder.orderStatus]}>
                {viewOrder.orderStatus}
              </Badge>
              <Badge style={payStyle[viewOrder.paymentStatus]}>
                {viewOrder.paymentStatus}
              </Badge>
              <span
                style={{ fontSize: 12, color: "#9ca3af", alignSelf: "center" }}
              >
                {viewOrder.paymentMethod?.toUpperCase()}
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>
                Subtotal ₹{viewOrder.subtotal} + Ship ₹{viewOrder.shippingPrice}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#1a4d2e" }}>
                Total ₹{viewOrder.totalAmount?.toLocaleString()}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {editOrder && (
        <Modal
          onClose={() => setEditOrder(null)}
          title={`Edit Order — ${editOrder.shortId || editOrder._id?.slice(-6).toUpperCase()}`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>Order Status</label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 6,
                }}
              >
                {ORDER_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      setEditData((d) => ({ ...d, orderStatus: s }))
                    }
                    style={{
                      padding: "6px 16px",
                      borderRadius: 20,
                      border: "1.5px solid",
                      borderColor:
                        editData.orderStatus === s
                          ? statusStyle[s].color
                          : "#e5e7eb",
                      background:
                        editData.orderStatus === s ? statusStyle[s].bg : "#fff",
                      color:
                        editData.orderStatus === s
                          ? statusStyle[s].color
                          : "#6b7280",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Payment Status</label>
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                {["paid", "pending"].map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      setEditData((d) => ({ ...d, paymentStatus: s }))
                    }
                    style={{
                      padding: "6px 20px",
                      borderRadius: 20,
                      border: "1.5px solid",
                      borderColor:
                        editData.paymentStatus === s
                          ? payStyle[s].color
                          : "#e5e7eb",
                      background:
                        editData.paymentStatus === s ? payStyle[s].bg : "#fff",
                      color:
                        editData.paymentStatus === s
                          ? payStyle[s].color
                          : "#6b7280",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
                paddingTop: 8,
              }}
            >
              <button
                onClick={() => setEditOrder(null)}
                style={{
                  padding: "9px 20px",
                  borderRadius: 8,
                  border: "1.5px solid #e5e7eb",
                  background: "#fff",
                  color: "#6b7280",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                style={{
                  padding: "9px 24px",
                  borderRadius: 8,
                  border: "none",
                  background: "#1a4d2e",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <Modal
          onClose={() => setDeleteConfirm(null)}
          title="Delete Order?"
          width={380}
        >
          <div
            style={{
              fontSize: 14,
              color: "#374151",
              marginBottom: 20,
              lineHeight: 1.6,
            }}
          >
            Are you sure you want to delete order{" "}
            <strong>
              {deleteConfirm.shortId ||
                deleteConfirm._id?.slice(-6).toUpperCase()}
            </strong>{" "}
            for <strong>{deleteConfirm.user?.name || "this customer"}</strong>?
            This action cannot be undone.
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button
              onClick={() => setDeleteConfirm(null)}
              style={{
                padding: "9px 20px",
                borderRadius: 8,
                border: "1.5px solid #e5e7eb",
                background: "#fff",
                color: "#6b7280",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => deleteOrder(deleteConfirm._id)}
              style={{
                padding: "9px 24px",
                borderRadius: 8,
                border: "none",
                background: "#ef4444",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose, title, width = 520 }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 28,
          width: "100%",
          maxWidth: width,
          boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 800,
              color: "#1a4d2e",
            }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "#f3f4f6",
              border: "none",
              borderRadius: 8,
              width: 28,
              height: 28,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={14} color="#6b7280" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function InfoBlock({ icon, label, children }) {
  return (
    <div
      style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 14px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 8,
          color: "#9ca3af",
        }}
      >
        {icon}
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function Badge({ children, style }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: style.color,
        background: style.bg,
        border: `1px solid ${style.border}`,
        padding: "3px 10px",
        borderRadius: 20,
        textTransform: "capitalize",
      }}
    >
      {children}
    </span>
  );
}

const labelStyle = {
  fontSize: 12,
  fontWeight: 700,
  color: "#374151",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};
