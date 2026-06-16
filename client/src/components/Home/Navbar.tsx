import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

export default function Navbar() {
    const { user } = { user: false };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    onClick={() => scrollTo(0, 0)}
                    className="flex items-center gap-3"
                >
                    <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md">
                        <img
                            src="/logo.svg"
                            alt="logo"
                            className="size-5"
                        />
                    </div>

                    <span className="text-xl lg:text-2xl font-bold text-slate-900">
                        Scheduler
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a
                        href="#features"
                        className="text-slate-500 transition-colors hover:text-blue-600"
                    >
                        Features
                    </a>

                    <a
                        href="#how-it-works"
                        className="text-slate-500 transition-colors hover:text-blue-600"
                    >
                        How It Works
                    </a>

                    <a
                        href="#pricing"
                        className="text-slate-500 transition-colors hover:text-blue-600"
                    >
                        Pricing
                    </a>
                </div>

                {/* Actions */}
                {user ? (
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                        Go to Dashboard
                        <ArrowRightIcon className="size-4" />
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="hidden sm:block text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                        >
                            Sign In
                        </Link>

                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
                        >
                            Get Started
                            <ArrowRightIcon className="size-4" />
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}