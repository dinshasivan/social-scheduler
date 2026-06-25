import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router";
import {
  MenuIcon,
  BellIcon,
  SearchIcon,
} from "lucide-react";

const pageTitle: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/accounts": "Accounts",
  "/scheduler": "Scheduler",
  "/ai-composer": "AI Composer",
};

interface StoredUser {
  id?: string;
  name?: string;
  email?: string;
}

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const title = pageTitle[location.pathname] || "Overview";

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAvatarMenuOpen(false);
    navigate("/");
  };

  const initial = user?.name?.trim()
    ? user.name.trim().charAt(0).toUpperCase()
    : "?";

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        isOpen={isMobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon className="size-6" />
            </button>

            {/* Page Title */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {title}
              </h1>

              <p className="hidden sm:block text-sm text-slate-500">
                Manage and automate your social media presence
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition">
              <SearchIcon className="size-5" />
            </button>

            {/* Notifications */}
            <button className="relative h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition">
              <BellIcon className="size-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500" />
            </button>

            {/* User Avatar */}
            <div className="relative">
              <button
                onClick={() => setAvatarMenuOpen((prev) => !prev)}
                className="h-10 w-10 rounded-full bg-[#185FA5] flex items-center justify-center text-white font-semibold shadow-md hover:bg-[#0C447C] transition"
              >
                {initial}
              </button>

              {avatarMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-[13.5px] font-medium text-slate-800 truncate">
                      {user?.name}
                    </p>
                    <p className="text-[12px] text-slate-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-[13.5px] text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;