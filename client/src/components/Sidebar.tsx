import {
  CalendarDaysIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  UserIcon,
  Wand2Icon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { logout, user } = {
    logout: () => {
      window.location.href = "/";
    },
    user: {
      name: "Dinsha Sivan",
      email: "dinsha@example.com",
    },
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Accounts",
      path: "/accounts",
      icon: UserIcon,
    },
    {
      name: "Scheduler",
      path: "/scheduler",
      icon: CalendarDaysIcon,
    },
    {
      name: "AI Composer",
      path: "/ai-composer",
      icon: Wand2Icon,
    },
  ];

  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72
      bg-slate-950
      border-r border-slate-800
      shadow-2xl
      transform transition-transform duration-300
      md:relative md:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg">
            <img src="/logo.png" alt="Logo" className="size-6" />
          </div>

          <div>
            <h1 className="font-bold text-xl text-white">
              Scheduler
            </h1>

            <p className="text-xs text-slate-400">
              Social Media Manager
            </p>
          </div>
        </div>
      </div>

      {/* Menu Label */}
      <div className="px-6 py-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Navigation
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${
                  isActive
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/20 shadow-md"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <item.icon
                className={`size-5 shrink-0 transition-colors
                  ${
                    isActive
                      ? "text-blue-400"
                      : "text-slate-500 group-hover:text-white"
                  }`}
              />

              <span className="font-medium">{item.name}</span>

              {isActive && (
                <span className="ml-auto h-6 w-1.5 rounded-full bg-blue-500" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 border border-slate-700">
          <div className="size-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-md">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">
              {user?.name}
            </h3>

            <p className="text-xs text-slate-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl
          bg-slate-800 text-slate-300 border border-slate-700
          hover:bg-slate-700 hover:text-white
          transition-all duration-300"
        >
          <LogOutIcon className="size-4" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;