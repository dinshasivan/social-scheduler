import { Link } from "react-router-dom";
import { ArrowRightIcon, DotIcon } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-50">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none" />

            {/* Blue Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-16 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-sm px-4 py-2 rounded-full mb-8">
                    <span className="size-2 bg-blue-500 rounded-full" />
                    AI-Powered Social Media Automation
                </div>

                {/* Heading */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight text-slate-900">
                    Schedule smarter.
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Grow faster.
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-8 text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
                    Create, schedule, and automate content across all your social
                    platforms. Generate captions with AI, manage multiple accounts,
                    and grow your audience from one powerful dashboard.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto"
                    >
                        Start for Free
                        <ArrowRightIcon className="size-4" />
                    </Link>

                    <a
                        href="#how-it-works"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-4 text-slate-700 font-medium transition hover:bg-slate-100 w-full sm:w-auto"
                    >
                        See How It Works
                    </a>
                </div>

                <p className="mt-5 text-sm text-slate-400">
                    No credit card required · Free forever plan available
                </p>
            </div>

            {/* Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                    {/* Browser Bar */}
                    <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-5 py-4">
                        <div className="h-3 w-3 rounded-full bg-red-400" />
                        <div className="h-3 w-3 rounded-full bg-amber-400" />
                        <div className="h-3 w-3 rounded-full bg-emerald-400" />

                        <div className="mx-auto h-8 w-64 rounded-lg bg-white border border-slate-200" />
                    </div>

                    {/* Dashboard Content */}
                    <div className="bg-slate-50 p-8">
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
                            {[
                                { val: "12", label: "Scheduled" },
                                { val: "48", label: "Published" },
                                { val: "4", label: "Accounts" },
                                { val: "3", label: "AI Rules" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                                >
                                    <div className="text-3xl font-bold text-slate-900">
                                        {item.val}
                                    </div>

                                    <div className="mt-1 text-sm text-slate-500">
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Activity Feed */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Recent Activity
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        text: "Post published to LinkedIn & Twitter",
                                        time: "2m ago",
                                    },
                                    {
                                        text: "AI generated 5 new captions",
                                        time: "15m ago",
                                    },
                                    {
                                        text: "New campaign scheduled for tomorrow",
                                        time: "1h ago",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.text}
                                        className="flex items-center gap-3"
                                    >
                                        <DotIcon className="size-5 text-blue-500" />

                                        <span className="flex-1 text-sm text-slate-600">
                                            {item.text}
                                        </span>

                                        <span className="text-xs text-slate-400">
                                            {item.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}