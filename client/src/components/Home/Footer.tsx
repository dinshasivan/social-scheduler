import { Link } from "react-router-dom";

const footerLinks = {
    Product: ["Features", "How it Works", "Pricing", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link
                            to="/"
                            onClick={() => scrollTo(0, 0)}
                            className="inline-flex items-center gap-3 mb-5"
                        >
                            <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md">
                                <img
                                    src="/logo.svg"
                                    alt="logo"
                                    className="size-5"
                                />
                            </div>

                            <span className="text-2xl font-bold text-slate-900">
                                Scheduler
                            </span>
                        </Link>

                        <p className="max-w-sm text-sm leading-relaxed text-slate-500">
                            The AI-powered social media scheduler that helps
                            creators, agencies, and businesses automate content,
                            manage accounts, and grow their audience faster.
                        </p>

                        <div className="mt-6 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                            <span className="text-sm text-slate-500">
                                All systems operational
                            </span>
                        </div>
                    </div>

                    {/* Footer Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
                                {category}
                            </h3>

                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-8">
                    <p className="text-sm text-slate-400">
                        © {new Date().getFullYear()} Scheduler. All rights
                        reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-sm text-slate-400 hover:text-blue-600 transition-colors"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="text-sm text-slate-400 hover:text-blue-600 transition-colors"
                        >
                            Terms of Service
                        </a>

                        <Link
                            to="/login"
                            className="text-sm text-slate-400 hover:text-blue-600 transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}