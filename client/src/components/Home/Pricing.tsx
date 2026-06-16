import { CheckIcon, CircleCheckBigIcon } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        description:
            "Perfect for creators just getting started with social media automation.",
        features: [
            "2 social accounts",
            "10 scheduled posts/month",
            "AI content (5 credits/mo)",
            "Basic dashboard",
        ],
        cta: "Get Started Free",
        highlight: false,
    },
    {
        name: "Pro",
        price: "$29",
        period: "/month",
        description:
            "Everything you need to grow and automate your social presence.",
        features: [
            "Unlimited accounts",
            "Unlimited scheduling",
            "AI content (200 credits/mo)",
            "Priority support",
        ],
        cta: "Start 14-Day Free Trial",
        highlight: true,
    },
    {
        name: "Agency",
        price: "$79",
        period: "/month",
        description:
            "For teams and agencies managing multiple brands at scale.",
        features: [
            "Everything in Pro",
            "5 team members",
            "Unlimited AI credits",
            "Custom AI personas",
            "Dedicated support",
        ],
        cta: "Contact Sales",
        highlight: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                        <CircleCheckBigIcon className="size-3" />
                        Simple Pricing
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-slate-900">
                        Plans for every stage
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            of growth
                        </span>
                    </h2>

                    <p className="mt-5 max-w-xl mx-auto text-lg text-slate-500">
                        Start free and upgrade when you're ready. No hidden fees,
                        cancel anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col gap-6 rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                            ${
                                plan.highlight
                                    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-700 text-white border-blue-500 shadow-2xl"
                                    : "bg-white border-slate-200 text-slate-900"
                            }`}
                        >
                            {plan.highlight && (
                                <div className="absolute left-1/2 -top-4 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div>
                                <div
                                    className={`mb-2 text-sm font-semibold uppercase tracking-wide ${
                                        plan.highlight
                                            ? "text-blue-200"
                                            : "text-blue-600"
                                    }`}
                                >
                                    {plan.name}
                                </div>

                                <div className="flex items-end gap-1">
                                    <span className="text-5xl font-bold">
                                        {plan.price}
                                    </span>

                                    <span
                                        className={`mb-2 text-sm ${
                                            plan.highlight
                                                ? "text-slate-300"
                                                : "text-slate-400"
                                        }`}
                                    >
                                        {plan.period}
                                    </span>
                                </div>

                                <p
                                    className={`mt-3 text-sm leading-relaxed ${
                                        plan.highlight
                                            ? "text-slate-300"
                                            : "text-slate-500"
                                    }`}
                                >
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-3">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-3"
                                    >
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-full ${
                                                plan.highlight
                                                    ? "bg-blue-500"
                                                    : "bg-blue-50"
                                            }`}
                                        >
                                            <CheckIcon
                                                className={`h-3 w-3 ${
                                                    plan.highlight
                                                        ? "text-white"
                                                        : "text-blue-600"
                                                }`}
                                            />
                                        </div>

                                        <span
                                            className={`text-sm ${
                                                plan.highlight
                                                    ? "text-slate-200"
                                                    : "text-slate-600"
                                            }`}
                                        >
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/login"
                                className={`mt-auto rounded-xl px-6 py-3 text-center text-sm font-semibold transition-all
                                ${
                                    plan.highlight
                                        ? "bg-white text-blue-600 hover:bg-slate-100"
                                        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
                                }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}