// src/Admin/component/AdminSidebar.jsx
import { NavLink } from "react-router-dom";

const MENU = [
  {
    group: "Overview",
    links: [
      {
        to: "/admin/dashboard",
        label: "Dashboard",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
      {
        to: "/admin/analytics",
        label: "Analytics",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "Products",
    links: [
      {
        to: "/admin/products/create",
        label: "Create Product",
        badge: "New",
        badgeColor: "#3d6b2c",
        badgeBg: "rgba(122,173,92,0.18)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        ),
      },
      {
        to: "/admin/products",
        label: "All Products",
        badge: "124",
        badgeColor: "rgba(181,201,154,0.4)",
        badgeBg: "rgba(181,201,154,0.06)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        ),
      },
      {
        to: "/admin/categories",
        label: "Categories",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "Sales",
    links: [
      {
        to: "/admin/orders",
        label: "Orders",
        badge: "8",
        badgeColor: "#e8a24a",
        badgeBg: "rgba(232,162,74,0.12)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        ),
      },
      {
        to: "/admin/customers",
        label: "All Customers",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
        ),
      },
      {
        to: "/admin/coupons",
        label: "Coupons",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "Manage",
    links: [
      {
        to: "/admin/reviews",
        label: "Reviews",
        badge: "3",
        badgeColor: "#5b9bd4",
        badgeBg: "rgba(91,155,212,0.12)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ),
      },
      {
        to: "/admin/settings",
        label: "Settings",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        ),
      },
    ],
  },
];

export default function AdminSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(5,12,8,0.7)", backdropFilter: "blur(2px)" }}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] flex flex-col overflow-hidden flex-shrink-0 transition-all duration-300 ease-in-out lg:relative lg:top-0 lg:h-full ${isOpen ? "w-[220px] translate-x-0" : "w-0 -translate-x-full lg:translate-x-0"}`}
        style={{
          background: "#0d1a10",
          borderRight: "1px solid rgba(167,197,139,0.1)",
        }}
      >
        <div className="min-w-[220px] flex flex-col h-full">
          <nav
            className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5"
            style={{ scrollbarWidth: "none" }}
          >
            {MENU.map((sec) => (
              <div key={sec.group}>
                <p
                  className="px-3 mb-1.5 text-[9px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: "rgba(167,197,139,0.25)" }}
                >
                  {sec.group}
                </p>
                <div className="space-y-0.5">
                  {sec.links.map((lnk) => (
                    <NavLink
                      key={lnk.to}
                      to={lnk.to}
                      end={lnk.to === "/admin/dashboard"}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className="group"
                      style={({ isActive }) => ({
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "9px 12px",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: isActive ? 600 : 500,
                        border: "1px solid",
                        borderColor: isActive
                          ? "rgba(122,173,92,0.2)"
                          : "transparent",
                        background: isActive
                          ? "rgba(122,173,92,0.1)"
                          : "transparent",
                        color: isActive ? "#a8d08a" : "rgba(181,201,154,0.4)",
                        transition: "all 0.15s ease",
                        position: "relative",
                        textDecoration: "none",
                      })}
                      onMouseEnter={(e) => {
                        if (!e.currentTarget.style.background.includes("0.1")) {
                          e.currentTarget.style.background =
                            "rgba(167,197,139,0.05)";
                          e.currentTarget.style.color = "rgba(181,201,154,0.8)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!e.currentTarget.classList.contains("active")) {
                          // handled by NavLink
                        }
                      }}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                              style={{ background: "#7aad5c" }}
                            />
                          )}
                          <span
                            style={{
                              color: isActive
                                ? "#7aad5c"
                                : "rgba(167,197,139,0.4)",
                              flexShrink: 0,
                              display: "flex",
                            }}
                          >
                            {lnk.icon}
                          </span>
                          <span className="flex-1 truncate">{lnk.label}</span>
                          {lnk.badge && (
                            <span
                              className="text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0"
                              style={{
                                color: lnk.badgeColor,
                                background: lnk.badgeBg,
                              }}
                            >
                              {lnk.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom: Back to store */}
          <div
            className="flex-shrink-0 p-3"
            style={{ borderTop: "1px solid rgba(167,197,139,0.08)" }}
          >
            <NavLink
              to="/"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all"
              style={{ color: "rgba(167,197,139,0.3)", textDecoration: "none" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(167,197,139,0.06)";
                e.currentTarget.style.color = "rgba(167,197,139,0.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(167,197,139,0.3)";
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Back to Store</span>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}
