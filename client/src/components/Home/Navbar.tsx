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
            <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-10 h-[74px] flex items-center justify-between gap-8">

                <Link
                    to="/"
                    onClick={() => scrollTo(0, 0)}
                    className="flex items-center gap-3 shrink-0"
                >
                    <div className="w-11 h-11 rounded-xl bg-[#185FA5] flex items-center justify-center">
                        <img src="/logo.svg" alt="logo" className="size-5 brightness-0 invert" />
                    </div>
                    <span className="text-[19px] font-medium text-slate-800">Scheduler</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((label) => {
                        const href = "#" + label.toLowerCase().replace(/\s+/g, "-");
                        return (
                            <a key={label} href={href} className="text-[17px] text-slate-500 hover:text-[#185FA5] transition-colors">
                                {label}
                            </a>
                        );
                    })}
                </div>

                {user ? (
                    <div className="relative shrink-0" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="w-12 h-12 rounded-full bg-[#185FA5] text-white text-[16px] font-medium flex items-center justify-center hover:bg-[#0C447C] transition-colors"
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2.5 w-68 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                                <div className="px-5 py-4 border-b border-slate-100">
                                    <p className="text-[17px] font-medium text-slate-800 truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-[15px] text-slate-400 truncate">
                                        {user.email}
                                    </p>
                                </div>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-6 py-4 text-[17px] text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <LayoutDashboardIcon className="size-[20px]" />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setShowLogoutModal(true);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-6 py-4 text-[17px] text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <LogOutIcon className="size-[20px]" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            to="/login"
                            className="hidden sm:block text-[17px] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-5 py-3 rounded-lg transition-all"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#185FA5] hover:bg-[#0C447C] text-[#e6f1fb] text-[17px] font-medium transition-colors"
                        >
                            Get started
                            <ArrowRightIcon className="size-5" />
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