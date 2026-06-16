import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";

const steps = [
    {
        step: "01",
        title: "Connect Your Accounts",
        description:
            "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram.",
    },
    {
        step: "02",
        title: "Create or Generate Content",
        description:
            "Write your own post or let our AI craft captions, hashtags, and content ideas from a simple prompt.",
    },
    {
        step: "03",
        title: "Schedule & Publish",
        description:
            "Choose your preferred time, select platforms, and let Scheduler publish automatically.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                        <CheckCircleIcon className="size-3" />
                        Simple Setup
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-slate-900">
                        Up and running in{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            minutes
                        </span>
                    </h2>

                    <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed">
                        No complicated onboarding. No steep learning curve.
                        Connect your accounts, create content, and start growing
                        your audience immediately.
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-8">
                    {steps.map((step, index) => (
                        <div
                            key={step.step}
                            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl"
                        >
                            <div className="flex flex-col gap-6 md:flex-row md:items-center">
                                {/* Step Number */}
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-bold text-lg">
                                    {step.step}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        {step.title}
                                    </h3>

                                    <p className="text-slate-500 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Arrow */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:flex items-center justify-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 group-hover:bg-blue-50 transition-colors">
                                            <ArrowRightIcon className="size-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}