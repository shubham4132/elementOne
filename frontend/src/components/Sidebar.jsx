import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  MapPin,
  Settings,
  Heart,
  Scale,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: ShoppingBag, label: "Orders", href: "#" },
  { icon: Download, label: "Downloads", href: "#" },
  { icon: MapPin, label: "Addresses", href: "#" },
  { icon: Settings, label: "Account Details", href: "#" },
  { icon: Heart, label: "Wishlist", href: "#" },
  { icon: Scale, label: "Compare", href: "#" },
];

export default function Sidebar({ isOpen, onClose, user }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          h-full bg-white flex-shrink-0
          transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "w-64" : "w-0"}
        `}
        style={{ borderRight: "1px solid #f0f0f0" }}
      >
        <div className="flex flex-col h-full w-64">
          <div className="flex-1 overflow-y-auto">
            {/* User Profile */}
            <div className="p-6" style={{ borderBottom: "1px solid #f5f5f5" }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1B5E87] to-[#0f3d52] rounded-full flex items-center justify-center mb-4 shadow-md">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="font-bold text-sm text-gray-800 whitespace-nowrap">
                  {user?.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Menu */}
            <nav className="p-3 space-y-0.5">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === 0;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`
                      flex items-center gap-3 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap
                      ${
                        isActive
                          ? "text-[#1B5E87] font-semibold"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                      }
                    `}
                    style={
                      isActive
                        ? {
                            background: "rgba(27, 94, 135, 0.07)",
                            borderLeft: "2px solid rgba(27, 94, 135, 0.45)",
                            paddingLeft: "14px",
                            paddingRight: "16px",
                          }
                        : {
                            borderLeft: "2px solid transparent",
                            paddingLeft: "14px",
                            paddingRight: "16px",
                          }
                    }
                  >
                    <Icon
                      size={18}
                      className="flex-shrink-0"
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    <span className="text-sm">{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Logout — subtle top divider */}
          <div className="px-4 py-4" style={{ borderTop: "1px solid #f3f3f3" }}>
            <button
              className="w-full flex items-center justify-center gap-2 text-sm font-medium
              text-red-400 hover:text-white hover:bg-red-500
              border border-red-100 hover:border-red-500
              py-2.5 rounded-lg transition-all duration-200"
            >
              <LogOut size={16} strokeWidth={1.8} />
              Log out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
