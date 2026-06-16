import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <div
                    className="relative overflow-hidden rounded-3xl p-14 sm:p-20 text-center border border-slate-200 shadow-xl"
                    style={{
                        background:
                            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2563eb 100%)",
                    }}
                >
                    {/* Glow Effects */}
                    <div
                        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)",
                        }}
                    />

                    <div
                        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
                        }}
                    />

                    <div className="relative z-10">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-200">
                            Ready to Scale?
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
                            Automate your
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                social media workflow
                            </span>
                        </h2>

                        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
                            Schedule posts, generate content with AI, and manage
                            all your social accounts from one powerful dashboard.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto"
                            >
                                Get Started Free
                                <ArrowRightIcon className="size-4" />
                            </Link>

                            <a
                                href="#pricing"
                                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 w-full sm:w-auto"
                            >
                                View Pricing
                            </a>
                        </div>

                        <p className="mt-6 text-sm text-slate-400">
                            No credit card required · Cancel anytime
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}