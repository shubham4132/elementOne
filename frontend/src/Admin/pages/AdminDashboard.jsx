// src/Admin/pages/AdminDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../component/AdminNavbar";
import AdminSidebar from "../component/AdminSidebar";

const STATS = [
  {
    label: "Total Revenue",
    value: "₹4,28,900",
    sub: "+12.5% this month",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    accent: "#0ea5e9",
    accentBg: "rgba(14,165,233,0.06)",
    accentBorder: "rgba(14,165,233,0.15)",
    glow: "rgba(14,165,233,0.08)",
  },
  {
    label: "Orders Today",
    value: "38",
    sub: "+4 since yesterday",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    accent: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.06)",
    accentBorder: "rgba(139,92,246,0.15)",
    glow: "rgba(139,92,246,0.08)",
  },
  {
    label: "Active Products",
    value: "124",
    sub: "+6 this week",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
    accent: "#10b981",
    accentBg: "rgba(16,185,129,0.06)",
    accentBorder: "rgba(16,185,129,0.15)",
    glow: "rgba(16,185,129,0.08)",
  },
  {
    label: "Pending Orders",
    value: "8",
    sub: "Needs attention",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,0.06)",
    accentBorder: "rgba(245,158,11,0.15)",
    glow: "rgba(245,158,11,0.08)",
  },
];

const ORDERS = [
  {
    id: "#2841",
    name: "Priya Sharma",
    product: "Ashwagandha Extract",
    amt: "₹499",
    status: "Delivered",
    av: "PS",
  },
  {
    id: "#2840",
    name: "Rahul Verma",
    product: "Slim 'n' Shine Kit",
    amt: "₹999",
    status: "Processing",
    av: "RV",
  },
  {
    id: "#2839",
    name: "Anita Goswami",
    product: "Carb Blocker 60 Cap",
    amt: "₹499",
    status: "Shipped",
    av: "AG",
  },
  {
    id: "#2838",
    name: "Deepak Joshi",
    product: "Apple Cider Vinegar",
    amt: "₹649",
    status: "Pending",
    av: "DJ",
  },
  {
    id: "#2837",
    name: "Kavita Singh",
    product: "Keto Slim Fast Kit",
    amt: "₹1199",
    status: "Delivered",
    av: "KS",
  },
];

const TOP_PRODUCTS = [
  {
    id: 1,
    name: "Ashwagandha Extract",
    cat: "Ayurvedic",
    sold: 342,
    rev: "₹1.7L",
    pct: 85,
    stock: 48,
  },
  {
    id: 2,
    name: "Slim 'n' Shine Kit",
    cat: "Weight Loss",
    sold: 218,
    rev: "₹2.1L",
    pct: 68,
    stock: 22,
  },
  {
    id: 3,
    name: "Carb Blocker",
    cat: "Nutrition",
    sold: 196,
    rev: "₹97K",
    pct: 55,
    stock: 61,
  },
  {
    id: 4,
    name: "Apple Cider Vinegar",
    cat: "Supplements",
    sold: 154,
    rev: "₹1.0L",
    pct: 42,
    stock: 34,
  },
];

const ALL_PRODUCTS = [
  {
    id: 101,
    name: "Ashwagandha Extract 60 Cap",
    cat: "Ayurvedic",
    price: "₹499",
    stock: 48,
    status: "Active",
  },
  {
    id: 102,
    name: "Slim 'n' Shine Kit",
    cat: "Weight Loss",
    price: "₹999",
    stock: 22,
    status: "Active",
  },
  {
    id: 103,
    name: "Carb Blocker 60 Cap",
    cat: "Nutrition",
    price: "₹499",
    stock: 61,
    status: "Active",
  },
  {
    id: 104,
    name: "Apple Cider Vinegar 500ml",
    cat: "Supplements",
    price: "₹649",
    stock: 34,
    status: "Active",
  },
  {
    id: 105,
    name: "Keto Slim Fast Kit",
    cat: "Weight Loss",
    price: "₹1199",
    stock: 5,
    status: "Low Stock",
  },
];

const CUSTOMERS = [
  {
    id: "C001",
    name: "Priya Sharma",
    email: "priya@mail.com",
    orders: 7,
    spent: "₹3,490",
    joined: "Jan 2024",
    av: "PS",
  },
  {
    id: "C002",
    name: "Rahul Verma",
    email: "rahul@mail.com",
    orders: 3,
    spent: "₹2,199",
    joined: "Feb 2024",
    av: "RV",
  },
  {
    id: "C003",
    name: "Anita Goswami",
    email: "anita@mail.com",
    orders: 5,
    spent: "₹4,100",
    joined: "Nov 2023",
    av: "AG",
  },
  {
    id: "C004",
    name: "Deepak Joshi",
    email: "deepak@mail.com",
    orders: 2,
    spent: "₹1,298",
    joined: "Mar 2024",
    av: "DJ",
  },
];

const STATUS_CONFIG = {
  Delivered: {
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
  },
  Processing: {
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
    border: "rgba(14,165,233,0.2)",
  },
  Shipped: {
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
  },
  Pending: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
  Active: {
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
  },
  "Low Stock": {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
};

const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
const BARS = [42, 58, 46, 76, 68, 84, 97];

// ── Design tokens ──────────────────────────────────────────
const T = {
  bg: "#f0f4f8",
  surface: "#ffffff",
  card: "#ffffff",
  sidebar: "#ffffff",
  border: "rgba(15,23,42,0.08)",
  text: "#0f172a",
  textMid: "#475569",
  textDim: "#94a3b8",
  primary: "#2563eb",
  primaryBg: "rgba(37,99,235,0.07)",
};

const Card = ({ children, style = {} }) => (
  <div
    style={{
      background: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: 16,
      boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
      ...style,
    }}
  >
    {children}
  </div>
);

const SectionHead = ({ title, subtitle, action }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      borderBottom: `1px solid ${T.border}`,
    }}
  >
    <div>
      <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: T.text }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ margin: "3px 0 0", fontSize: 11, color: T.textDim }}>
          {subtitle}
        </p>
      )}
    </div>
    {action}
  </div>
);

// Avatar colors pool
const AV_COLORS = [
  { bg: "rgba(37,99,235,0.1)", color: "#2563eb" },
  { bg: "rgba(139,92,246,0.1)", color: "#8b5cf6" },
  { bg: "rgba(16,185,129,0.1)", color: "#10b981" },
  { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  { bg: "rgba(239,68,68,0.1)", color: "#ef4444" },
];
const avColor = (i) => AV_COLORS[i % AV_COLORS.length];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  const handleDeleteProduct = (id) => {
    setProducts((p) => p.filter((x) => x.id !== id));
    setDeleteConfirm(null);
  };

  const TABS = [
    { key: "dashboard", label: "Dashboard" },
    { key: "products", label: "Products" },
    { key: "customers", label: "Customers" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: T.bg,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(15,23,42,0.12); border-radius: 10px; }
      `}</style>

      <AdminNavbar
        onMenuClick={() => setSidebarOpen((p) => !p)}
        sidebarOpen={sidebarOpen}
      />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            background: T.bg,
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {/* ── Header ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 700,
                    color: T.text,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Good morning, Admin 👋
                </h1>
                <p
                  style={{ margin: "4px 0 0", fontSize: 13, color: T.textDim }}
                >
                  Here's your store overview for today.
                </p>
              </div>

              {/* Tabs + CTA */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    display: "flex",
                    background: "rgba(15,23,42,0.05)",
                    borderRadius: 12,
                    padding: 3,
                  }}
                >
                  {TABS.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      style={{
                        padding: "7px 16px",
                        borderRadius: 9,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "none",
                        transition: "all 0.18s",
                        background:
                          activeTab === t.key ? T.surface : "transparent",
                        color: activeTab === t.key ? T.primary : T.textDim,
                        boxShadow:
                          activeTab === t.key
                            ? "0 1px 4px rgba(15,23,42,0.1)"
                            : "none",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                {activeTab === "dashboard" && (
                  <button
                    onClick={() => navigate("/admin/products/create")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "9px 16px",
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      background: T.primary,
                      color: "#fff",
                      border: "none",
                      boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add Product
                  </button>
                )}
              </div>
            </div>

            {/* ════════ DASHBOARD TAB ════════ */}
            {activeTab === "dashboard" && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {/* Stat Cards */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 16,
                  }}
                >
                  {STATS.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        background: T.card,
                        borderRadius: 16,
                        padding: "20px",
                        border: `1px solid ${T.border}`,
                        boxShadow: `0 1px 4px rgba(15,23,42,0.05), 0 0 0 1px ${s.accentBorder}`,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 16,
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 11,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            color: T.textDim,
                          }}
                        >
                          {s.label}
                        </p>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: s.accentBg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: s.accent,
                          }}
                        >
                          {s.icon}
                        </div>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 26,
                          fontWeight: 700,
                          color: T.text,
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {s.value}
                      </p>
                      <p
                        style={{
                          margin: "6px 0 0",
                          fontSize: 11,
                          color: s.accent,
                          fontWeight: 500,
                        }}
                      >
                        ↑ {s.sub}
                      </p>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 3,
                          background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
                          opacity: 0.35,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Chart + Top Products */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 2fr",
                    gap: 16,
                  }}
                >
                  {/* Bar Chart */}
                  <Card>
                    <SectionHead
                      title="Revenue Overview"
                      subtitle="Last 7 months"
                      action={
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "5px 10px",
                            borderRadius: 8,
                            background: "rgba(16,185,129,0.08)",
                            color: "#10b981",
                            border: "1px solid rgba(16,185,129,0.15)",
                          }}
                        >
                          ↑ 18.4% YoY
                        </span>
                      }
                    />
                    <div style={{ padding: "20px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: 8,
                          height: 160,
                        }}
                      >
                        {BARS.map((val, i) => {
                          const isLast = i === BARS.length - 1;
                          const isHov = hoveredBar === i;
                          return (
                            <div
                              key={i}
                              style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 8,
                              }}
                              onMouseEnter={() => setHoveredBar(i)}
                              onMouseLeave={() => setHoveredBar(null)}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  borderRadius: "6px 6px 0 0",
                                  height: `${(val / 100) * 100}%`,
                                  position: "relative",
                                  cursor: "default",
                                  transition: "all 0.2s",
                                  background: isLast
                                    ? "linear-gradient(180deg, #2563eb, #1d4ed8)"
                                    : isHov
                                      ? "rgba(37,99,235,0.15)"
                                      : "rgba(15,23,42,0.06)",
                                  border: isHov
                                    ? "1px solid rgba(37,99,235,0.2)"
                                    : "1px solid transparent",
                                }}
                              >
                                {isHov && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: -32,
                                      left: "50%",
                                      transform: "translateX(-50%)",
                                      whiteSpace: "nowrap",
                                      fontSize: 10,
                                      fontWeight: 600,
                                      padding: "4px 8px",
                                      borderRadius: 6,
                                      background: T.text,
                                      color: "#fff",
                                      zIndex: 10,
                                    }}
                                  >
                                    ₹{val * 4}K
                                  </div>
                                )}
                              </div>
                              <span
                                style={{
                                  fontSize: 9,
                                  fontWeight: 500,
                                  color: T.textDim,
                                }}
                              >
                                {MONTHS[i]}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Card>

                  {/* Top Products */}
                  <Card>
                    <SectionHead title="Top Products" subtitle="By revenue" />
                    <div
                      style={{
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                      }}
                    >
                      {TOP_PRODUCTS.map((p, i) => (
                        <div key={i}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: 8,
                            }}
                          >
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  color: T.text,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {p.name}
                              </p>
                              <p
                                style={{
                                  margin: "2px 0 0",
                                  fontSize: 10,
                                  color: T.textDim,
                                }}
                              >
                                {p.cat} · {p.sold} sold
                              </p>
                            </div>
                            <p
                              style={{
                                margin: "0 0 0 12px",
                                fontSize: 12,
                                fontWeight: 700,
                                color: T.primary,
                                flexShrink: 0,
                              }}
                            >
                              {p.rev}
                            </p>
                          </div>
                          <div
                            style={{
                              height: 6,
                              borderRadius: 999,
                              background: "rgba(15,23,42,0.06)",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                borderRadius: 999,
                                width: `${p.pct}%`,
                                background:
                                  "linear-gradient(90deg, #2563eb, #7c3aed)",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Recent Orders */}
                <Card>
                  <SectionHead
                    title="Recent Orders"
                    subtitle="Latest transactions"
                    action={
                      <button
                        onClick={() => navigate("/admin/orders")}
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: T.primary,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        View all →
                      </button>
                    }
                  />
                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        minWidth: 520,
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                          {[
                            "Order",
                            "Customer",
                            "Product",
                            "Amount",
                            "Status",
                          ].map((h) => (
                            <td
                              key={h}
                              style={{
                                padding: "10px 20px",
                                fontSize: 10,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                color: T.textDim,
                              }}
                            >
                              {h}
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ORDERS.map((o, i) => {
                          const sc = STATUS_CONFIG[o.status] || {};
                          const av = avColor(i);
                          return (
                            <tr
                              key={i}
                              style={{ borderTop: `1px solid ${T.border}` }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background =
                                  "rgba(37,99,235,0.02)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                  "transparent")
                              }
                            >
                              <td
                                style={{
                                  padding: "12px 20px",
                                  fontSize: 12,
                                  fontFamily: "monospace",
                                  color: T.textDim,
                                }}
                              >
                                {o.id}
                              </td>
                              <td style={{ padding: "12px 20px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 30,
                                      height: 30,
                                      borderRadius: 8,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: 10,
                                      fontWeight: 700,
                                      flexShrink: 0,
                                      background: av.bg,
                                      color: av.color,
                                    }}
                                  >
                                    {o.av}
                                  </div>
                                  <span
                                    style={{
                                      fontSize: 12,
                                      fontWeight: 500,
                                      color: T.text,
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {o.name}
                                  </span>
                                </div>
                              </td>
                              <td
                                style={{
                                  padding: "12px 20px",
                                  fontSize: 12,
                                  color: T.textMid,
                                  maxWidth: 150,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {o.product}
                              </td>
                              <td
                                style={{
                                  padding: "12px 20px",
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: T.text,
                                }}
                              >
                                {o.amt}
                              </td>
                              <td style={{ padding: "12px 20px" }}>
                                <span
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 600,
                                    padding: "4px 10px",
                                    borderRadius: 6,
                                    color: sc.color,
                                    background: sc.bg,
                                    border: `1px solid ${sc.border}`,
                                  }}
                                >
                                  {o.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Quick Actions */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 12,
                  }}
                >
                  {[
                    {
                      label: "Add Product",
                      to: "/admin/products/create",
                      color: "#2563eb",
                      icon: (
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                      ),
                      bg: "rgba(37,99,235,0.07)",
                    },
                    {
                      label: "All Products",
                      to: "/admin/products",
                      color: "#8b5cf6",
                      icon: (
                        <>
                          <rect x="3" y="3" width="7" height="7" rx="1" />
                          <rect x="14" y="3" width="7" height="7" rx="1" />
                          <rect x="3" y="14" width="7" height="7" rx="1" />
                          <rect x="14" y="14" width="7" height="7" rx="1" />
                        </>
                      ),
                      bg: "rgba(139,92,246,0.07)",
                    },
                    {
                      label: "View Orders",
                      to: "/admin/orders",
                      color: "#10b981",
                      icon: (
                        <>
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                        </>
                      ),
                      bg: "rgba(16,185,129,0.07)",
                    },
                    {
                      label: "Customers",
                      to: "/admin/customers",
                      color: "#f59e0b",
                      icon: (
                        <>
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </>
                      ),
                      bg: "rgba(245,158,11,0.07)",
                    },
                  ].map((a, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(a.to)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "14px 16px",
                        borderRadius: 12,
                        cursor: "pointer",
                        border: `1px solid ${T.border}`,
                        background: T.card,
                        textAlign: "left",
                        transition: "all 0.18s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = a.bg;
                        e.currentTarget.style.borderColor = a.color + "33";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = T.card;
                        e.currentTarget.style.borderColor = T.border;
                      }}
                    >
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 9,
                          background: a.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={a.color}
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          {a.icon}
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: T.textMid,
                        }}
                      >
                        {a.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ════════ PRODUCTS TAB ════════ */}
            {activeTab === "products" && (
              <Card>
                <SectionHead
                  title="All Products"
                  subtitle={`${products.length} products listed`}
                  action={
                    <button
                      onClick={() => navigate("/admin/products/create")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 14px",
                        borderRadius: 9,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        background: T.primary,
                        color: "#fff",
                        border: "none",
                        boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Add New
                    </button>
                  }
                />
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      minWidth: 600,
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                        {[
                          "Product",
                          "Category",
                          "Price",
                          "Stock",
                          "Status",
                          "Actions",
                        ].map((h) => (
                          <td
                            key={h}
                            style={{
                              padding: "10px 20px",
                              fontSize: 10,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              color: T.textDim,
                            }}
                          >
                            {h}
                          </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p, i) => {
                        const sc = STATUS_CONFIG[p.status] || {};
                        const av = avColor(i);
                        return (
                          <tr
                            key={p.id}
                            style={{ borderTop: `1px solid ${T.border}` }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(37,99,235,0.02)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <td style={{ padding: "12px 20px" }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: T.text,
                                }}
                              >
                                {p.name}
                              </p>
                              <p
                                style={{
                                  margin: "2px 0 0",
                                  fontSize: 10,
                                  color: T.textDim,
                                }}
                              >
                                ID: #{p.id}
                              </p>
                            </td>
                            <td
                              style={{
                                padding: "12px 20px",
                                fontSize: 12,
                                color: T.textMid,
                              }}
                            >
                              {p.cat}
                            </td>
                            <td
                              style={{
                                padding: "12px 20px",
                                fontSize: 13,
                                fontWeight: 600,
                                color: T.text,
                              }}
                            >
                              {p.price}
                            </td>
                            <td style={{ padding: "12px 20px" }}>
                              <span
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  color: p.stock < 10 ? "#f59e0b" : T.textMid,
                                }}
                              >
                                {p.stock < 10 && "⚠ "}
                                {p.stock} units
                              </span>
                            </td>
                            <td style={{ padding: "12px 20px" }}>
                              <span
                                style={{
                                  fontSize: 10,
                                  fontWeight: 600,
                                  padding: "4px 10px",
                                  borderRadius: 6,
                                  color: sc.color,
                                  background: sc.bg,
                                  border: `1px solid ${sc.border}`,
                                }}
                              >
                                {p.status}
                              </span>
                            </td>
                            <td style={{ padding: "12px 20px" }}>
                              <div style={{ display: "flex", gap: 8 }}>
                                <button
                                  onClick={() =>
                                    navigate(`/admin/products/edit/${p.id}`)
                                  }
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                    padding: "6px 12px",
                                    borderRadius: 8,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    background: "rgba(37,99,235,0.07)",
                                    border: "1px solid rgba(37,99,235,0.18)",
                                    color: "#2563eb",
                                    transition: "all 0.15s",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                      "rgba(37,99,235,0.14)")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                      "rgba(37,99,235,0.07)")
                                  }
                                >
                                  <svg
                                    width="11"
                                    height="11"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  >
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                  Edit
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(p.id)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                    padding: "6px 12px",
                                    borderRadius: 8,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    background: "rgba(239,68,68,0.07)",
                                    border: "1px solid rgba(239,68,68,0.18)",
                                    color: "#ef4444",
                                    transition: "all 0.15s",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                      "rgba(239,68,68,0.14)")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                      "rgba(239,68,68,0.07)")
                                  }
                                >
                                  <svg
                                    width="11"
                                    height="11"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                    <path d="M10 11v6M14 11v6" />
                                    <path d="M9 6V4h6v2" />
                                  </svg>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {products.length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "48px 20px",
                        color: T.textDim,
                      }}
                    >
                      <p style={{ fontSize: 14 }}>No products found.</p>
                      <button
                        onClick={() => navigate("/admin/products/create")}
                        style={{
                          marginTop: 10,
                          fontSize: 12,
                          color: T.primary,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Add your first product
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* ════════ CUSTOMERS TAB ════════ */}
            {activeTab === "customers" && (
              <Card>
                <SectionHead
                  title="All Customers"
                  subtitle={`${CUSTOMERS.length} registered users`}
                />
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      minWidth: 600,
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                        {[
                          "Customer",
                          "Email",
                          "Orders",
                          "Total Spent",
                          "Joined",
                          "Actions",
                        ].map((h) => (
                          <td
                            key={h}
                            style={{
                              padding: "10px 20px",
                              fontSize: 10,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              color: T.textDim,
                            }}
                          >
                            {h}
                          </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CUSTOMERS.map((c, i) => {
                        const av = avColor(i);
                        return (
                          <tr
                            key={i}
                            style={{ borderTop: `1px solid ${T.border}` }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(37,99,235,0.02)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <td style={{ padding: "12px 20px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                }}
                              >
                                <div
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 8,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    flexShrink: 0,
                                    background: av.bg,
                                    color: av.color,
                                  }}
                                >
                                  {c.av}
                                </div>
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 500,
                                    color: T.text,
                                  }}
                                >
                                  {c.name}
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                padding: "12px 20px",
                                fontSize: 12,
                                color: T.textMid,
                              }}
                            >
                              {c.email}
                            </td>
                            <td
                              style={{
                                padding: "12px 20px",
                                fontSize: 13,
                                fontWeight: 600,
                                color: T.primary,
                              }}
                            >
                              {c.orders}
                            </td>
                            <td
                              style={{
                                padding: "12px 20px",
                                fontSize: 13,
                                fontWeight: 600,
                                color: T.text,
                              }}
                            >
                              {c.spent}
                            </td>
                            <td
                              style={{
                                padding: "12px 20px",
                                fontSize: 12,
                                color: T.textDim,
                              }}
                            >
                              {c.joined}
                            </td>
                            <td style={{ padding: "12px 20px" }}>
                              <div style={{ display: "flex", gap: 8 }}>
                                <button
                                  onClick={() =>
                                    navigate(`/admin/customers/${c.id}`)
                                  }
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                    padding: "6px 12px",
                                    borderRadius: 8,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    background: "rgba(37,99,235,0.07)",
                                    border: "1px solid rgba(37,99,235,0.18)",
                                    color: "#2563eb",
                                    transition: "all 0.15s",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                      "rgba(37,99,235,0.14)")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                      "rgba(37,99,235,0.07)")
                                  }
                                >
                                  <svg
                                    width="11"
                                    height="11"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                  View
                                </button>
                                <button
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                    padding: "6px 12px",
                                    borderRadius: 8,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    background: "rgba(239,68,68,0.07)",
                                    border: "1px solid rgba(239,68,68,0.18)",
                                    color: "#ef4444",
                                    transition: "all 0.15s",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                      "rgba(239,68,68,0.14)")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                      "rgba(239,68,68,0.07)")
                                  }
                                >
                                  <svg
                                    width="11"
                                    height="11"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                    <path d="M10 11v6M14 11v6" />
                                  </svg>
                                  Remove
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* ── Delete Modal ── */}
      {deleteConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            background: "rgba(15,23,42,0.4)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 380,
              borderRadius: 20,
              padding: 28,
              textAlign: "center",
              background: T.surface,
              border: `1px solid ${T.border}`,
              boxShadow: "0 24px 60px rgba(15,23,42,0.2)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.18)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              </svg>
            </div>
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: 16,
                fontWeight: 700,
                color: T.text,
              }}
            >
              Delete Product?
            </h3>
            <p
              style={{
                margin: "0 0 24px",
                fontSize: 13,
                color: T.textMid,
                lineHeight: 1.5,
              }}
            >
              This action cannot be undone. The product will be permanently
              removed.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: "rgba(15,23,42,0.04)",
                  border: `1px solid ${T.border}`,
                  color: T.textMid,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(15,23,42,0.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(15,23,42,0.04)")
                }
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirm)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: "#ef4444",
                  border: "none",
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(239,68,68,0.3)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#dc2626")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#ef4444")
                }
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} // // src/Admin/pages/AdminDashboard.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../component/AdminNavbar";
// import AdminSidebar from "../component/AdminSidebar";

// const STATS = [
//   {
//     label: "Total Revenue",
//     value: "₹4,28,900",
//     sub: "+12.5% this month",
//     icon: (
//       <svg
//         width="22"
//         height="22"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <line x1="12" y1="1" x2="12" y2="23" />
//         <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
//       </svg>
//     ),
//     accent: "#7aad5c",
//     accentBg: "rgba(122,173,92,0.08)",
//     accentBorder: "rgba(122,173,92,0.18)",
//     glow: "rgba(122,173,92,0.12)",
//   },
//   {
//     label: "Orders Today",
//     value: "38",
//     sub: "+4 since yesterday",
//     icon: (
//       <svg
//         width="22"
//         height="22"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
//         <line x1="3" y1="6" x2="21" y2="6" />
//         <path d="M16 10a4 4 0 01-8 0" />
//       </svg>
//     ),
//     accent: "#5b9bd4",
//     accentBg: "rgba(91,155,212,0.08)",
//     accentBorder: "rgba(91,155,212,0.18)",
//     glow: "rgba(91,155,212,0.1)",
//   },
//   {
//     label: "Active Products",
//     value: "124",
//     sub: "+6 this week",
//     icon: (
//       <svg
//         width="22"
//         height="22"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
//       </svg>
//     ),
//     accent: "#b07fd4",
//     accentBg: "rgba(176,127,212,0.08)",
//     accentBorder: "rgba(176,127,212,0.18)",
//     glow: "rgba(176,127,212,0.1)",
//   },
//   {
//     label: "Pending Orders",
//     value: "8",
//     sub: "Needs attention",
//     icon: (
//       <svg
//         width="22"
//         height="22"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <circle cx="12" cy="12" r="10" />
//         <line x1="12" y1="8" x2="12" y2="12" />
//         <line x1="12" y1="16" x2="12.01" y2="16" />
//       </svg>
//     ),
//     accent: "#e8a24a",
//     accentBg: "rgba(232,162,74,0.08)",
//     accentBorder: "rgba(232,162,74,0.18)",
//     glow: "rgba(232,162,74,0.1)",
//   },
// ];

// const ORDERS = [
//   {
//     id: "#2841",
//     name: "Priya Sharma",
//     product: "Ashwagandha Extract",
//     amt: "₹499",
//     status: "Delivered",
//     av: "PS",
//   },
//   {
//     id: "#2840",
//     name: "Rahul Verma",
//     product: "Slim 'n' Shine Kit",
//     amt: "₹999",
//     status: "Processing",
//     av: "RV",
//   },
//   {
//     id: "#2839",
//     name: "Anita Goswami",
//     product: "Carb Blocker 60 Cap",
//     amt: "₹499",
//     status: "Shipped",
//     av: "AG",
//   },
//   {
//     id: "#2838",
//     name: "Deepak Joshi",
//     product: "Apple Cider Vinegar",
//     amt: "₹649",
//     status: "Pending",
//     av: "DJ",
//   },
//   {
//     id: "#2837",
//     name: "Kavita Singh",
//     product: "Keto Slim Fast Kit",
//     amt: "₹1199",
//     status: "Delivered",
//     av: "KS",
//   },
// ];

// const TOP_PRODUCTS = [
//   {
//     id: 1,
//     name: "Ashwagandha Extract",
//     cat: "Ayurvedic",
//     sold: 342,
//     rev: "₹1.7L",
//     pct: 85,
//     stock: 48,
//   },
//   {
//     id: 2,
//     name: "Slim 'n' Shine Kit",
//     cat: "Weight Loss",
//     sold: 218,
//     rev: "₹2.1L",
//     pct: 68,
//     stock: 22,
//   },
//   {
//     id: 3,
//     name: "Carb Blocker",
//     cat: "Nutrition",
//     sold: 196,
//     rev: "₹97K",
//     pct: 55,
//     stock: 61,
//   },
//   {
//     id: 4,
//     name: "Apple Cider Vinegar",
//     cat: "Supplements",
//     sold: 154,
//     rev: "₹1.0L",
//     pct: 42,
//     stock: 34,
//   },
// ];

// const ALL_PRODUCTS = [
//   {
//     id: 101,
//     name: "Ashwagandha Extract 60 Cap",
//     cat: "Ayurvedic",
//     price: "₹499",
//     stock: 48,
//     status: "Active",
//   },
//   {
//     id: 102,
//     name: "Slim 'n' Shine Kit",
//     cat: "Weight Loss",
//     price: "₹999",
//     stock: 22,
//     status: "Active",
//   },
//   {
//     id: 103,
//     name: "Carb Blocker 60 Cap",
//     cat: "Nutrition",
//     price: "₹499",
//     stock: 61,
//     status: "Active",
//   },
//   {
//     id: 104,
//     name: "Apple Cider Vinegar 500ml",
//     cat: "Supplements",
//     price: "₹649",
//     stock: 34,
//     status: "Active",
//   },
//   {
//     id: 105,
//     name: "Keto Slim Fast Kit",
//     cat: "Weight Loss",
//     price: "₹1199",
//     stock: 5,
//     status: "Low Stock",
//   },
// ];

// const STATUS_CONFIG = {
//   Delivered: {
//     color: "#7aad5c",
//     bg: "rgba(122,173,92,0.1)",
//     border: "rgba(122,173,92,0.2)",
//   },
//   Processing: {
//     color: "#5b9bd4",
//     bg: "rgba(91,155,212,0.1)",
//     border: "rgba(91,155,212,0.2)",
//   },
//   Shipped: {
//     color: "#b07fd4",
//     bg: "rgba(176,127,212,0.1)",
//     border: "rgba(176,127,212,0.2)",
//   },
//   Pending: {
//     color: "#e8a24a",
//     bg: "rgba(232,162,74,0.1)",
//     border: "rgba(232,162,74,0.2)",
//   },
//   Active: {
//     color: "#7aad5c",
//     bg: "rgba(122,173,92,0.1)",
//     border: "rgba(122,173,92,0.2)",
//   },
//   "Low Stock": {
//     color: "#e8a24a",
//     bg: "rgba(232,162,74,0.1)",
//     border: "rgba(232,162,74,0.2)",
//   },
// };

// const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
// const BARS = [42, 58, 46, 76, 68, 84, 97];

// const CUSTOMERS = [
//   {
//     id: "C001",
//     name: "Priya Sharma",
//     email: "priya@mail.com",
//     orders: 7,
//     spent: "₹3,490",
//     joined: "Jan 2024",
//     av: "PS",
//   },
//   {
//     id: "C002",
//     name: "Rahul Verma",
//     email: "rahul@mail.com",
//     orders: 3,
//     spent: "₹2,199",
//     joined: "Feb 2024",
//     av: "RV",
//   },
//   {
//     id: "C003",
//     name: "Anita Goswami",
//     email: "anita@mail.com",
//     orders: 5,
//     spent: "₹4,100",
//     joined: "Nov 2023",
//     av: "AG",
//   },
//   {
//     id: "C004",
//     name: "Deepak Joshi",
//     email: "deepak@mail.com",
//     orders: 2,
//     spent: "₹1,298",
//     joined: "Mar 2024",
//     av: "DJ",
//   },
// ];

// // ─── Reusable Card Wrapper ────────────────────────────────
// const Card = ({ children, className = "", style = {} }) => (
//   <div
//     className={className}
//     style={{
//       background: "rgba(255,255,255,0.025)",
//       border: "1px solid rgba(167,197,139,0.1)",
//       borderRadius: "16px",
//       ...style,
//     }}
//   >
//     {children}
//   </div>
// );

// // ─── Section Header ───────────────────────────────────────
// const SectionHead = ({ title, subtitle, action }) => (
//   <div
//     className="flex items-center justify-between px-5 py-4"
//     style={{ borderBottom: "1px solid rgba(167,197,139,0.07)" }}
//   >
//     <div>
//       <h2 className="font-semibold text-sm" style={{ color: "#dcecd0" }}>
//         {title}
//       </h2>
//       {subtitle && (
//         <p
//           className="text-[11px] mt-0.5"
//           style={{ color: "rgba(167,197,139,0.35)" }}
//         >
//           {subtitle}
//         </p>
//       )}
//     </div>
//     {action}
//   </div>
// );

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
//   const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | products | customers
//   const [products, setProducts] = useState(ALL_PRODUCTS);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);
//   const [hoveredBar, setHoveredBar] = useState(null);

//   const handleDeleteProduct = (id) => {
//     setProducts((prev) => prev.filter((p) => p.id !== id));
//     setDeleteConfirm(null);
//   };

//   const bgPage = "#0a160d";
//   const bgMain = "#0c1a0f";
//   const green = "#7aad5c";
//   const greenDim = "rgba(122,173,92,0.45)";

//   return (
//     <div
//       className="flex flex-col h-screen overflow-hidden"
//       style={{
//         background: bgPage,
//         fontFamily: "'DM Sans', system-ui, sans-serif",
//       }}
//     >
//       {/* Google font */}
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

//       <AdminNavbar
//         onMenuClick={() => setSidebarOpen((p) => !p)}
//         sidebarOpen={sidebarOpen}
//       />

//       <div className="flex flex-1 overflow-hidden">
//         <AdminSidebar
//           isOpen={sidebarOpen}
//           onClose={() => setSidebarOpen(false)}
//         />

//         <main
//           className="flex-1 overflow-y-auto min-w-0 p-5 sm:p-6"
//           style={{ background: bgMain }}
//         >
//           <div className="space-y-6 max-w-screen-xl mx-auto">
//             {/* ── Tab Switcher ─────────────────────────────── */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <div>
//                 <h1
//                   className="text-xl sm:text-2xl font-bold"
//                   style={{ color: "#dcecd0", letterSpacing: "-0.02em" }}
//                 >
//                   Good morning, Admin 🌿
//                 </h1>
//                 <p
//                   className="text-sm mt-0.5"
//                   style={{ color: "rgba(167,197,139,0.4)" }}
//                 >
//                   Here's your ayurvedic store overview for today.
//                 </p>
//               </div>
//               <div className="flex items-center gap-2">
//                 {/* Tabs */}
//                 {[
//                   { key: "dashboard", label: "Dashboard" },
//                   { key: "products", label: "Products" },
//                   { key: "customers", label: "Customers" },
//                 ].map((t) => (
//                   <button
//                     key={t.key}
//                     onClick={() => setActiveTab(t.key)}
//                     className="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
//                     style={{
//                       background:
//                         activeTab === t.key
//                           ? "rgba(122,173,92,0.15)"
//                           : "rgba(255,255,255,0.03)",
//                       border: `1px solid ${activeTab === t.key ? "rgba(122,173,92,0.3)" : "rgba(167,197,139,0.1)"}`,
//                       color:
//                         activeTab === t.key ? green : "rgba(167,197,139,0.45)",
//                     }}
//                   >
//                     {t.label}
//                   </button>
//                 ))}
//                 {activeTab === "dashboard" && (
//                   <button
//                     onClick={() => navigate("/admin/products/create")}
//                     className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
//                     style={{
//                       background: "linear-gradient(135deg, #3d6b2c, #5a8f40)",
//                       color: "#d4eebc",
//                       boxShadow: "0 4px 14px rgba(61,107,44,0.35)",
//                       border: "1px solid rgba(122,173,92,0.3)",
//                     }}
//                   >
//                     <svg
//                       width="12"
//                       height="12"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2.5"
//                       strokeLinecap="round"
//                     >
//                       <path d="M12 5v14M5 12h14" />
//                     </svg>
//                     Add Product
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* ════════════════════════════════════════════════
//                 DASHBOARD TAB
//             ════════════════════════════════════════════════ */}
//             {activeTab === "dashboard" && (
//               <>
//                 {/* Stat Cards */}
//                 <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
//                   {STATS.map((s, i) => (
//                     <div
//                       key={i}
//                       className="relative overflow-hidden rounded-2xl p-4 sm:p-5 transition-all"
//                       style={{
//                         background: s.accentBg,
//                         border: `1px solid ${s.accentBorder}`,
//                         boxShadow: `0 0 24px ${s.glow}`,
//                       }}
//                     >
//                       <div className="flex items-center justify-between mb-4">
//                         <p
//                           className="text-[10px] font-semibold uppercase tracking-widest"
//                           style={{ color: "rgba(181,201,154,0.4)" }}
//                         >
//                           {s.label}
//                         </p>
//                         <span style={{ color: s.accent, opacity: 0.6 }}>
//                           {s.icon}
//                         </span>
//                       </div>
//                       <p
//                         className="text-2xl font-bold"
//                         style={{ color: s.accent, letterSpacing: "-0.02em" }}
//                       >
//                         {s.value}
//                       </p>
//                       <p
//                         className="text-xs mt-1.5 font-medium"
//                         style={{ color: "rgba(181,201,154,0.35)" }}
//                       >
//                         ↑ {s.sub}
//                       </p>
//                       {/* Bottom accent line */}
//                       <div
//                         className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl"
//                         style={{
//                           background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
//                           opacity: 0.4,
//                         }}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 {/* Chart + Top Products */}
//                 <div className="grid lg:grid-cols-5 gap-4">
//                   {/* Bar Chart */}
//                   <Card className="lg:col-span-3">
//                     <SectionHead
//                       title="Revenue Overview"
//                       subtitle="Last 7 months"
//                       action={
//                         <span
//                           className="text-[10px] font-semibold px-3 py-1.5 rounded-lg"
//                           style={{
//                             color: green,
//                             background: "rgba(122,173,92,0.1)",
//                             border: "1px solid rgba(122,173,92,0.18)",
//                           }}
//                         >
//                           ↑ 18.4% YoY
//                         </span>
//                       }
//                     />
//                     <div className="p-5">
//                       <div className="flex items-end gap-2 sm:gap-2.5 h-40">
//                         {BARS.map((val, i) => {
//                           const isLast = i === BARS.length - 1;
//                           const isHov = hoveredBar === i;
//                           return (
//                             <div
//                               key={i}
//                               className="flex-1 flex flex-col items-center gap-2"
//                               onMouseEnter={() => setHoveredBar(i)}
//                               onMouseLeave={() => setHoveredBar(null)}
//                             >
//                               <div
//                                 className="w-full rounded-t-lg relative cursor-default transition-all"
//                                 style={{
//                                   height: `${(val / 100) * 100}%`,
//                                   background: isLast
//                                     ? "linear-gradient(180deg, #7aad5c, #3d6b2c)"
//                                     : isHov
//                                       ? "rgba(122,173,92,0.2)"
//                                       : "rgba(255,255,255,0.05)",
//                                   border: isHov
//                                     ? "1px solid rgba(122,173,92,0.2)"
//                                     : "1px solid transparent",
//                                 }}
//                               >
//                                 {isHov && (
//                                   <div
//                                     className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold px-2 py-1 rounded-md z-10"
//                                     style={{
//                                       background: "#122018",
//                                       color: "#a8d08a",
//                                       border: "1px solid rgba(122,173,92,0.2)",
//                                     }}
//                                   >
//                                     ₹{val * 4}K
//                                   </div>
//                                 )}
//                               </div>
//                               <span
//                                 className="text-[9px] font-medium"
//                                 style={{ color: "rgba(167,197,139,0.3)" }}
//                               >
//                                 {MONTHS[i]}
//                               </span>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </Card>

//                   {/* Top Products */}
//                   <Card className="lg:col-span-2">
//                     <SectionHead title="Top Products" subtitle="By revenue" />
//                     <div className="p-5 space-y-4">
//                       {TOP_PRODUCTS.map((p, i) => (
//                         <div key={i}>
//                           <div className="flex items-center justify-between mb-2">
//                             <div className="min-w-0 flex-1">
//                               <p
//                                 className="text-xs font-semibold truncate"
//                                 style={{ color: "rgba(212,236,208,0.8)" }}
//                               >
//                                 {p.name}
//                               </p>
//                               <p
//                                 className="text-[10px] mt-0.5"
//                                 style={{ color: "rgba(167,197,139,0.3)" }}
//                               >
//                                 {p.cat} · {p.sold} sold
//                               </p>
//                             </div>
//                             <p
//                               className="text-xs font-bold ml-3 flex-shrink-0"
//                               style={{ color: green }}
//                             >
//                               {p.rev}
//                             </p>
//                           </div>
//                           <div
//                             className="h-1.5 rounded-full overflow-hidden"
//                             style={{ background: "rgba(255,255,255,0.04)" }}
//                           >
//                             <div
//                               className="h-full rounded-full transition-all"
//                               style={{
//                                 width: `${p.pct}%`,
//                                 background: `linear-gradient(90deg, #3d6b2c, #7aad5c)`,
//                               }}
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </Card>
//                 </div>

//                 {/* Recent Orders */}
//                 <Card>
//                   <SectionHead
//                     title="Recent Orders"
//                     subtitle="Latest transactions"
//                     action={
//                       <button
//                         onClick={() => navigate("/admin/orders")}
//                         className="text-[11px] font-semibold transition-all"
//                         style={{ color: greenDim }}
//                         onMouseEnter={(e) =>
//                           (e.currentTarget.style.color = green)
//                         }
//                         onMouseLeave={(e) =>
//                           (e.currentTarget.style.color = greenDim)
//                         }
//                       >
//                         View all →
//                       </button>
//                     }
//                   />
//                   <div className="overflow-x-auto">
//                     <table className="w-full min-w-[520px]">
//                       <thead>
//                         <tr
//                           style={{
//                             borderBottom: "1px solid rgba(167,197,139,0.07)",
//                           }}
//                         >
//                           {[
//                             "Order",
//                             "Customer",
//                             "Product",
//                             "Amount",
//                             "Status",
//                           ].map((h) => (
//                             <td
//                               key={h}
//                               className="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest"
//                               style={{ color: "rgba(167,197,139,0.25)" }}
//                             >
//                               {h}
//                             </td>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {ORDERS.map((o, i) => {
//                           const sc = STATUS_CONFIG[o.status] || {};
//                           return (
//                             <tr
//                               key={i}
//                               className="transition-colors"
//                               style={{
//                                 borderTop: "1px solid rgba(167,197,139,0.05)",
//                               }}
//                               onMouseEnter={(e) =>
//                                 (e.currentTarget.style.background =
//                                   "rgba(122,173,92,0.03)")
//                               }
//                               onMouseLeave={(e) =>
//                                 (e.currentTarget.style.background =
//                                   "transparent")
//                               }
//                             >
//                               <td
//                                 className="px-5 py-3.5 text-xs font-mono"
//                                 style={{ color: "rgba(167,197,139,0.35)" }}
//                               >
//                                 {o.id}
//                               </td>
//                               <td className="px-5 py-3.5">
//                                 <div className="flex items-center gap-2.5">
//                                   <div
//                                     className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
//                                     style={{
//                                       background: "rgba(122,173,92,0.1)",
//                                       border: "1px solid rgba(122,173,92,0.15)",
//                                       color: greenDim,
//                                     }}
//                                   >
//                                     {o.av}
//                                   </div>
//                                   <span
//                                     className="text-xs font-medium whitespace-nowrap"
//                                     style={{ color: "rgba(212,236,208,0.65)" }}
//                                   >
//                                     {o.name}
//                                   </span>
//                                 </div>
//                               </td>
//                               <td
//                                 className="px-5 py-3.5 text-xs"
//                                 style={{ color: "rgba(167,197,139,0.35)" }}
//                               >
//                                 <span className="block truncate max-w-[150px]">
//                                   {o.product}
//                                 </span>
//                               </td>
//                               <td
//                                 className="px-5 py-3.5 text-sm font-semibold"
//                                 style={{ color: "#dcecd0" }}
//                               >
//                                 {o.amt}
//                               </td>
//                               <td className="px-5 py-3.5">
//                                 <span
//                                   className="text-[10px] font-semibold px-2.5 py-1 rounded-lg"
//                                   style={{
//                                     color: sc.color,
//                                     background: sc.bg,
//                                     border: `1px solid ${sc.border}`,
//                                   }}
//                                 >
//                                   {o.status}
//                                 </span>
//                               </td>
//                             </tr>
//                           );
//                         })}
//                       </tbody>
//                     </table>
//                   </div>
//                 </Card>

//                 {/* Quick Actions */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-2">
//                   {[
//                     {
//                       label: "Add Product",
//                       to: "/admin/products/create",
//                       icon: (
//                         <svg
//                           width="16"
//                           height="16"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                         >
//                           <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
//                           <path d="M12 5v14M5 12h14" />
//                         </svg>
//                       ),
//                     },
//                     {
//                       label: "All Products",
//                       to: "/admin/products",
//                       icon: (
//                         <svg
//                           width="16"
//                           height="16"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                         >
//                           <rect x="3" y="3" width="7" height="7" rx="1" />
//                           <rect x="14" y="3" width="7" height="7" rx="1" />
//                           <rect x="3" y="14" width="7" height="7" rx="1" />
//                           <rect x="14" y="14" width="7" height="7" rx="1" />
//                         </svg>
//                       ),
//                     },
//                     {
//                       label: "View Orders",
//                       to: "/admin/orders",
//                       icon: (
//                         <svg
//                           width="16"
//                           height="16"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                         >
//                           <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
//                           <line x1="3" y1="6" x2="21" y2="6" />
//                         </svg>
//                       ),
//                     },
//                     {
//                       label: "Customers",
//                       to: "/admin/customers",
//                       icon: (
//                         <svg
//                           width="16"
//                           height="16"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                         >
//                           <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//                           <circle cx="9" cy="7" r="4" />
//                         </svg>
//                       ),
//                     },
//                   ].map((a, i) => (
//                     <button
//                       key={i}
//                       onClick={() => navigate(a.to)}
//                       className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-left group"
//                       style={{
//                         background: "rgba(255,255,255,0.025)",
//                         border: "1px solid rgba(167,197,139,0.1)",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background =
//                           "rgba(122,173,92,0.06)";
//                         e.currentTarget.style.borderColor =
//                           "rgba(122,173,92,0.2)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background =
//                           "rgba(255,255,255,0.025)";
//                         e.currentTarget.style.borderColor =
//                           "rgba(167,197,139,0.1)";
//                       }}
//                     >
//                       <span style={{ color: greenDim }}>{a.icon}</span>
//                       <span
//                         className="text-sm font-medium"
//                         style={{ color: "rgba(181,201,154,0.45)" }}
//                       >
//                         {a.label}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* ════════════════════════════════════════════════
//                 PRODUCTS TAB — with Edit & Delete
//             ════════════════════════════════════════════════ */}
//             {activeTab === "products" && (
//               <Card>
//                 <SectionHead
//                   title="All Products"
//                   subtitle={`${products.length} products listed`}
//                   action={
//                     <button
//                       onClick={() => navigate("/admin/products/create")}
//                       className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold"
//                       style={{
//                         background: "rgba(122,173,92,0.12)",
//                         border: "1px solid rgba(122,173,92,0.22)",
//                         color: green,
//                       }}
//                     >
//                       <svg
//                         width="11"
//                         height="11"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2.5"
//                         strokeLinecap="round"
//                       >
//                         <path d="M12 5v14M5 12h14" />
//                       </svg>
//                       Add New
//                     </button>
//                   }
//                 />
//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[600px]">
//                     <thead>
//                       <tr
//                         style={{
//                           borderBottom: "1px solid rgba(167,197,139,0.07)",
//                         }}
//                       >
//                         {[
//                           "Product",
//                           "Category",
//                           "Price",
//                           "Stock",
//                           "Status",
//                           "Actions",
//                         ].map((h) => (
//                           <td
//                             key={h}
//                             className="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest"
//                             style={{ color: "rgba(167,197,139,0.25)" }}
//                           >
//                             {h}
//                           </td>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {products.map((p) => {
//                         const sc = STATUS_CONFIG[p.status] || {};
//                         return (
//                           <tr
//                             key={p.id}
//                             style={{
//                               borderTop: "1px solid rgba(167,197,139,0.05)",
//                             }}
//                             onMouseEnter={(e) =>
//                               (e.currentTarget.style.background =
//                                 "rgba(122,173,92,0.03)")
//                             }
//                             onMouseLeave={(e) =>
//                               (e.currentTarget.style.background = "transparent")
//                             }
//                           >
//                             <td className="px-5 py-3.5">
//                               <p
//                                 className="text-xs font-semibold"
//                                 style={{ color: "rgba(212,236,208,0.85)" }}
//                               >
//                                 {p.name}
//                               </p>
//                               <p
//                                 className="text-[10px] mt-0.5"
//                                 style={{ color: "rgba(167,197,139,0.3)" }}
//                               >
//                                 ID: #{p.id}
//                               </p>
//                             </td>
//                             <td
//                               className="px-5 py-3.5 text-xs"
//                               style={{ color: "rgba(167,197,139,0.45)" }}
//                             >
//                               {p.cat}
//                             </td>
//                             <td
//                               className="px-5 py-3.5 text-sm font-semibold"
//                               style={{ color: "#dcecd0" }}
//                             >
//                               {p.price}
//                             </td>
//                             <td className="px-5 py-3.5">
//                               <span
//                                 className="text-xs font-medium"
//                                 style={{
//                                   color:
//                                     p.stock < 10
//                                       ? "#e8a24a"
//                                       : "rgba(167,197,139,0.55)",
//                                 }}
//                               >
//                                 {p.stock < 10 && "⚠ "}
//                                 {p.stock} units
//                               </span>
//                             </td>
//                             <td className="px-5 py-3.5">
//                               <span
//                                 className="text-[10px] font-semibold px-2.5 py-1 rounded-lg"
//                                 style={{
//                                   color: sc.color,
//                                   background: sc.bg,
//                                   border: `1px solid ${sc.border}`,
//                                 }}
//                               >
//                                 {p.status}
//                               </span>
//                             </td>
//                             <td className="px-5 py-3.5">
//                               <div className="flex items-center gap-2">
//                                 {/* Edit */}
//                                 <button
//                                   onClick={() =>
//                                     navigate(`/admin/products/edit/${p.id}`)
//                                   }
//                                   className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
//                                   style={{
//                                     background: "rgba(91,155,212,0.08)",
//                                     border: "1px solid rgba(91,155,212,0.18)",
//                                     color: "#5b9bd4",
//                                   }}
//                                   onMouseEnter={(e) =>
//                                     (e.currentTarget.style.background =
//                                       "rgba(91,155,212,0.15)")
//                                   }
//                                   onMouseLeave={(e) =>
//                                     (e.currentTarget.style.background =
//                                       "rgba(91,155,212,0.08)")
//                                   }
//                                 >
//                                   <svg
//                                     width="11"
//                                     height="11"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                   >
//                                     <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
//                                     <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
//                                   </svg>
//                                   Edit
//                                 </button>
//                                 {/* Delete */}
//                                 <button
//                                   onClick={() => setDeleteConfirm(p.id)}
//                                   className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
//                                   style={{
//                                     background: "rgba(220,80,60,0.07)",
//                                     border: "1px solid rgba(220,80,60,0.18)",
//                                     color: "rgba(220,100,80,0.75)",
//                                   }}
//                                   onMouseEnter={(e) => {
//                                     e.currentTarget.style.background =
//                                       "rgba(220,80,60,0.14)";
//                                     e.currentTarget.style.color =
//                                       "rgba(220,100,80,1)";
//                                   }}
//                                   onMouseLeave={(e) => {
//                                     e.currentTarget.style.background =
//                                       "rgba(220,80,60,0.07)";
//                                     e.currentTarget.style.color =
//                                       "rgba(220,100,80,0.75)";
//                                   }}
//                                 >
//                                   <svg
//                                     width="11"
//                                     height="11"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                   >
//                                     <polyline points="3 6 5 6 21 6" />
//                                     <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
//                                     <path d="M10 11v6M14 11v6" />
//                                     <path d="M9 6V4h6v2" />
//                                   </svg>
//                                   Delete
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                   {products.length === 0 && (
//                     <div
//                       className="text-center py-16"
//                       style={{ color: "rgba(167,197,139,0.3)" }}
//                     >
//                       <p className="text-sm">No products found.</p>
//                       <button
//                         onClick={() => navigate("/admin/products/create")}
//                         className="mt-3 text-xs underline"
//                         style={{ color: green }}
//                       >
//                         Add your first product
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </Card>
//             )}

//             {/* ════════════════════════════════════════════════
//                 CUSTOMERS TAB — with Edit & Delete
//             ════════════════════════════════════════════════ */}
//             {activeTab === "customers" && (
//               <Card>
//                 <SectionHead
//                   title="All Customers"
//                   subtitle={`${CUSTOMERS.length} registered users`}
//                 />
//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[600px]">
//                     <thead>
//                       <tr
//                         style={{
//                           borderBottom: "1px solid rgba(167,197,139,0.07)",
//                         }}
//                       >
//                         {[
//                           "Customer",
//                           "Email",
//                           "Orders",
//                           "Total Spent",
//                           "Joined",
//                           "Actions",
//                         ].map((h) => (
//                           <td
//                             key={h}
//                             className="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest"
//                             style={{ color: "rgba(167,197,139,0.25)" }}
//                           >
//                             {h}
//                           </td>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {CUSTOMERS.map((c, i) => (
//                         <tr
//                           key={i}
//                           style={{
//                             borderTop: "1px solid rgba(167,197,139,0.05)",
//                           }}
//                           onMouseEnter={(e) =>
//                             (e.currentTarget.style.background =
//                               "rgba(122,173,92,0.03)")
//                           }
//                           onMouseLeave={(e) =>
//                             (e.currentTarget.style.background = "transparent")
//                           }
//                         >
//                           <td className="px-5 py-3.5">
//                             <div className="flex items-center gap-2.5">
//                               <div
//                                 className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
//                                 style={{
//                                   background: "rgba(122,173,92,0.1)",
//                                   border: "1px solid rgba(122,173,92,0.15)",
//                                   color: greenDim,
//                                 }}
//                               >
//                                 {c.av}
//                               </div>
//                               <span
//                                 className="text-xs font-medium"
//                                 style={{ color: "rgba(212,236,208,0.75)" }}
//                               >
//                                 {c.name}
//                               </span>
//                             </div>
//                           </td>
//                           <td
//                             className="px-5 py-3.5 text-xs"
//                             style={{ color: "rgba(167,197,139,0.4)" }}
//                           >
//                             {c.email}
//                           </td>
//                           <td
//                             className="px-5 py-3.5 text-xs font-semibold"
//                             style={{ color: green }}
//                           >
//                             {c.orders}
//                           </td>
//                           <td
//                             className="px-5 py-3.5 text-sm font-semibold"
//                             style={{ color: "#dcecd0" }}
//                           >
//                             {c.spent}
//                           </td>
//                           <td
//                             className="px-5 py-3.5 text-xs"
//                             style={{ color: "rgba(167,197,139,0.35)" }}
//                           >
//                             {c.joined}
//                           </td>
//                           <td className="px-5 py-3.5">
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() =>
//                                   navigate(`/admin/customers/${c.id}`)
//                                 }
//                                 className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
//                                 style={{
//                                   background: "rgba(91,155,212,0.08)",
//                                   border: "1px solid rgba(91,155,212,0.18)",
//                                   color: "#5b9bd4",
//                                 }}
//                                 onMouseEnter={(e) =>
//                                   (e.currentTarget.style.background =
//                                     "rgba(91,155,212,0.15)")
//                                 }
//                                 onMouseLeave={(e) =>
//                                   (e.currentTarget.style.background =
//                                     "rgba(91,155,212,0.08)")
//                                 }
//                               >
//                                 <svg
//                                   width="11"
//                                   height="11"
//                                   viewBox="0 0 24 24"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   strokeWidth="2"
//                                   strokeLinecap="round"
//                                 >
//                                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                                   <circle cx="12" cy="12" r="3" />
//                                 </svg>
//                                 View
//                               </button>
//                               <button
//                                 className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
//                                 style={{
//                                   background: "rgba(220,80,60,0.07)",
//                                   border: "1px solid rgba(220,80,60,0.18)",
//                                   color: "rgba(220,100,80,0.75)",
//                                 }}
//                                 onMouseEnter={(e) => {
//                                   e.currentTarget.style.background =
//                                     "rgba(220,80,60,0.14)";
//                                   e.currentTarget.style.color =
//                                     "rgba(220,100,80,1)";
//                                 }}
//                                 onMouseLeave={(e) => {
//                                   e.currentTarget.style.background =
//                                     "rgba(220,80,60,0.07)";
//                                   e.currentTarget.style.color =
//                                     "rgba(220,100,80,0.75)";
//                                 }}
//                               >
//                                 <svg
//                                   width="11"
//                                   height="11"
//                                   viewBox="0 0 24 24"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   strokeWidth="2"
//                                   strokeLinecap="round"
//                                 >
//                                   <polyline points="3 6 5 6 21 6" />
//                                   <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
//                                   <path d="M10 11v6M14 11v6" />
//                                 </svg>
//                                 Remove
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </Card>
//             )}
//           </div>
//         </main>
//       </div>

//       {/* ─── Delete Confirm Modal ─────────────────────── */}
//       {deleteConfirm && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center p-4"
//           style={{
//             background: "rgba(5,12,8,0.75)",
//             backdropFilter: "blur(6px)",
//           }}
//         >
//           <div
//             className="w-full max-w-sm rounded-2xl p-6 text-center"
//             style={{
//               background: "#0f1f14",
//               border: "1px solid rgba(167,197,139,0.15)",
//               boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
//             }}
//           >
//             <div
//               className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
//               style={{
//                 background: "rgba(220,80,60,0.1)",
//                 border: "1px solid rgba(220,80,60,0.2)",
//               }}
//             >
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="rgba(220,100,80,0.9)"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//               >
//                 <polyline points="3 6 5 6 21 6" />
//                 <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
//               </svg>
//             </div>
//             <h3
//               className="font-semibold text-base mb-1.5"
//               style={{ color: "#dcecd0" }}
//             >
//               Delete Product?
//             </h3>
//             <p
//               className="text-sm mb-6"
//               style={{ color: "rgba(167,197,139,0.4)" }}
//             >
//               This action cannot be undone. The product will be permanently
//               removed.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setDeleteConfirm(null)}
//                 className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   border: "1px solid rgba(167,197,139,0.12)",
//                   color: "rgba(167,197,139,0.5)",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
//                 }
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDeleteProduct(deleteConfirm)}
//                 className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
//                 style={{
//                   background: "rgba(220,80,60,0.12)",
//                   border: "1px solid rgba(220,80,60,0.25)",
//                   color: "rgba(220,100,80,0.9)",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.background = "rgba(220,80,60,0.2)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.background = "rgba(220,80,60,0.12)")
//                 }
//               >
//                 Yes, Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
