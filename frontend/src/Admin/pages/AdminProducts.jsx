import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAdminProducts } from "../../features/admin/adminSlice";

const T = {
  bg: "#070f09",
  surface: "#0b1710",
  card: "#0d1c12",
  cardHover: "#112016",
  border: "rgba(167,197,139,0.08)",
  borderHover: "rgba(122,173,92,0.25)",
  green: "#7aad5c",
  greenBg: "rgba(122,173,92,0.08)",
  text: "#dcecd0",
  textMid: "rgba(212,236,208,0.6)",
  textDim: "rgba(167,197,139,0.3)",
  gold: "#e8a24a",
  goldBg: "rgba(232,162,74,0.08)",
  red: "#e05555",
  redBg: "rgba(224,85,85,0.08)",
  blue: "#5b9bd4",
  blueBg: "rgba(91,155,212,0.08)",
};

const CATEGORY_COLORS = {
  Ayurvedic: { color: "#7aad5c", bg: "rgba(122,173,92,0.1)" },
  "Weight Loss": { color: "#e8a24a", bg: "rgba(232,162,74,0.1)" },
  Nutrition: { color: "#5b9bd4", bg: "rgba(91,155,212,0.1)" },
  Supplements: { color: "#b07de8", bg: "rgba(176,125,232,0.1)" },
  Immunity: { color: "#e87d7d", bg: "rgba(232,125,125,0.1)" },
  Skincare: { color: "#e8c87d", bg: "rgba(232,200,125,0.1)" },
  Haircare: { color: "#7de8d4", bg: "rgba(125,232,212,0.1)" },
};

function DeleteModal({ product, onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: T.card,
          border: `1px solid rgba(224,85,85,0.25)`,
          borderRadius: 20,
          padding: "32px",
          maxWidth: 400,
          width: "90%",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
          animation: "fadeUp 0.2s ease",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: T.redBg,
            border: `1px solid rgba(224,85,85,0.2)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <svg
            width="22"
            height="22"
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
            margin: "0 0 24px",
            lineHeight: 1.6,
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
              padding: "11px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              background: "transparent",
              border: `1.5px solid ${T.border}`,
              color: T.textMid,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              background: "linear-gradient(135deg, #b03030, #e05555)",
              border: "none",
              color: "#fff",
              boxShadow: "0 4px 14px rgba(224,85,85,0.3)",
            }}
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
    color: T.green,
    bg: T.greenBg,
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
        borderRadius: 18,
        overflow: "hidden",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${T.borderHover}`
          : "none",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          height: 180,
          overflow: "hidden",
          background: "#0a1a0d",
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
            transform: hovered ? "scale(1.05)" : "scale(1)",
            opacity: isOutOfStock ? 0.5 : 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(7,15,9,0.8) 0%, transparent 50%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            display: "flex",
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "3px 9px",
              borderRadius: 6,
              background: catStyle.bg,
              color: catStyle.color,
              border: `1px solid ${catStyle.color}30`,
              backdropFilter: "blur(8px)",
            }}
          >
            {product.category}
          </span>
          {isOutOfStock && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "3px 9px",
                borderRadius: 6,
                background: "rgba(224,85,85,0.15)",
                color: T.red,
                border: `1px solid rgba(224,85,85,0.25)`,
                backdropFilter: "blur(8px)",
              }}
            >
              Out of Stock
            </span>
          )}
        </div>

        {discount > 0 && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "linear-gradient(135deg, #b8720a, #e8a24a)",
              borderRadius: 8,
              padding: "4px 9px",
              fontSize: 10,
              fontWeight: 800,
              color: "#fff",
              boxShadow: "0 2px 8px rgba(232,162,74,0.4)",
            }}
          >
            -{discount}%
          </div>
        )}

        <div style={{ position: "absolute", bottom: 10, right: 10 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "rgba(0,0,0,0.5)",
              border: `1px solid rgba(255,255,255,0.1)`,
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.textMid,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                bottom: 38,
                right: 0,
                background: "#0f1f14",
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                overflow: "hidden",
                minWidth: 130,
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
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
                  padding: "10px 14px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  color: T.textMid,
                  textAlign: "left",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = T.greenBg)
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
                  stroke={T.green}
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
                  padding: "10px 14px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  color: T.red,
                  textAlign: "left",
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
                  stroke={T.red}
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

      <div style={{ padding: "16px" }}>
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
            margin: "0 0 12px",
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 20,
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
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 6,
          }}
        >
          <div
            style={{
              padding: "8px 6px",
              borderRadius: 9,
              textAlign: "center",
              background: isOutOfStock ? T.redBg : T.greenBg,
              border: `1px solid ${isOutOfStock ? "rgba(224,85,85,0.15)" : "rgba(122,173,92,0.12)"}`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: isOutOfStock ? T.red : T.green,
              }}
            >
              {product.stock}
            </div>
            <div
              style={{
                fontSize: 9,
                color: T.textDim,
                fontWeight: 500,
                marginTop: 1,
              }}
            >
              stock
            </div>
          </div>
          <div
            style={{
              padding: "8px 6px",
              borderRadius: 9,
              textAlign: "center",
              background: T.goldBg,
              border: `1px solid rgba(232,162,74,0.12)`,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, color: T.gold }}>
              {product.itemsSold}
            </div>
            <div
              style={{
                fontSize: 9,
                color: T.textDim,
                fontWeight: 500,
                marginTop: 1,
              }}
            >
              sold
            </div>
          </div>
          <div
            style={{
              padding: "8px 6px",
              borderRadius: 9,
              textAlign: "center",
              background: T.blueBg,
              border: `1px solid rgba(91,155,212,0.12)`,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, color: T.blue }}>
              {product.viewersCount}
            </div>
            <div
              style={{
                fontSize: 9,
                color: T.textDim,
                fontWeight: 500,
                marginTop: 1,
              }}
            >
              watching
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function AdminAllProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Sirf redux — koi DUMMY nahi, koi useState(products) nahi
  const { products1: products, loading } = useSelector((state) => state.admin);
  const safeProducts = products || [];

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterStock, setFilterStock] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchFoc, setSearchFoc] = useState(false);

  // ✅ Sirf ek baar
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
    // dispatch(deleteProduct(deleteTarget._id)); // baad mein
    setDeleteTarget(null);
  };
  const handleEdit = (product) =>
    navigate(`/admin/product/edit/${product._id}`);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: T.text,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::placeholder { color: rgba(167,197,139,0.25) !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(122,173,92,0.2); border-radius: 10px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Top Bar */}
      <div
        style={{
          background: T.surface,
          borderBottom: `1px solid ${T.border}`,
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate("/admin/dashboard")}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${T.border}`,
              borderRadius: 9,
              padding: "6px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: T.textDim,
              fontSize: 12,
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.green)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.textDim)}
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
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Dashboard
          </button>
          <div style={{ width: 1, height: 20, background: T.border }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: T.text }}>
            All Products
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "2px 9px",
              borderRadius: 20,
              background: T.greenBg,
              color: T.green,
              border: `1px solid rgba(122,173,92,0.2)`,
            }}
          >
            {filtered.length}
          </span>
        </div>

        <button
          onClick={() => navigate("/admin/product/create")}
          style={{
            padding: "8px 18px",
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "linear-gradient(135deg, #3d6b2c, #5a8f40)",
            border: "none",
            color: "#d4eebc",
            boxShadow: "0 4px 14px rgba(61,107,44,0.35)",
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

      {/* Body */}
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px 60px" }}
      >
        {/* Search + Filters */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 24,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
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
              stroke={T.textDim}
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
                padding: "10px 14px 10px 36px",
                borderRadius: 10,
                fontSize: 13,
                fontFamily: "inherit",
                background: "rgba(255,255,255,0.03)",
                color: T.text,
                border: `1.5px solid ${searchFoc ? "rgba(122,173,92,0.4)" : T.border}`,
                outline: "none",
                transition: "border 0.2s",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: filterCat === cat ? T.greenBg : "transparent",
                  border: `1px solid ${filterCat === cat ? "rgba(122,173,92,0.3)" : T.border}`,
                  color: filterCat === cat ? T.green : T.textDim,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            {["All", "In Stock", "Out of Stock"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStock(s)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background:
                    filterStock === s
                      ? s === "Out of Stock"
                        ? T.redBg
                        : T.greenBg
                      : "transparent",
                  border: `1px solid ${filterStock === s ? (s === "Out of Stock" ? "rgba(224,85,85,0.25)" : "rgba(122,173,92,0.3)") : T.border}`,
                  color:
                    filterStock === s
                      ? s === "Out of Stock"
                        ? T.red
                        : T.green
                      : T.textDim,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {[
            {
              label: "Total Products",
              value: safeProducts.length,
              color: T.green,
            },
            {
              label: "Total Revenue",
              value: `₹${safeProducts.reduce((a, p) => a + p.price * p.itemsSold, 0).toLocaleString()}`,
              color: T.gold,
            },
            {
              label: "Out of Stock",
              value: safeProducts.filter((p) => p.stock === 0).length,
              color: T.red,
            },
            {
              label: "Total Sold",
              value: safeProducts.reduce((a, p) => a + p.itemsSold, 0),
              color: T.blue,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: stat.color,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: T.textDim,
                  marginTop: 3,
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              color: T.textDim,
              fontSize: 13,
            }}
          >
            🌿 Loading products...
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: T.textDim,
              fontSize: 14,
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
            <p style={{ margin: 0 }}>Koi product nahi mila</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 16,
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
