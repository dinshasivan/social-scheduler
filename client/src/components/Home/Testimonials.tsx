import { StarIcon } from "lucide-react";

const testimonials = [
    {
        name: "Sarah K.",
        role: "Marketing Manager",
        avatar: "S",
        avatarBg: "from-blue-500 to-cyan-500",
        text: "Scheduler has saved our team 10+ hours a week. The AI composer is genuinely impressive — it writes content that sounds like us.",
    },
    {
        name: "Marcus L.",
        role: "Indie Creator",
        avatar: "M",
        avatarBg: "from-cyan-500 to-blue-600",
        text: "I used to dread posting. Now I queue up a whole week of content in 20 minutes. The smart scheduling feature alone is worth it.",
    },
    {
        name: "Priya D.",
        role: "Startup Founder",
        avatar: "P",
        avatarBg: "from-indigo-500 to-blue-600",
        text: "Finally a scheduler that's beautiful AND powerful. The clean dashboard makes it easy to see exactly what's going out and when.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                        <StarIcon className="size-3" />
                        Testimonials
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-slate-900">
                        Loved by{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            creators & teams
                        </span>
                    </h2>

                    <p className="mt-5 max-w-xl mx-auto text-lg text-slate-500">
                        Join thousands of creators, marketers, and businesses
                        automating their social media with Scheduler.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                        >
                            {/* Rating */}
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className="size-4 fill-blue-500 text-blue-500"
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="flex-1 leading-relaxed text-slate-600">
                                "{testimonial.text}"
                            </p>

                            {/* User */}
                            <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                                <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r ${testimonial.avatarBg} text-sm font-bold text-white shadow-md`}
                                >
                                    {testimonial.avatar}
                                </div>

                                <div>
                                    <div className="font-semibold text-slate-900">
                                        {testimonial.name}
                                    </div>

                                    <div className="text-sm text-slate-500">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Stats */}
                <div className="mt-16 grid grid-cols-2 gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-slate-900">
                            10K+
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                            Active Users
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-3xl font-bold text-slate-900">
                            1M+
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                            Posts Scheduled
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-3xl font-bold text-slate-900">
                            99.9%
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                            Uptime
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-3xl font-bold text-slate-900">
                            4.9/5
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                            User Rating
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}