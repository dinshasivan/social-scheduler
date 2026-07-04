import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import LogoutConfirmModal from "../LogoutConfirmModal"; // adjust path to match where you saved it

export default function Navbar() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogoutConfirmed = () => {
        setShowLogoutModal(false);
        logout();
        setMenuOpen(false);
        navigate("/");
    };

    const navLinks = ["Features", "How it works", "Pricing"];

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-6">

                <Link
                    to="/"
                    onClick={() => scrollTo(0, 0)}
                    className="flex items-center gap-2.5 shrink-0"
                >
                    <div className="w-[34px] h-[34px] rounded-[9px] bg-[#185FA5] flex items-center justify-center">
                        <img src="/logo.svg" alt="logo" className="size-[17px] brightness-0 invert" />
                    </div>
                    <span className="text-[15px] font-medium text-slate-800">Scheduler</span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((label) => {
                        const href = "#" + label.toLowerCase().replace(/\s+/g, "-");
                        return (
                            <a key={label} href={href} className="text-[13.5px] text-slate-500 hover:text-[#185FA5] transition-colors">
                                {label}
                            </a>
                        );
                    })}
                </div>

                {user ? (
                    <div className="relative shrink-0" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="w-9 h-9 rounded-full bg-[#185FA5] text-white text-[14px] font-medium flex items-center justify-center hover:bg-[#0C447C] transition-colors"
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                                <div className="px-4 py-3 border-b border-slate-100">
                                    <p className="text-[13.5px] font-medium text-slate-800 truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-[12px] text-slate-400 truncate">
                                        {user.email}
                                    </p>
                                </div>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2 px-4 py-2.5 text-[13.5px] text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <LayoutDashboardIcon className="size-4" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setShowLogoutModal(true);
                                    }}
                                    className="w-full flex items-center gap-2 px-4 py-2.5 text-[13.5px] text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <LogOutIcon className="size-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-2 shrink-0">
                        <Link
                            to="/login"
                            className="hidden sm:block text-[13.5px] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-all"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#185FA5] hover:bg-[#0C447C] text-[#e6f1fb] text-[13.5px] font-medium transition-colors"
                        >
                            Get started
                            <ArrowRightIcon className="size-3.5" />
                        </Link>
                    </div>
                )}

            </div>

            {showLogoutModal && (
                <LogoutConfirmModal
                    onClose={() => setShowLogoutModal(false)}
                    onConfirm={handleLogoutConfirmed}
                />
            )}
        </nav>
    );
}