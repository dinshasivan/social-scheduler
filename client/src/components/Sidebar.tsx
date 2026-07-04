import { useState } from "react";
import {
  CalendarDaysIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  UserIcon,
  Wand2Icon,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutConfirmModal from "./LogoutConfirmModal";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboardIcon },
    { name: "Accounts", path: "/accounts", icon: UserIcon },
    { name: "Scheduler", path: "/scheduler", icon: CalendarDaysIcon },
    { name: "AI Composer", path: "/ai-composer", icon: Wand2Icon },
  ];

  const handleLogoutConfirmed = () => {
    setShowLogoutModal(false);
    logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-50 w-60
        flex flex-col h-full
        bg-[#0c1220] border-r border-[#1e2d45]
        transform transition-transform duration-300
        md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo */}
      <Link
        to="/"
        onClick={() => scrollTo(0, 0)}
        className="flex items-center gap-2.5 shrink-0"
      >
        <div className="flex items-center gap-2.5 px-5 py-[18px] border-b border-[#1e2d45] flex-shrink-0">
          <div className="w-8 h-8 rounded-[8px] bg-[#185FA5] flex items-center justify-center flex-shrink-0">
            <img src="/logo.svg" alt="Logo" className="size-4 brightness-0 invert" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#f0f4ff]">Scheduler</p>
            <p className="text-[11px] text-[#4a5f7a]">Social media manager</p>
          </div>
        </div>
      </Link>

      {/* Nav label */}
      <p className="px-5 pt-3.5 pb-1.5 text-[10px] font-medium uppercase tracking-widest text-[#3a5070] flex-shrink-0">
        Menu
      </p>

      {/* Nav links */}
      <nav className="flex-1 px-2.5 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-2.5 px-3.5 py-2.5 rounded-[9px]
                text-[13px] font-medium transition-all duration-200
                ${isActive
                  ? "bg-[#0d2040] text-[#85b7eb] border border-[#185FA533]"
                  : "text-[#6a85a8] hover:bg-[#131f30] hover:text-[#a8c0dc]"
                }
              `}
            >
              <item.icon className={`size-4 shrink-0 ${isActive ? "text-[#85b7eb]" : "text-[#4a5f7a]"}`} />
              <span>{item.name}</span>
              {isActive && (
                <span className="ml-auto w-1 h-[18px] rounded-full bg-[#378ADD]" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="flex-shrink-0 p-3 border-t border-[#1e2d45] bg-[#090f1a] flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 p-2.5 rounded-[9px] bg-[#0f1e35] border border-[#1e2d45]">
          <div className="w-[34px] h-[34px] rounded-full bg-[#185FA5] flex items-center justify-center text-[13px] font-medium text-[#85b7eb] flex-shrink-0">
            {user?.name?.trim() ? user.name.trim().charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-[#c8d8f0] truncate">{user?.name}</p>
            <p className="text-[11px] text-[#3a5070] truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[9px] bg-[#0f1e35] border 
          border-[#1e2d45] text-[13px] font-medium text-[#4a6080] hover:bg-[#131f30] hover:text-[#85b7eb] transition-all duration-200"
        >
          <LogOutIcon className="size-3.5" />
          Sign out
        </button>
      </div>

      {showLogoutModal && (
        <LogoutConfirmModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirmed}
        />
      )}
    </div>
  );
};

export default Sidebar;