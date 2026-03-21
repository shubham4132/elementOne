import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../features/admin/adminSlice";

const T = {
  bg: "#f5f3ff",
  surface: "#ffffff",
  card: "#ffffff",
  cardHover: "#faf9ff",
  border: "rgba(109,40,217,0.08)",
  borderHover: "rgba(109,40,217,0.28)",
  primary: "#7c3aed",
  primaryDark: "#6d28d9",
  primaryBg: "rgba(124,58,237,0.07)",
  primaryBorder: "rgba(124,58,237,0.18)",
  text: "#1e1b2e",
  textMid: "#4c4777",
  textDim: "#9e99c0",
  gold: "#d97706",
  goldBg: "rgba(217,119,6,0.07)",
  red: "#dc2626",
  redBg: "rgba(220,38,38,0.07)",
  teal: "#0891b2",
  tealBg: "rgba(8,145,178,0.07)",
  success: "#059669",
  successBg: "rgba(5,150,105,0.07)",
};

const CATEGORY_COLORS = {
  Ayurvedic: {
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.2)",
  },
  "Weight Loss": {
    color: "#d97706",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.2)",
  },
  Nutrition: {
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.2)",
  },
  Supplements: {
    color: "#db2777",
    bg: "rgba(219,39,119,0.08)",
    border: "rgba(219,39,119,0.2)",
  },
  Immunity: {
    color: "#dc2626",
    bg: "rgba(220,38,38,0.08)",
    border: "rgba(220,38,38,0.2)",
  },
  Skincare: {
    color: "#c2410c",
    bg: "rgba(194,65,12,0.08)",
    border: "rgba(194,65,12,0.2)",
  },
  Haircare: {
    color: "#0891b2",
    bg: "rgba(8,145,178,0.08)",
    border: "rgba(8,145,178,0.2)",
  },
};

function DeleteModal({ product, onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(30,27,46,0.35)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 22,
          padding: "36px 32px",
          maxWidth: 400,
          width: "90%",
          boxShadow: "0 32px 64px rgba(109,40,217,0.15)",
          animation: "fadeUp 0.2s ease",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            background: T.redBg,
            border: `1px solid rgba(220,38,38,0.18)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 22px",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={T.red}
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </div>
        <h3
          style={{
            textAlign: "center",
            margin: "0 0 8px",
            fontSize: 18,
            fontWeight: 700,
            color: T.text,
          }}
        >
          Delete Product?
        </h3>
        <p
          style={{
            textAlign: "center",
            color: T.textMid,
            fontSize: 13,
            margin: "0 0 28px",
            lineHeight: 1.65,
          }}
        >
          <strong style={{ color: T.text }}>{product?.name}</strong> permanently
          delete ho jayega. Ye action undo nahi hoga.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: 11,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              background: "#f5f3ff",
              border: `1.5px solid ${T.border}`,
              color: T.textMid,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = T.primaryBg;
              e.currentTarget.style.borderColor = T.primaryBorder;
              e.currentTarget.style.color = T.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f5f3ff";
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.color = T.textMid;
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: 11,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              background: T.red,
              border: "none",
              color: "#fff",
              boxShadow: "0 4px 14px rgba(220,38,38,0.28)",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = T.red)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;
  const catStyle = CATEGORY_COLORS[product.category] || {
    color: T.primary,
    bg: T.primaryBg,
    border: T.primaryBorder,
  };
  const isOutOfStock = product.stock === 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMenuOpen(false);
      }}
      style={{
        background: hovered ? T.cardHover : T.card,
        border: `1px solid ${hovered ? T.borderHover : T.border}`,
        borderRadius: 20,
        overflow: "hidden",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 40px rgba(109,40,217,0.12), 0 0 0 1px rgba(124,58,237,0.12)"
          : "0 2px 8px rgba(109,40,217,0.06)",
        position: "relative",
      }}
    >
      {/* Image area */}
      <div
        style={{
          position: "relative",
          height: 188,
          overflow: "hidden",
          background: "#f0ebff",
        }}
      >
        <img
          src={product.image?.[0]?.url}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            opacity: isOutOfStock ? 0.5 : 1,
          }}
        />
        {/* gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(30,27,46,0.4) 0%, transparent 55%)",
          }}
        />

        {/* top-left badges */}
        <div
          style={{
            position: "absolute",
            top: 11,
            left: 11,
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: 7,
              background: catStyle.bg,
              color: catStyle.color,
              border: `1px solid ${catStyle.border}`,
              backdropFilter: "blur(10px)",
            }}
          >
            {product.category}
          </span>
          {isOutOfStock && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: 7,
                background: "rgba(220,38,38,0.12)",
                color: T.red,
                border: `1px solid rgba(220,38,38,0.25)`,
                backdropFilter: "blur(10px)",
              }}
            >
              Out of Stock
            </span>
          )}
        </div>

        {/* discount badge */}
        {discount > 0 && (
          <div
            style={{
              position: "absolute",
              top: 11,
              right: 11,
              background: "linear-gradient(135deg, #b45309, #d97706)",
              borderRadius: 9,
              padding: "4px 10px",
              fontSize: 10,
              fontWeight: 800,
              color: "#fff",
              boxShadow: "0 2px 10px rgba(217,119,6,0.4)",
            }}
          >
            -{discount}%
          </div>
        )}

        {/* 3-dot menu */}
        <div style={{ position: "absolute", bottom: 11, right: 11 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "rgba(255,255,255,0.9)",
              border: `1px solid rgba(109,40,217,0.15)`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.textMid,
              boxShadow: "0 2px 6px rgba(109,40,217,0.1)",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.borderColor = T.primaryBorder;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.9)";
              e.currentTarget.style.borderColor = "rgba(109,40,217,0.15)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={T.textMid}>
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                bottom: 40,
                right: 0,
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                overflow: "hidden",
                minWidth: 145,
                boxShadow: "0 12px 32px rgba(109,40,217,0.14)",
                zIndex: 10,
              }}
            >
              <button
                onClick={() => {
                  onEdit(product);
                  setMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "11px 15px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.textMid,
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = T.primaryBg;
                  e.currentTarget.style.color = T.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = T.textMid;
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit Product
              </button>
              <div style={{ height: 1, background: T.border }} />
              <button
                onClick={() => {
                  onDelete(product);
                  setMenuOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "11px 15px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.red,
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = T.redBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "none")
                }
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "16px 18px 18px" }}>
        <h3
          style={{
            margin: "0 0 5px",
            fontSize: 13,
            fontWeight: 700,
            color: T.text,
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            margin: "0 0 13px",
            fontSize: 11,
            color: T.textDim,
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        {/* Price */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontSize: 21,
              fontWeight: 800,
              color: T.text,
              letterSpacing: "-0.02em",
            }}
          >
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span
              style={{
                fontSize: 12,
                color: T.textDim,
                textDecoration: "line-through",
              }}
            >
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
          {discount > 0 && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 5,
                background: "rgba(217,119,6,0.09)",
                color: T.gold,
                border: "1px solid rgba(217,119,6,0.18)",
              }}
            >
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 7,
          }}
        >
          <div
            style={{
              padding: "9px 6px",
              borderRadius: 10,
              textAlign: "center",
              background: isOutOfStock ? T.redBg : T.successBg,
              border: `1px solid ${isOutOfStock ? "rgba(220,38,38,0.15)" : "rgba(5,150,105,0.15)"}`,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: isOutOfStock ? T.red : T.success,
              }}
            >
              {product.stock}
            </div>
            <div
              style={{
                fontSize: 9,
                color: T.textDim,
                fontWeight: 600,
                marginTop: 1,
                letterSpacing: "0.04em",
              }}
            >
              STOCK
            </div>
          </div>
          <div
            style={{
              padding: "9px 6px",
              borderRadius: 10,
              textAlign: "center",
              background: T.goldBg,
              border: "1px solid rgba(217,119,6,0.15)",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 800, color: T.gold }}>
              {product.itemsSold}
            </div>
            <div
              style={{
                fontSize: 9,
                color: T.textDim,
                fontWeight: 600,
                marginTop: 1,
                letterSpacing: "0.04em",
              }}
            >
              SOLD
            </div>
          </div>
          <div
            style={{
              padding: "9px 6px",
              borderRadius: 10,
              textAlign: "center",
              background: T.primaryBg,
              border: `1px solid ${T.primaryBorder}`,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 800, color: T.primary }}>
              {product.viewersCount}
            </div>
            <div
              style={{
                fontSize: 9,
                color: T.textDim,
                fontWeight: 600,
                marginTop: 1,
                letterSpacing: "0.04em",
              }}
            >
              VIEWS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminAllProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products1: products, loading } = useSelector((state) => state.admin);
  const safeProducts = products || [];

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterStock, setFilterStock] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchFoc, setSearchFoc] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const categories = ["All", ...new Set(safeProducts.map((p) => p.category))];

  const filtered = safeProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || p.category === filterCat;
    const matchStock =
      filterStock === "All"
        ? true
        : filterStock === "In Stock"
          ? p.stock > 0
          : p.stock === 0;
    return matchSearch && matchCat && matchStock;
  });

  const handleDelete = (product) => setDeleteTarget(product);
  const confirmDelete = () => {
    dispatch(deleteProduct(deleteTarget._id));
    setDeleteTarget(null);
  };
  const handleEdit = (product) =>
    navigate(`/admin/product/edit/${product._id}`);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        fontFamily: "'Inter', system-ui, sans-serif",
        color: T.text,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::placeholder { color: #c4b5fd !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.18); border-radius: 10px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Top Bar ── */}
      <div
        style={{
          background: T.surface,
          borderBottom: `1px solid ${T.border}`,
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 58,
          position: "sticky",
          top: 0,
          zIndex: 20,
          boxShadow: "0 1px 0 rgba(109,40,217,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate("/admin/dashboard")}
            style={{
              background: T.primaryBg,
              border: `1px solid ${T.primaryBorder}`,
              borderRadius: 9,
              padding: "6px 13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: T.primary,
              fontSize: 12,
              fontWeight: 600,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = T.primary;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = T.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = T.primaryBg;
              e.currentTarget.style.color = T.primary;
              e.currentTarget.style.borderColor = T.primaryBorder;
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Dashboard
          </button>
          <div style={{ width: 1, height: 22, background: T.border }} />
          {/* Logo + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: "linear-gradient(135deg, #6d28d9, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(124,58,237,0.3)",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: T.text }}>
              All Products
            </span>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              background: T.primaryBg,
              color: T.primary,
              border: `1px solid ${T.primaryBorder}`,
            }}
          >
            {filtered.length}
          </span>
        </div>

        <button
          onClick={() => navigate("/admin/product/create")}
          style={{
            padding: "9px 20px",
            borderRadius: 11,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "linear-gradient(135deg, #6d28d9, #7c3aed)",
            border: "none",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(124,58,237,0.45)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 14px rgba(124,58,237,0.35)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg
            width="13"
            height="13"
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
      </div>

      {/* ── Body ── */}
      <div
        style={{ maxWidth: 1300, margin: "0 auto", padding: "28px 24px 60px" }}
      >
        {/* Stats cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            marginBottom: 24,
          }}
        >
          {[
            {
              label: "Total Products",
              value: safeProducts.length,
              color: T.primary,
              bg: T.primaryBg,
              border: T.primaryBorder,
              icon: (
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              ),
            },
            {
              label: "Total Revenue",
              value: `₹${safeProducts.reduce((a, p) => a + p.price * p.itemsSold, 0).toLocaleString()}`,
              color: T.gold,
              bg: T.goldBg,
              border: "rgba(217,119,6,0.18)",
              icon: (
                <>
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </>
              ),
            },
            {
              label: "Out of Stock",
              value: safeProducts.filter((p) => p.stock === 0).length,
              color: T.red,
              bg: T.redBg,
              border: "rgba(220,38,38,0.18)",
              icon: (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </>
              ),
            },
            {
              label: "Total Sold",
              value: safeProducts.reduce((a, p) => a + p.itemsSold, 0),
              color: T.success,
              bg: T.successBg,
              border: "rgba(5,150,105,0.18)",
              icon: (
                <>
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </>
              ),
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                padding: "20px 22px",
                boxShadow: "0 2px 8px rgba(109,40,217,0.05)",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(109,40,217,0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(109,40,217,0.05)")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: T.textDim,
                  }}
                >
                  {stat.label}
                </span>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: stat.bg,
                    border: `1px solid ${stat.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={stat.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {stat.icon}
                  </svg>
                </div>
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: T.text,
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filters panel */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            padding: "16px 20px",
            marginBottom: 24,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(109,40,217,0.05)",
          }}
        >
          {/* Search */}
          <div style={{ position: "relative", flex: "1", minWidth: 200 }}>
            <svg
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
              }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={searchFoc ? T.primary : T.textDim}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFoc(true)}
              onBlur={() => setSearchFoc(false)}
              placeholder="Search products..."
              style={{
                width: "100%",
                padding: "10px 14px 10px 38px",
                borderRadius: 10,
                fontSize: 13,
                fontFamily: "inherit",
                background: searchFoc ? "#fff" : "#faf9ff",
                color: T.text,
                border: `1.5px solid ${searchFoc ? T.primary : T.border}`,
                outline: "none",
                transition: "all 0.2s",
                boxShadow: searchFoc
                  ? "0 0 0 3px rgba(124,58,237,0.1)"
                  : "none",
              }}
            />
          </div>

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 28,
              background: T.border,
              flexShrink: 0,
            }}
          />

          {/* Category filters */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                style={{
                  padding: "7px 13px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background: filterCat === cat ? T.primaryBg : "transparent",
                  border: `1px solid ${filterCat === cat ? T.primaryBorder : T.border}`,
                  color: filterCat === cat ? T.primary : T.textDim,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div
            style={{
              width: 1,
              height: 28,
              background: T.border,
              flexShrink: 0,
            }}
          />

          {/* Stock filters */}
          <div style={{ display: "flex", gap: 6 }}>
            {[
              {
                label: "All",
                bg: T.primaryBg,
                border: T.primaryBorder,
                color: T.primary,
              },
              {
                label: "In Stock",
                bg: T.successBg,
                border: "rgba(5,150,105,0.18)",
                color: T.success,
              },
              {
                label: "Out of Stock",
                bg: T.redBg,
                border: "rgba(220,38,38,0.18)",
                color: T.red,
              },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => setFilterStock(s.label)}
                style={{
                  padding: "7px 13px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background: filterStock === s.label ? s.bg : "transparent",
                  border: `1px solid ${filterStock === s.label ? s.border : T.border}`,
                  color: filterStock === s.label ? s.color : T.textDim,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div
              style={{
                width: 38,
                height: 38,
                border: `3px solid ${T.border}`,
                borderTopColor: T.primary,
                borderRadius: "50%",
                margin: "0 auto 14px",
                animation: "spin 0.75s linear infinite",
              }}
            />
            <p style={{ color: T.textDim, fontSize: 13, margin: 0 }}>
              Loading products...
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "90px 20px" }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 22,
                background: T.primaryBg,
                border: `1px solid ${T.primaryBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke={T.primary}
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              </svg>
            </div>
            <p
              style={{
                margin: "0 0 6px",
                fontSize: 16,
                fontWeight: 700,
                color: T.text,
              }}
            >
              Koi product nahi mila
            </p>
            <p style={{ margin: "0 0 18px", fontSize: 13, color: T.textDim }}>
              Search ya filter change karo
            </p>
            <button
              onClick={() => navigate("/admin/product/create")}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: T.primary,
                background: T.primaryBg,
                border: `1px solid ${T.primaryBorder}`,
                padding: "9px 20px",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              + Pehla product add karo
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && filtered.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(245px, 1fr))",
              gap: 18,
            }}
          >
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteModal
          product={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
