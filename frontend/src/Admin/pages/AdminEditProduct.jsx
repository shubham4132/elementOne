import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../features/admin/adminSlice";
import { fetchAdminProducts } from "../../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";

const STEPS = ["Basic Info", "Description", "Ingredients", "Media & Launch"];

const CATEGORIES = [
  "Supplements", "Ayurvedic", "Weight Loss", "Nutrition",
  "Immunity", "Skincare", "Haircare",
];

const T = {
  bg: "#f4f6fb",
  surface: "#ffffff",
  card: "#ffffff",
  border: "rgba(99,102,241,0.12)",
  borderFoc: "rgba(99,102,241,0.5)",
  indigo: "#6366f1",
  indigoDark: "#4f46e5",
  indigoLight: "rgba(99,102,241,0.08)",
  indigoDim: "rgba(99,102,241,0.35)",
  text: "#1e1b4b",
  textMid: "#64748b",
  textDim: "#94a3b8",
  success: "#10b981",
  successBg: "rgba(16,185,129,0.08)",
  gold: "#f59e0b",
  goldBg: "rgba(245,158,11,0.08)",
  red: "#ef4444",
  redBg: "rgba(239,68,68,0.08)",
  shadow: "0 1px 3px rgba(99,102,241,0.08), 0 4px 16px rgba(99,102,241,0.06)",
  shadowMd: "0 4px 24px rgba(99,102,241,0.12), 0 1px 4px rgba(0,0,0,0.04)",
};

function Input({ name, value, onChange, placeholder, type = "text", style = {} }) {
  const [foc, setFoc] = useState(false);
  return (
    <input
      name={name} value={value} onChange={onChange}
      placeholder={placeholder} type={type}
      onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
      style={{
        width: "100%", boxSizing: "border-box", padding: "10px 14px",
        borderRadius: 10, fontSize: 13.5, fontFamily: "inherit",
        background: foc ? "#ffffff" : "#f8faff", color: T.text,
        border: `1.5px solid ${foc ? T.borderFoc : T.border}`, outline: "none",
        transition: "all 0.2s", boxShadow: foc ? `0 0 0 3px rgba(99,102,241,0.1)` : "none",
        ...style,
      }}
    />
  );
}

function Textarea({ name, value, onChange, placeholder, rows = 4 }) {
  const [foc, setFoc] = useState(false);
  return (
    <textarea
      name={name} value={value} onChange={onChange}
      placeholder={placeholder} rows={rows}
      onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
      style={{
        width: "100%", boxSizing: "border-box", padding: "10px 14px",
        borderRadius: 10, fontSize: 13.5, fontFamily: "inherit",
        background: foc ? "#ffffff" : "#f8faff", color: T.text,
        border: `1.5px solid ${foc ? T.borderFoc : T.border}`, outline: "none",
        transition: "all 0.2s", resize: "vertical", lineHeight: 1.6,
        boxShadow: foc ? `0 0 0 3px rgba(99,102,241,0.1)` : "none",
      }}
    />
  );
}

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 6, color: T.textMid, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
        {hint && <span style={{ fontWeight: 400, color: T.textDim, marginLeft: 6, fontSize: 11, textTransform: "none" }}>{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, marginBottom: 20, overflow: "hidden", boxShadow: T.shadow }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderBottom: `1px solid ${T.border}`, background: "linear-gradient(to right, #fafbff, #ffffff)" }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: T.indigoLight, border: `1px solid rgba(99,102,241,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {icon}
        </div>
        <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: T.text }}>{title}</h2>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

function IngTag({ label, onRemove }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: T.indigoLight, border: `1px solid rgba(99,102,241,0.2)`, color: T.indigoDark, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 500 }}>
      {label}
      <button type="button" onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: T.indigoDim, padding: 0, lineHeight: 1, display: "flex" }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </span>
  );
}

function BenRow({ text, onRemove }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderRadius: 9, marginBottom: 6, background: "#f8faff", border: `1px solid ${T.border}` }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.successBg, border: `1px solid rgba(16,185,129,0.25)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.success} strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
      </div>
      <span style={{ flex: 1, fontSize: 13, color: T.text }}>{text}</span>
      <button type="button" onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: T.textDim, padding: 0, display: "flex" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export default function AdminEditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products1 } = useSelector((state) => state.admin);
  const existingProduct = products1?.find((p) => p._id === id);

  const [formData, setFormData] = useState({
    name: "", price: "", originalPrice: "", category: "", stock: "",
    description: "", longDescription: "", ingredients: "", benefits: "",
    itemsSold: "", viewersCount: "",
  });

  // ✅ imageItems — har image ka poora record:
  // Existing: { type: "existing", url: string, public_id: string, deleted: false }
  // New:      { type: "new",      url: string, file: File }
  const [imageItems, setImageItems] = useState([]);

  const [step, setStep] = useState(0);
  const [newIng, setNewIng] = useState("");
  const [newBen, setNewBen] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!products1 || products1.length === 0) dispatch(fetchAdminProducts());
  }, []);

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name || "",
        price: existingProduct.price || "",
        originalPrice: existingProduct.originalPrice || "",
        category: existingProduct.category || "",
        stock: existingProduct.stock || "",
        description: existingProduct.description || "",
        longDescription: existingProduct.longDescription || "",
        ingredients: Array.isArray(existingProduct.ingredients)
          ? existingProduct.ingredients.join(", ")
          : existingProduct.ingredients || "",
        benefits: Array.isArray(existingProduct.benefits)
          ? existingProduct.benefits.join("\n")
          : existingProduct.benefits || "",
        itemsSold: existingProduct.itemsSold || "",
        viewersCount: existingProduct.viewersCount || "",
      });

      // ✅ Existing images load karo — public_id bhi store karo
      setImageItems(
        existingProduct.image?.map((img) => ({
          type: "existing",
          url: img.url,
          public_id: img.public_id,
          deleted: false,
        })) || []
      );
    }
  }, [existingProduct]);

  const ingList = formData.ingredients
    ? formData.ingredients.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const benList = formData.benefits
    ? formData.benefits.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const addIng = () => {
    if (!newIng.trim()) return;
    setFormData((p) => ({ ...p, ingredients: [...ingList, newIng.trim()].join(", ") }));
    setNewIng("");
  };
  const removeIng = (i) => setFormData((p) => ({ ...p, ingredients: ingList.filter((_, idx) => idx !== i).join(", ") }));

  const addBen = () => {
    if (!newBen.trim()) return;
    setFormData((p) => ({ ...p, benefits: [...benList, newBen.trim()].join("\n") }));
    setNewBen("");
  };
  const removeBen = (i) => setFormData((p) => ({ ...p, benefits: benList.filter((_, idx) => idx !== i).join("\n") }));

  // ✅ Nayi files add karo
  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageItems((prev) => [
          ...prev,
          { type: "new", url: reader.result, file },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // ✅ Image remove/delete:
  // - "new" type → seedha array se hata do
  // - "existing" type → deleted: true mark karo (cloudinary se backend delete karega)
  const removeImg = (i) => {
    setImageItems((prev) =>
      prev.map((item, idx) => {
        if (idx !== i) return item;
        if (item.type === "new") return null; // new image seedha hata do
        return { ...item, deleted: true }; // existing ko deleted mark karo
      }).filter(Boolean)
    );
  };

  // ✅ Deleted existing image ko undo karo
  const undoDelete = (i) => {
    setImageItems((prev) =>
      prev.map((item, idx) =>
        idx === i ? { ...item, deleted: false } : item
      )
    );
  };

  // Visible images (deleted nahi hain) — preview ke liye
  const visibleItems = imageItems.filter((item) => !item.deleted);

  // Deleted existing images ke public_ids — backend ko bhejna hai
  const deletedPublicIds = imageItems
    .filter((item) => item.type === "existing" && item.deleted)
    .map((item) => item.public_id);

  // Nayi files jo upload karni hain
  const newFiles = imageItems
    .filter((item) => item.type === "new")
    .map((item) => item.file);

  const handleUpdate = async () => {
    if (step !== STEPS.length - 1) return;

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

    // ✅ Deleted image IDs backend ko bhejo
    fd.append("deletedImageIds", JSON.stringify(deletedPublicIds));

    // ✅ Sirf nayi files bhejo
    newFiles.forEach((file) => fd.append("images", file));

    setLoading(true);

    try {
      await dispatch(updateProduct({ id, formData: fd })).unwrap();
      setSubmitted(true);
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch (err) {
      console.error("Update failed:", err);
      setLoading(false);
    }
  };

  const discount =
    formData.originalPrice && formData.price
      ? Math.round(((+formData.originalPrice - +formData.price) / +formData.originalPrice) * 100)
      : 0;

  const completionFields = [
    formData.name, formData.price, formData.originalPrice, formData.category,
    formData.stock, formData.description, formData.longDescription,
    formData.ingredients, formData.benefits, visibleItems.length ? "ok" : "",
  ];
  const completion = Math.round((completionFields.filter(Boolean).length / completionFields.length) * 100);

  const ico = (path, color = T.indigo) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {path}
    </svg>
  );

  if (!existingProduct) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: `3px solid ${T.border}`, borderTopColor: T.indigo, animation: "spin 0.8s linear infinite" }} />
        <span style={{ color: T.textMid, fontSize: 14 }}>Loading product...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'DM Sans', system-ui, sans-serif", color: T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        ::placeholder { color: #cbd5e1 !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.2); border-radius: 10px; }
        select option { background: #fff; color: #1e1b4b; }
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Top Bar */}
      <div style={{ background: "#ffffff", borderBottom: `1px solid ${T.border}`, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58, position: "sticky", top: 0, zIndex: 20, boxShadow: "0 1px 0 rgba(99,102,241,0.06), 0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button type="button" onClick={() => navigate("/admin/products")}
            style={{ background: "#f8faff", border: `1px solid ${T.border}`, borderRadius: 9, padding: "6px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: T.textMid, fontSize: 12.5, fontWeight: 500, transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = T.indigo; e.currentTarget.style.borderColor = T.borderFoc; e.currentTarget.style.background = T.indigoLight; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = T.textMid; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = "#f8faff"; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back
          </button>
          <div style={{ width: 1, height: 22, background: T.border }} />
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(99,102,241,0.3)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: T.text, lineHeight: 1.2 }}>Edit Product</div>
              <div style={{ fontSize: 11, color: T.textDim }}>{existingProduct?.name || ""}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {STEPS.map((label, i) => {
            const done = i < step, active = i === step;
            return (
              <button key={i} type="button" onClick={() => setStep(i)} style={{ padding: "5px 14px", borderRadius: 7, fontSize: 11.5, fontWeight: 600, cursor: "pointer", border: `1px solid ${active ? "rgba(99,102,241,0.4)" : done ? "rgba(99,102,241,0.15)" : T.border}`, background: active ? T.indigoLight : done ? "rgba(99,102,241,0.04)" : "transparent", color: active ? T.indigo : done ? "rgba(99,102,241,0.6)" : T.textDim, transition: "all 0.2s" }}>
                {done ? "✓ " : `${i + 1}. `}{label}
              </button>
            );
          })}
        </div>

        <div style={{ background: T.indigoLight, border: `1px solid rgba(99,102,241,0.2)`, borderRadius: 8, padding: "4px 12px", fontSize: 12, color: T.indigo, fontWeight: 600 }}>
          Step {step + 1} / {STEPS.length}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* Progress stepper */}
        <div style={{ marginBottom: 24, background: "#ffffff", border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 24px", boxShadow: T.shadow }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {STEPS.map((label, i) => {
              const done = i < step, active = i === step;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, flex: i < STEPS.length - 1 ? "1" : "0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, background: done ? T.successBg : active ? T.indigoLight : "#f1f5f9", border: `2px solid ${done ? T.success : active ? T.indigo : "#e2e8f0"}`, color: done ? T.success : active ? T.indigo : T.textDim, boxShadow: active ? `0 0 0 4px rgba(99,102,241,0.1)` : "none", transition: "all 0.3s" }}>
                      {done ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.success} strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg> : i + 1}
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: active ? 600 : 400, color: active ? T.text : done ? T.success : T.textDim, whiteSpace: "nowrap" }}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, borderRadius: 2, minWidth: 20, background: done ? "linear-gradient(to right, rgba(16,185,129,0.4), rgba(16,185,129,0.2))" : "#e2e8f0", transition: "background 0.3s" }} />}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 310px", gap: 24, alignItems: "start" }}>
            <div>

              {/* STEP 0 */}
              {step === 0 && (
                <>
                  <Card title="Basic Information" icon={ico(<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3H8" /></>)}>
                    <Field label="Product Name">
                      <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Ashwagandha Root Extract 500mg" />
                    </Field>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                      <Field label="Sale Price" hint="₹"><Input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="499" /></Field>
                      <Field label="MRP" hint="₹"><Input name="originalPrice" type="number" value={formData.originalPrice} onChange={handleChange} placeholder="799" /></Field>
                      <Field label="Stock"><Input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="100" /></Field>
                    </div>
                    <Field label="Category">
                      <select name="category" value={formData.category} onChange={handleChange} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 13.5, background: "#f8faff", color: T.text, border: `1.5px solid ${T.border}`, outline: "none", fontFamily: "inherit", cursor: "pointer" }}>
                        <option value="">Select category...</option>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                    {discount > 0 && (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.goldBg, border: "1px solid rgba(245,158,11,0.25)", borderRadius: 9, padding: "8px 14px", marginTop: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2" strokeLinecap="round"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg>
                        <span style={{ color: T.gold, fontWeight: 700, fontSize: 13 }}>{discount}% discount applied</span>
                      </div>
                    )}
                  </Card>
                  <Card title="Social Proof" icon={ico(<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>)}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <Field label="Items Sold" hint="shown on storefront"><Input name="itemsSold" type="number" value={formData.itemsSold} onChange={handleChange} placeholder="0" /></Field>
                      <Field label="Current Viewers" hint="shown on storefront"><Input name="viewersCount" type="number" value={formData.viewersCount} onChange={handleChange} placeholder="0" /></Field>
                    </div>
                  </Card>
                </>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <Card title="Product Description" icon={ico(<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>)}>
                  <Field label="Short Description" hint="shown in product cards">
                    <Input name="description" value={formData.description} onChange={handleChange} placeholder="Brief, compelling one-liner about the product" />
                  </Field>
                  <Field label="Detailed Description" hint="shown on product detail page">
                    <Textarea name="longDescription" value={formData.longDescription} onChange={handleChange} placeholder="Full explanation — science, target audience, unique selling points..." rows={7} />
                  </Field>
                </Card>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <Card title="Key Ingredients" icon={ico(<><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" /></>)}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 16, minHeight: 36 }}>
                      {ingList.map((ing, i) => <IngTag key={i} label={ing} onRemove={() => removeIng(i)} />)}
                      {!ingList.length && <span style={{ color: T.textDim, fontSize: 12, fontStyle: "italic" }}>No ingredients added yet.</span>}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <input value={newIng} onChange={(e) => setNewIng(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addIng(); } }}
                        placeholder="Type ingredient and press Enter..."
                        style={{ flex: 1, padding: "10px 14px", borderRadius: 10, fontSize: 13, fontFamily: "inherit", background: "#f8faff", color: T.text, border: `1.5px solid ${T.border}`, outline: "none" }}
                      />
                      <button type="button" onClick={addIng} style={{ padding: "10px 18px", borderRadius: 10, fontSize: 12, fontWeight: 600, background: T.indigoLight, border: `1px solid rgba(99,102,241,0.25)`, color: T.indigo, cursor: "pointer", whiteSpace: "nowrap" }}>+ Add</button>
                    </div>
                  </Card>
                  <Card title="Product Benefits" icon={ico(<><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>, T.success)}>
                    <div style={{ marginBottom: 14 }}>
                      {benList.map((b, i) => <BenRow key={i} text={b} onRemove={() => removeBen(i)} />)}
                      {!benList.length && <p style={{ color: T.textDim, fontSize: 12, fontStyle: "italic" }}>No benefits added yet.</p>}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <input value={newBen} onChange={(e) => setNewBen(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addBen(); } }}
                        placeholder="e.g. Supports bone density"
                        style={{ flex: 1, padding: "10px 14px", borderRadius: 10, fontSize: 13, fontFamily: "inherit", background: "#f8faff", color: T.text, border: `1.5px solid ${T.border}`, outline: "none" }}
                      />
                      <button type="button" onClick={addBen} style={{ padding: "10px 18px", borderRadius: 10, fontSize: 12, fontWeight: 600, background: T.successBg, border: `1px solid rgba(16,185,129,0.25)`, color: T.success, cursor: "pointer", whiteSpace: "nowrap" }}>+ Add</button>
                    </div>
                  </Card>
                </>
              )}

              {/* STEP 3 — Image Manager */}
              {step === 3 && (
                <Card title="Product Images" icon={ico(<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>)}>

                  {/* ✅ Summary banner */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                    <div style={{ background: T.indigoLight, border: `1px solid rgba(99,102,241,0.15)`, borderRadius: 8, padding: "7px 12px", fontSize: 12, color: T.indigoDark, display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.indigo} strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                      <strong>{visibleItems.length}</strong> image{visibleItems.length !== 1 ? "s" : ""} total
                    </div>
                    {newFiles.length > 0 && (
                      <div style={{ background: T.successBg, border: `1px solid rgba(16,185,129,0.2)`, borderRadius: 8, padding: "7px 12px", fontSize: 12, color: "#065f46", display: "flex", alignItems: "center", gap: 6 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.success} strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /></svg>
                        <strong>{newFiles.length}</strong> new will upload
                      </div>
                    )}
                    {deletedPublicIds.length > 0 && (
                      <div style={{ background: T.redBg, border: `1px solid rgba(239,68,68,0.2)`, borderRadius: 8, padding: "7px 12px", fontSize: 12, color: "#991b1b", display: "flex", alignItems: "center", gap: 6 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.red} strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /></svg>
                        <strong>{deletedPublicIds.length}</strong> will be deleted
                      </div>
                    )}
                  </div>

                  {/* Upload area */}
                  <label
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                    style={{ display: "block", border: `2px dashed ${dragOver ? T.indigo : "rgba(99,102,241,0.25)"}`, borderRadius: 14, padding: "30px 24px", textAlign: "center", cursor: "pointer", background: dragOver ? T.indigoLight : "#fafbff", transition: "all 0.2s", marginBottom: 20 }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: T.indigoLight, border: `1px solid rgba(99,102,241,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.indigo} strokeWidth="1.8" strokeLinecap="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <p style={{ fontWeight: 600, color: T.text, margin: "0 0 4px", fontSize: 13.5 }}>Drop new images here or click to browse</p>
                    <p style={{ color: T.textDim, fontSize: 11.5, margin: 0 }}>PNG, JPG — new images will be added alongside existing ones</p>
                    <input type="file" multiple accept="image/*" onChange={(e) => handleFiles(e.target.files)} style={{ display: "none" }} />
                  </label>

                  {/* ✅ All images grid — existing + new + deleted (with undo) */}
                  {imageItems.length > 0 && (
                    <>
                      <p style={{ fontWeight: 600, color: T.textMid, fontSize: 12, marginBottom: 12 }}>
                        Manage Images — click ✕ to remove, click ↩ to restore
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(115px, 1fr))", gap: 10 }}>
                        {imageItems.map((item, i) => {
                          const isDeleted = item.deleted;
                          const isFirst = visibleItems[0] === item;

                          return (
                            <div key={i} style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: isDeleted ? `2px solid ${T.red}` : isFirst ? `2px solid ${T.indigo}` : `1px solid ${T.border}`, boxShadow: isDeleted ? `0 0 0 3px rgba(239,68,68,0.1)` : isFirst ? `0 0 0 3px rgba(99,102,241,0.1)` : "none", opacity: isDeleted ? 0.5 : 1, transition: "all 0.2s" }}>

                              {/* Primary badge */}
                              {isFirst && !isDeleted && (
                                <div style={{ position: "absolute", top: 5, left: 5, background: T.indigo, color: "white", fontSize: 8, fontWeight: 700, borderRadius: 4, padding: "2px 6px", zIndex: 2, letterSpacing: "0.05em" }}>PRIMARY</div>
                              )}

                              {/* NEW badge */}
                              {item.type === "new" && (
                                <div style={{ position: "absolute", bottom: 5, left: 5, background: T.success, color: "white", fontSize: 8, fontWeight: 700, borderRadius: 4, padding: "2px 6px", zIndex: 2 }}>NEW</div>
                              )}

                              {/* DELETED overlay */}
                              {isDeleted && (
                                <div style={{ position: "absolute", inset: 0, background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
                                  <span style={{ fontSize: 10, fontWeight: 700, color: T.red, background: "white", borderRadius: 6, padding: "3px 8px" }}>WILL DELETE</span>
                                </div>
                              )}

                              <img src={item.url} alt="" style={{ width: "100%", height: 105, objectFit: "cover", display: "block" }} />

                              {/* Action button — X or Undo */}
                              {isDeleted ? (
                                // ✅ Undo button
                                <button type="button" onClick={() => undoDelete(i)} style={{ position: "absolute", top: 5, right: 5, background: T.red, color: "#fff", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", padding: 0, zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }} title="Restore image">
                                  ↩
                                </button>
                              ) : (
                                // ✅ Delete button
                                <button type="button" onClick={() => removeImg(i)} style={{ position: "absolute", top: 5, right: 5, background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", padding: 0, zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </Card>
              )}

              {/* Nav Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <button type="button" onClick={() => setStep((p) => Math.max(0, p - 1))} disabled={step === 0} style={{ padding: "10px 22px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: step === 0 ? "not-allowed" : "pointer", background: "white", border: `1.5px solid ${step === 0 ? T.border : "#e2e8f0"}`, color: step === 0 ? T.textDim : T.textMid, transition: "all 0.2s", boxShadow: step === 0 ? "none" : T.shadow }}>
                  ← Back
                </button>

                {step < STEPS.length - 1 ? (
                  <button type="button" onClick={() => setStep((p) => Math.min(STEPS.length - 1, p + 1))}
                    style={{ padding: "10px 26px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", color: "white", transition: "all 0.2s", boxShadow: "0 4px 14px rgba(99,102,241,0.35)" }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.5)"}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 14px rgba(99,102,241,0.35)"}
                  >Continue →</button>
                ) : (
                  <button type="button" onClick={handleUpdate} disabled={loading || submitted}
                    style={{ padding: "11px 28px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: (loading || submitted) ? "default" : "pointer", background: submitted ? T.successBg : loading ? "rgba(99,102,241,0.6)" : "linear-gradient(135deg, #6366f1, #8b5cf6)", border: submitted ? `1px solid rgba(16,185,129,0.3)` : "none", color: submitted ? T.success : "white", boxShadow: (loading || submitted) ? "none" : "0 4px 14px rgba(99,102,241,0.35)", transition: "all 0.3s", display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {loading && !submitted && <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", animation: "spin 0.7s linear infinite" }} />}
                    {submitted ? "✓ Product Updated!" : loading ? "Updating..." : "✏️ Update Product"}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT: Live Preview */}
            <div style={{ position: "sticky", top: 76 }}>
              <div style={{ background: "#ffffff", border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden", boxShadow: T.shadowMd }}>
                <div style={{ background: "#f8faff", padding: "10px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    {["#ff6b6b", "#ffd93d", "#6bcb77"].map((c, i) => <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
                  </div>
                  <div style={{ background: "white", border: `1px solid ${T.border}`, borderRadius: 6, padding: "3px 12px", fontSize: 10.5, color: T.textDim, display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.success }} />
                    Live Preview
                  </div>
                  <div style={{ width: 40 }} />
                </div>

                <div style={{ padding: 18 }}>
                  <div style={{ width: "100%", height: 175, borderRadius: 12, marginBottom: 14, overflow: "hidden", border: `1px solid ${T.border}`, background: visibleItems.length ? "transparent" : "#f8faff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {visibleItems.length ? (
                      <img src={visibleItems[0].url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.textDim} strokeWidth="1.5" strokeLinecap="round" style={{ margin: "0 auto 6px", display: "block" }}>
                          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                        </svg>
                        <p style={{ fontSize: 10, color: T.textDim, margin: 0 }}>No image</p>
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 5, background: T.indigoLight, color: T.indigo, border: `1px solid rgba(99,102,241,0.2)` }}>
                    {formData.category || "Category"}
                  </span>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: "8px 0 4px", lineHeight: 1.35 }}>{formData.name || "Product name will appear here"}</h3>
                  <p style={{ fontSize: 11, color: T.textMid, margin: "0 0 12px", lineHeight: 1.55 }}>{formData.description || "Short description appears here..."}</p>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: T.text }}>₹{formData.price || "—"}</span>
                    {formData.originalPrice && <span style={{ fontSize: 12, color: T.textDim, textDecoration: "line-through" }}>₹{formData.originalPrice}</span>}
                    {discount > 0 && <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 7px", borderRadius: 5, background: T.goldBg, color: T.gold, border: `1px solid rgba(245,158,11,0.25)` }}>{discount}% OFF</span>}
                  </div>

                  {benList.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      {benList.slice(0, 3).map((b, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T.success} strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                          <span style={{ fontSize: 11, color: T.textMid }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 10, padding: 10, textAlign: "center", fontWeight: 700, fontSize: 12, color: "white", cursor: "default", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
                    Add to Cart
                  </div>
                </div>

                <div style={{ padding: "0 18px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: T.textDim, fontWeight: 500 }}>Completion</span>
                    <span style={{ fontSize: 11, color: completion === 100 ? T.success : T.gold, fontWeight: 700 }}>{completion}%</span>
                  </div>
                  <div style={{ height: 5, background: "#f1f5f9", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 999, transition: "width 0.4s ease", width: `${completion}%`, background: completion === 100 ? `linear-gradient(90deg, ${T.success}, #34d399)` : `linear-gradient(90deg, ${T.indigo}, #a78bfa)` }} />
                  </div>
                  <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                    {[["Name", formData.name], ["Price", formData.price], ["Stock", formData.stock], ["Category", formData.category], ["Description", formData.description], ["Long Desc.", formData.longDescription], ["Ingredients", formData.ingredients], ["Benefits", formData.benefits], ["Images", visibleItems.length ? "ok" : ""]].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: v ? T.successBg : "#f1f5f9", border: `1.5px solid ${v ? "rgba(16,185,129,0.3)" : "#e2e8f0"}` }}>
                          {v && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={T.success} strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>}
                        </div>
                        <span style={{ fontSize: 10.5, color: v ? T.textMid : T.textDim }}>{k}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
