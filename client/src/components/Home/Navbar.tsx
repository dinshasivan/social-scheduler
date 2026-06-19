import { Link } from "react-router-dom";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";

export default function Navbar() {
    const { user } = { user: false };

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-6">

                {/* Logo */}
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

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-6">
                    {["Features", "How it works", "Pricing"].map((label) => (
                        <a
                            key={label}
                            href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-[13.5px] text-slate-500 hover:text-[#185FA5] transition-colors"
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                {user ? (
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#185FA5] hover:bg-[#0C447C] text-[#e6f1fb] text-[13.5px] font-medium transition-colors shrink-0"
                    >
                        Go to dashboard
                        <ArrowRightIcon className="size-3.5" />
                    </Link>
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
        </nav>
    );
}