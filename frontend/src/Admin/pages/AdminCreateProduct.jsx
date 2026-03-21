// src/Admin/pages/AdminCreateProduct.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../features/admin/adminSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
const initialFormData = {
  name: "",
  price: "",
  originalPrice: "",
  category: "",
  stock: "",
  description: "",
  longDescription: "",
  ingredients: "",
  benefits: "",
  images: [],
  itemsSold: "",
  viewersCount: "",
};

const STEPS = ["Basic Info", "Description", "Ingredients", "Media & Launch"];

const CATEGORIES = [
  "AYURVEDA",
  "ONCO NUTRITION",
  "WEIGHT LOSS/OBESITY",
  "CHILD NUTRITION",
  "ANGRY BEHAVIOUR",
  "HEIGHT GROWTH",
  "MENOPAUSE",
  "PCOS/PCOD",
  "WHITE DISCHARGE",
  "PROSTATE PROBLEM",
  "SEXUAL ISSUE",
  "DIABETES",
  "HYPERTENSION / BP",
  "JOINT PAIN",
  "ANKYLOSING SPONDYLITIS",
  "ARTHRITIS",
  "OSTEOARTHRITIS",
  "OSTEOPOROSIS",
  "LIVER / KIDNEY",
  "CREATININE",
  "FATTY LIVER",
  "PROSTATE",
  "OFFER ZONE",
];

const T = {
  bg: "#f0f4f8",
  surface: "#ffffff",
  card: "#ffffff",
  border: "rgba(15,23,42,0.08)",
  borderFoc: "rgba(37,99,235,0.4)",
  primary: "#2563eb",
  primaryBg: "rgba(37,99,235,0.07)",
  text: "#0f172a",
  textMid: "#475569",
  textDim: "#94a3b8",
  gold: "#f59e0b",
  teal: "#0891b2",
  success: "#10b981",
};

function Input({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  style = {},
}) {
  const [foc, setFoc] = useState(false);
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "10px 14px",
        borderRadius: 10,
        fontSize: 13,
        fontFamily: "inherit",
        background: foc ? "#fff" : "#f8fafc",
        color: T.text,
        border: `1.5px solid ${foc ? T.borderFoc : T.border}`,
        outline: "none",
        transition: "all 0.2s",
        boxShadow: foc ? `0 0 0 3px rgba(37,99,235,0.08)` : "none",
        ...style,
      }}
    />
  );
}

function Textarea({ name, value, onChange, placeholder, rows = 4 }) {
  const [foc, setFoc] = useState(false);
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "10px 14px",
        borderRadius: 10,
        fontSize: 13,
        fontFamily: "inherit",
        background: foc ? "#fff" : "#f8fafc",
        color: T.text,
        border: `1.5px solid ${foc ? T.borderFoc : T.border}`,
        outline: "none",
        transition: "all 0.2s",
        resize: "vertical",
        lineHeight: 1.6,
        boxShadow: foc ? `0 0 0 3px rgba(37,99,235,0.08)` : "none",
      }}
    />
  );
}

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 600,
          marginBottom: 6,
          color: T.textMid,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {label}
        {hint && (
          <span
            style={{
              fontWeight: 400,
              color: T.textDim,
              marginLeft: 6,
              fontSize: 11,
              textTransform: "none",
            }}
          >
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        marginBottom: 20,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "16px 20px",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: T.primaryBg,
            border: `1px solid rgba(37,99,235,0.15)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: T.text }}>
          {title}
        </h2>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

function IngTag({ label, onRemove }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: T.primaryBg,
        border: `1px solid rgba(37,99,235,0.18)`,
        color: T.primary,
        borderRadius: 20,
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(37,99,235,0.4)",
          padding: 0,
          lineHeight: 1,
          display: "flex",
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </span>
  );
}
function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) return;
    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });
      if (value) quillRef.current.root.innerHTML = value;
      quillRef.current.on("text-change", () => {
        onChange(quillRef.current.root.innerHTML);
      });
    });
  }, []);

  return <div ref={editorRef} style={{ height: 300, background: "#fff" }} />;
}

function BenRow({ text, onRemove }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 14px",
        borderRadius: 9,
        marginBottom: 6,
        background: "#f8fafc",
        border: `1px solid ${T.border}`,
      }}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke={T.success}
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span style={{ flex: 1, fontSize: 13, color: T.textMid }}>{text}</span>
      <button
        type="button"
        onClick={onRemove}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: T.textDim,
          padding: 0,
          display: "flex",
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export default function AdminCreateProduct({ onProductCreated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [preview, setPreview] = useState([]);
  const [step, setStep] = useState(0);
  const [newIng, setNewIng] = useState("");
  const [newBen, setNewBen] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const dispatch = useDispatch();

  const ingList = formData.ingredients
    ? formData.ingredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const benList = formData.benefits
    ? formData.benefits
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const addIng = () => {
    if (!newIng.trim()) return;
    setFormData((p) => ({
      ...p,
      ingredients: [...ingList, newIng.trim()].join(", "),
    }));
    setNewIng("");
  };
  const removeIng = (i) =>
    setFormData((p) => ({
      ...p,
      ingredients: ingList.filter((_, idx) => idx !== i).join(", "),
    }));

  const addBen = () => {
    if (!newBen.trim()) return;
    setFormData((p) => ({
      ...p,
      benefits: [...benList, newBen.trim()].join("\n"),
    }));
    setNewBen("");
  };
  const removeBen = (i) =>
    setFormData((p) => ({
      ...p,
      benefits: benList.filter((_, idx) => idx !== i).join("\n"),
    }));

  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => setPreview((p) => [...p, reader.result]);
      reader.readAsDataURL(file);
      setImageFiles((p) => [...p, file]);
    });
  };

  const removeImg = (i) => {
    setPreview((p) => p.filter((_, idx) => idx !== i));
    setImageFiles((p) => p.filter((_, idx) => idx !== i));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFiles.length) {
      alert("Please upload at least one product image.");
      return;
    }
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("price", formData.price);
    fd.append("originalPrice", formData.originalPrice || "");
    fd.append("category", formData.category);
    fd.append("stock", formData.stock);
    fd.append("description", formData.description);
    fd.append("longDescription", formData.longDescription);
    fd.append("itemsSold", formData.itemsSold || 0);
    fd.append("viewersCount", formData.viewersCount || 0);
    fd.append("ingredients", JSON.stringify(ingList));
    fd.append("benefits", JSON.stringify(benList));
    imageFiles.forEach((file) => fd.append("images", file));
    setSubmitted(true);
    dispatch(createProduct(fd));
    setTimeout(() => {
      if (onProductCreated) onProductCreated(formData);
      navigate("/admin/products");
    }, 2000);
  };

  const discount =
    formData.originalPrice && formData.price
      ? Math.round(
          ((+formData.originalPrice - +formData.price) /
            +formData.originalPrice) *
            100,
        )
      : 0;

  const completionFields = [
    formData.name,
    formData.price,
    formData.originalPrice,
    formData.category,
    formData.stock,
    formData.description,
    formData.longDescription,
    formData.ingredients,
    formData.benefits,
    preview.length ? "ok" : "",
  ];
  const completion = Math.round(
    (completionFields.filter(Boolean).length / completionFields.length) * 100,
  );

  const iconSVG = (path) => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={T.primary}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path}
    </svg>
  );

  const inputStyle = {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: 13,
    fontFamily: "inherit",
    background: "#f8fafc",
    color: T.text,
    border: `1.5px solid ${T.border}`,
    outline: "none",
  };
  const addBtnStyle = {
    padding: "10px 18px",
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 600,
    background: T.primaryBg,
    border: `1px solid rgba(37,99,235,0.2)`,
    color: T.primary,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::placeholder { color: #cbd5e1 !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(15,23,42,0.12); border-radius: 10px; }
        select option { background: #fff; color: #0f172a; }
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
          height: 56,
          position: "sticky",
          top: 0,
          zIndex: 20,
          boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate("/admin/dashboard")}
            style={{
              background: "#f8fafc",
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
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = T.primaryBg;
              e.currentTarget.style.color = T.primary;
              e.currentTarget.style.borderColor = "rgba(37,99,235,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.color = T.textDim;
              e.currentTarget.style.borderColor = T.border;
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
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>
          <div style={{ width: 1, height: 20, background: T.border }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: 14, color: T.text }}>
              Create New Product
            </span>
          </div>
        </div>

        {/* Step pills */}
        <div
          style={{
            display: "flex",
            background: "rgba(15,23,42,0.04)",
            borderRadius: 10,
            padding: 3,
            gap: 2,
          }}
        >
          {STEPS.map((label, i) => {
            const done = i < step,
              active = i === step;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                style={{
                  padding: "5px 14px",
                  borderRadius: 7,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  transition: "all 0.2s",
                  background: active ? T.surface : "transparent",
                  color: active ? T.primary : done ? T.success : T.textDim,
                  boxShadow: active ? "0 1px 4px rgba(15,23,42,0.1)" : "none",
                }}
              >
                {done ? "✓ " : `${i + 1}. `}
                {label}
              </button>
            );
          })}
        </div>

        <span style={{ fontSize: 12, color: T.textDim, fontWeight: 500 }}>
          Step {step + 1} / {STEPS.length}
        </span>
      </div>

      {/* ── Body ── */}
      <div
        style={{ maxWidth: 1160, margin: "0 auto", padding: "28px 24px 60px" }}
      >
        {/* Progress stepper */}
        <div
          style={{
            marginBottom: 24,
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 14,
            padding: "18px 24px",
            boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {STEPS.map((label, i) => {
              const done = i < step,
                active = i === step;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flex: i < STEPS.length - 1 ? "1" : "0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        background: done
                          ? "rgba(16,185,129,0.1)"
                          : active
                            ? T.primaryBg
                            : "#f1f5f9",
                        border: `1.5px solid ${done ? T.success : active ? T.primary : T.border}`,
                        color: done
                          ? T.success
                          : active
                            ? T.primary
                            : T.textDim,
                        boxShadow: active
                          ? `0 0 0 3px rgba(37,99,235,0.1)`
                          : "none",
                      }}
                    >
                      {done ? (
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={T.success}
                          strokeWidth="3"
                          strokeLinecap="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: active ? 600 : 400,
                        color: active ? T.text : done ? T.success : T.textDim,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        height: 2,
                        borderRadius: 2,
                        background: done ? "rgba(16,185,129,0.3)" : T.border,
                        minWidth: 20,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: 24,
              alignItems: "start",
            }}
          >
            {/* ── LEFT ── */}
            <div>
              {/* STEP 0 */}
              {step === 0 && (
                <>
                  <Card
                    title="Basic Information"
                    icon={iconSVG(
                      <>
                        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
                      </>,
                    )}
                  >
                    <Field label="Product Name">
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ashwagandha Root Extract 500mg"
                      />
                    </Field>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 14,
                      }}
                    >
                      <Field label="Sale Price" hint="₹">
                        <Input
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="499"
                        />
                      </Field>
                      <Field label="MRP" hint="₹">
                        <Input
                          name="originalPrice"
                          type="number"
                          value={formData.originalPrice}
                          onChange={handleChange}
                          placeholder="799"
                        />
                      </Field>
                      <Field label="Stock">
                        <Input
                          name="stock"
                          type="number"
                          value={formData.stock}
                          onChange={handleChange}
                          placeholder="100"
                        />
                      </Field>
                    </div>
                    <Field label="Category">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: 10,
                          fontSize: 13,
                          background: "#f8fafc",
                          color: T.text,
                          border: `1.5px solid ${T.border}`,
                          outline: "none",
                          fontFamily: "inherit",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">Select category...</option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </Field>
                    {discount > 0 && (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          background: "rgba(245,158,11,0.07)",
                          border: "1px solid rgba(245,158,11,0.2)",
                          borderRadius: 9,
                          padding: "8px 14px",
                          marginTop: 4,
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={T.gold}
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
                        </svg>
                        <span
                          style={{
                            color: T.gold,
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          {discount}% discount applied
                        </span>
                      </div>
                    )}
                  </Card>

                  <Card
                    title="Social Proof"
                    icon={iconSVG(
                      <>
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </>,
                    )}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: T.textDim,
                        marginTop: 0,
                        marginBottom: 16,
                      }}
                    >
                      These numbers display on the product page to build trust
                      and urgency.
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 14,
                      }}
                    >
                      <Field label="Items Sold" hint="shown on storefront">
                        <Input
                          name="itemsSold"
                          type="number"
                          value={formData.itemsSold}
                          onChange={handleChange}
                          placeholder="0"
                        />
                      </Field>
                      <Field label="Current Viewers" hint="shown on storefront">
                        <Input
                          name="viewersCount"
                          type="number"
                          value={formData.viewersCount}
                          onChange={handleChange}
                          placeholder="0"
                        />
                      </Field>
                    </div>
                  </Card>
                </>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <Card
                  title="Product Description"
                  icon={iconSVG(
                    <>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </>,
                  )}
                >
                  <Field
                    label="Short Description"
                    hint="shown in product cards"
                  >
                    <Input
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief, compelling one-liner about the product"
                    />
                  </Field>
                  {/* <Field
                    label="Detailed Description"
                    hint="shown on product detail page"
                  >
                    <Textarea
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleChange}
                      placeholder="Full explanation — science, target audience, unique selling points..."
                      rows={7}
                    />
                  </Field> */}
                  <Field
                    label="Detailed Description"
                    hint="shown on product detail page"
                  >
                    <div style={{ marginBottom: 44 }}>
                      <RichTextEditor
                        value={formData.longDescription}
                        onChange={(value) =>
                          setFormData((p) => ({ ...p, longDescription: value }))
                        }
                      />
                    </div>
                  </Field>
                  <div
                    style={{
                      background: T.primaryBg,
                      border: `1px solid rgba(37,99,235,0.12)`,
                      borderRadius: 9,
                      padding: "12px 16px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: T.textMid,
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      💡 <strong style={{ color: T.text }}>Tip:</strong> A great
                      description explains the product's science, who it's for,
                      and what makes it unique — in 3 to 5 sentences.
                    </p>
                  </div>
                </Card>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <Card
                    title="Key Ingredients"
                    icon={iconSVG(
                      <>
                        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                        <path d="M8 12s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </>,
                    )}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 7,
                        marginBottom: 16,
                        minHeight: 36,
                      }}
                    >
                      {ingList.map((ing, i) => (
                        <IngTag
                          key={i}
                          label={ing}
                          onRemove={() => removeIng(i)}
                        />
                      ))}
                      {!ingList.length && (
                        <span
                          style={{
                            color: T.textDim,
                            fontSize: 12,
                            fontStyle: "italic",
                          }}
                        >
                          No ingredients added yet.
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <input
                        value={newIng}
                        onChange={(e) => setNewIng(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addIng();
                          }
                        }}
                        placeholder="Type ingredient and press Enter..."
                        style={inputStyle}
                      />
                      <button
                        type="button"
                        onClick={addIng}
                        style={addBtnStyle}
                      >
                        + Add
                      </button>
                    </div>
                  </Card>

                  <Card
                    title="Product Benefits"
                    icon={iconSVG(
                      <>
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </>,
                    )}
                  >
                    <div style={{ marginBottom: 14 }}>
                      {benList.map((b, i) => (
                        <BenRow
                          key={i}
                          text={b}
                          onRemove={() => removeBen(i)}
                        />
                      ))}
                      {!benList.length && (
                        <p
                          style={{
                            color: T.textDim,
                            fontSize: 12,
                            fontStyle: "italic",
                          }}
                        >
                          No benefits added yet.
                        </p>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <input
                        value={newBen}
                        onChange={(e) => setNewBen(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addBen();
                          }
                        }}
                        placeholder="e.g. Supports bone density"
                        style={inputStyle}
                      />
                      <button
                        type="button"
                        onClick={addBen}
                        style={addBtnStyle}
                      >
                        + Add
                      </button>
                    </div>
                  </Card>
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <Card
                  title="Product Images"
                  icon={iconSVG(
                    <>
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </>,
                  )}
                >
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      handleFiles(e.dataTransfer.files);
                    }}
                    style={{
                      display: "block",
                      border: `2px dashed ${dragOver ? T.primary : "rgba(37,99,235,0.2)"}`,
                      borderRadius: 14,
                      padding: "40px 24px",
                      textAlign: "center",
                      cursor: "pointer",
                      background: dragOver ? T.primaryBg : "#fafbfc",
                      transition: "all 0.2s",
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: T.primaryBg,
                        border: `1px solid rgba(37,99,235,0.15)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 14px",
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={T.primary}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <p
                      style={{
                        fontWeight: 600,
                        color: T.text,
                        margin: "0 0 5px",
                        fontSize: 14,
                      }}
                    >
                      Drop images here or click to browse
                    </p>
                    <p style={{ color: T.textDim, fontSize: 11, margin: 0 }}>
                      PNG, JPG — Max 5MB each
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFiles(e.target.files)}
                      style={{ display: "none" }}
                    />
                  </label>

                  {preview.length > 0 && (
                    <>
                      <p
                        style={{
                          fontWeight: 600,
                          color: T.textMid,
                          fontSize: 12,
                          marginBottom: 12,
                        }}
                      >
                        Uploaded ({preview.length}) — first image is primary
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(110px, 1fr))",
                          gap: 10,
                        }}
                      >
                        {preview.map((img, i) => (
                          <div
                            key={i}
                            style={{
                              position: "relative",
                              borderRadius: 10,
                              overflow: "hidden",
                              border:
                                i === 0
                                  ? `2px solid ${T.primary}`
                                  : `1px solid ${T.border}`,
                            }}
                          >
                            {i === 0 && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: 5,
                                  left: 5,
                                  background: T.primary,
                                  color: "#fff",
                                  fontSize: 8,
                                  fontWeight: 700,
                                  borderRadius: 4,
                                  padding: "2px 6px",
                                  zIndex: 2,
                                  letterSpacing: "0.06em",
                                }}
                              >
                                PRIMARY
                              </div>
                            )}
                            <img
                              src={img}
                              alt=""
                              style={{
                                width: "100%",
                                height: 100,
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImg(i)}
                              style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                background: "rgba(0,0,0,0.55)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "50%",
                                width: 20,
                                height: 20,
                                cursor: "pointer",
                                padding: 0,
                                zIndex: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </Card>
              )}

              {/* Nav Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <button
                  type="button"
                  onClick={() => setStep((p) => Math.max(0, p - 1))}
                  disabled={step === 0}
                  style={{
                    padding: "10px 22px",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: step === 0 ? "not-allowed" : "pointer",
                    background: "#f8fafc",
                    border: `1.5px solid ${T.border}`,
                    color: step === 0 ? T.textDim : T.textMid,
                    transition: "all 0.2s",
                  }}
                >
                  ← Back
                </button>
                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setStep((p) => Math.min(STEPS.length - 1, p + 1))
                    }
                    style={{
                      padding: "10px 26px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      background: T.primaryBg,
                      border: `1.5px solid rgba(37,99,235,0.25)`,
                      color: T.primary,
                      transition: "all 0.2s",
                    }}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitted}
                    style={{
                      padding: "11px 28px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: submitted ? "default" : "pointer",
                      background: submitted
                        ? "rgba(16,185,129,0.1)"
                        : "linear-gradient(135deg, #1d4ed8, #2563eb)",
                      border: submitted
                        ? "1px solid rgba(16,185,129,0.3)"
                        : "none",
                      color: submitted ? T.success : "#fff",
                      boxShadow: submitted
                        ? "none"
                        : "0 4px 14px rgba(37,99,235,0.35)",
                      transition: "all 0.3s",
                    }}
                  >
                    {submitted ? "✓ Product Published!" : "🚀 Publish Product"}
                  </button>
                )}
              </div>
            </div>

            {/* ── RIGHT: Live Preview ── */}
            <div style={{ position: "sticky", top: 80 }}>
              <div
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(15,23,42,0.08)",
                }}
              >
                {/* Browser mock header */}
                <div
                  style={{
                    background: "#f1f5f9",
                    padding: "10px 16px",
                    borderBottom: `1px solid ${T.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", gap: 5 }}>
                    {["#fca5a5", "#fcd34d", "#86efac"].map((c, i) => (
                      <div
                        key={i}
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          background: c,
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      background: "#fff",
                      border: `1px solid ${T.border}`,
                      borderRadius: 6,
                      padding: "3px 12px",
                      fontSize: 10,
                      color: T.textDim,
                      fontWeight: 500,
                    }}
                  >
                    elementone.in/product
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: T.success,
                      }}
                    />
                    <span style={{ fontSize: 10, color: T.textDim }}>Live</span>
                  </div>
                </div>

                <div style={{ padding: 18 }}>
                  {/* Image */}
                  <div
                    style={{
                      width: "100%",
                      height: 170,
                      borderRadius: 12,
                      marginBottom: 14,
                      overflow: "hidden",
                      background: preview.length ? "transparent" : "#f8fafc",
                      border: `1px solid ${T.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {preview.length ? (
                      <img
                        src={preview[0]}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={T.textDim}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    )}
                  </div>

                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: 5,
                      background: T.primaryBg,
                      color: T.primary,
                      border: `1px solid rgba(37,99,235,0.15)`,
                    }}
                  >
                    {formData.category || "Category"}
                  </span>

                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: T.text,
                      margin: "8px 0 5px",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.35,
                    }}
                  >
                    {formData.name || "Product name will appear here"}
                  </h3>
                  <p
                    style={{
                      fontSize: 11,
                      color: T.textDim,
                      margin: "0 0 12px",
                      lineHeight: 1.55,
                    }}
                  >
                    {formData.description ||
                      "Short description appears here..."}
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
                      style={{ fontSize: 20, fontWeight: 800, color: T.text }}
                    >
                      ₹{formData.price || "—"}
                    </span>
                    {formData.originalPrice && (
                      <span
                        style={{
                          fontSize: 12,
                          color: T.textDim,
                          textDecoration: "line-through",
                        }}
                      >
                        ₹{formData.originalPrice}
                      </span>
                    )}
                    {discount > 0 && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: 5,
                          background: "rgba(245,158,11,0.1)",
                          color: T.gold,
                          border: `1px solid rgba(245,158,11,0.2)`,
                        }}
                      >
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {benList.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      {benList.slice(0, 3).map((b, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 4,
                          }}
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={T.success}
                            strokeWidth="3"
                            strokeLinecap="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          <span style={{ fontSize: 11, color: T.textMid }}>
                            {b}
                          </span>
                        </div>
                      ))}
                      {benList.length > 3 && (
                        <p
                          style={{
                            fontSize: 10,
                            color: T.textDim,
                            margin: "3px 0 0 16px",
                          }}
                        >
                          +{benList.length - 3} more
                        </p>
                      )}
                    </div>
                  )}

                  {(formData.itemsSold || formData.viewersCount) && (
                    <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                      {formData.itemsSold && (
                        <div
                          style={{
                            flex: 1,
                            background: "rgba(245,158,11,0.06)",
                            border: "1px solid rgba(245,158,11,0.15)",
                            borderRadius: 8,
                            padding: "7px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: 14,
                              color: T.gold,
                            }}
                          >
                            {formData.itemsSold}
                          </div>
                          <div
                            style={{
                              fontSize: 9,
                              color: "rgba(245,158,11,0.6)",
                              fontWeight: 500,
                            }}
                          >
                            sold
                          </div>
                        </div>
                      )}
                      {formData.viewersCount && (
                        <div
                          style={{
                            flex: 1,
                            background: "rgba(8,145,178,0.06)",
                            border: "1px solid rgba(8,145,178,0.15)",
                            borderRadius: 8,
                            padding: "7px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: 14,
                              color: T.teal,
                            }}
                          >
                            {formData.viewersCount}
                          </div>
                          <div
                            style={{
                              fontSize: 9,
                              color: "rgba(8,145,178,0.6)",
                              fontWeight: 500,
                            }}
                          >
                            watching
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    style={{
                      background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                      borderRadius: 10,
                      padding: 10,
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: 12,
                      color: "#fff",
                      cursor: "default",
                      boxShadow: "0 4px 12px rgba(37,99,235,0.25)",
                    }}
                  >
                    Add to Cart
                  </div>
                </div>

                {/* Completion meter */}
                <div
                  style={{
                    padding: "0 18px 18px",
                    borderTop: `1px solid ${T.border}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "14px 0 6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: T.textDim,
                        fontWeight: 500,
                      }}
                    >
                      Form Completion
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: completion === 100 ? T.success : T.gold,
                        fontWeight: 700,
                      }}
                    >
                      {completion}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: "#f1f5f9",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 999,
                        transition: "width 0.4s ease",
                        width: `${completion}%`,
                        background:
                          completion === 100
                            ? `linear-gradient(90deg, #059669, ${T.success})`
                            : `linear-gradient(90deg, #d97706, ${T.gold})`,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 5,
                    }}
                  >
                    {[
                      ["Name", formData.name],
                      ["Price", formData.price],
                      ["Stock", formData.stock],
                      ["Category", formData.category],
                      ["Description", formData.description],
                      ["Long Desc.", formData.longDescription],
                      ["Ingredients", formData.ingredients],
                      ["Benefits", formData.benefits],
                      ["Images", preview.length ? "ok" : ""],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: v ? "rgba(16,185,129,0.1)" : "#f1f5f9",
                            border: `1px solid ${v ? "rgba(16,185,129,0.3)" : T.border}`,
                            flexShrink: 0,
                          }}
                        >
                          {v && (
                            <svg
                              width="7"
                              height="7"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={T.success}
                              strokeWidth="3"
                              strokeLinecap="round"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: 10,
                            color: v ? T.textMid : T.textDim,
                          }}
                        >
                          {k}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
