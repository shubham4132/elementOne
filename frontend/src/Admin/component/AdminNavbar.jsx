// src/Admin/component/AdminNavbar.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/user/userSlice";

export default function AdminNavbar({ onMenuClick, sidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.user);
  const [drop, setDrop] = useState(false);

  return (
    <header
      className="h-16 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 z-50 relative"
      style={{
        background: "#0f1f14",
        borderBottom: "1px solid rgba(167,197,139,0.12)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #7aad5c, #b5c99a, #7aad5c, transparent)",
        }}
      />

      {/* LEFT: toggle + brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{
            background: "rgba(167,197,139,0.08)",
            border: "1px solid rgba(167,197,139,0.15)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(167,197,139,0.16)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(167,197,139,0.08)")
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(181,201,154,0.8)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {sidebarOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>

        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #3d6b2c 0%, #7aad5c 100%)",
              boxShadow: "0 4px 14px rgba(122,173,92,0.25)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3C7 3 3 7.5 3 12s4.5 9 9 9 9-4 9-9c0-2-0.5-3.5-1.5-5"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 7c0 0 2 1.5 2 5s-2 5-2 5"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 7c0 0-2 1.5-2 5s2 5 2 5"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M8 12h8"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="hidden sm:block">
            <p
              className="font-bold text-sm leading-none"
              style={{ color: "#dcecd0", letterSpacing: "-0.01em" }}
            >
              AyurAdmin
            </p>
            <p
              className="text-[9px] font-semibold mt-0.5 tracking-widest uppercase"
              style={{ color: "rgba(181,201,154,0.45)" }}
            >
              Control Panel
            </p>
          </div>
        </div>
      </div>

      {/* CENTER: search */}
      <div
        className="hidden md:flex items-center gap-2.5 rounded-xl px-4 h-9 w-72 transition-all"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(167,197,139,0.12)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "rgba(122,173,92,0.4)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "rgba(167,197,139,0.12)")
        }
      >
        <svg
          width="13"
          height="13"
          fill="none"
          stroke="rgba(167,197,139,0.4)"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="flex-shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          placeholder="Search products, orders..."
          className="bg-transparent flex-1 min-w-0 text-sm focus:outline-none"
          style={{ color: "rgba(220,236,208,0.65)", caretColor: "#7aad5c" }}
        />
        <span
          className="text-[10px] px-1.5 py-0.5 rounded font-mono"
          style={{
            color: "rgba(167,197,139,0.3)",
            background: "rgba(167,197,139,0.06)",
            border: "1px solid rgba(167,197,139,0.1)",
          }}
        >
          ⌘K
        </span>
      </div>

      {/* RIGHT: bell + profile */}
      <div className="flex items-center gap-2">
        {/* Bell */}
        <button
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(167,197,139,0.12)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(167,197,139,0.08)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
          }
        >
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="rgba(181,201,154,0.55)"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
              strokeLinecap="round"
            />
          </svg>
          <span
            className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
            style={{ background: "#e8a24a" }}
          />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDrop((p) => !p)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 transition-all"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(167,197,139,0.12)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(122,173,92,0.3)")
            }
            onMouseLeave={(e) =>
              !drop &&
              (e.currentTarget.style.borderColor = "rgba(167,197,139,0.12)")
            }
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(61,107,44,0.6), rgba(122,173,92,0.4))",
                border: "1px solid rgba(122,173,92,0.25)",
                color: "#b5c99a",
              }}
            >
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="hidden sm:block text-left">
              <p
                className="text-xs font-semibold leading-none"
                style={{ color: "rgba(220,236,208,0.8)" }}
              >
                {user?.name || "Admin"}
              </p>
              <p
                className="text-[10px] mt-0.5"
                style={{ color: "rgba(122,173,92,0.55)" }}
              >
                Administrator
              </p>
            </div>
            <svg
              width="10"
              height="10"
              fill="none"
              stroke="rgba(181,201,154,0.3)"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              className={`transition-transform duration-200 ${drop ? "rotate-180" : ""}`}
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {drop && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDrop(false)}
              />
              <div
                className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden z-50"
                style={{
                  background: "#122018",
                  border: "1px solid rgba(167,197,139,0.15)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(167,197,139,0.08)" }}
                >
                  <p
                    className="text-[11px] font-medium truncate"
                    style={{ color: "rgba(181,201,154,0.45)" }}
                  >
                    {user?.email || "admin@ayur.com"}
                  </p>
                </div>
                <div className="p-1.5">
                  <button
                    onClick={() => {
                      navigate("/admin/settings");
                      setDrop(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left"
                    style={{ color: "rgba(181,201,154,0.6)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(167,197,139,0.07)";
                      e.currentTarget.style.color = "rgba(181,201,154,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(181,201,154,0.6)";
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path
                        d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"
                        strokeLinecap="round"
                      />
                    </svg>
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      navigate("/");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left mt-0.5"
                    style={{ color: "rgba(220,100,80,0.7)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(220,100,80,0.08)";
                      e.currentTarget.style.color = "rgba(220,100,80,1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(220,100,80,0.7)";
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
