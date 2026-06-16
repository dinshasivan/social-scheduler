import {
    CalendarDaysIcon,
    Wand2Icon,
    Share2Icon,
    ZapIcon,
    BarChart3Icon,
    HashIcon,
} from "lucide-react";

const features = [
    {
        icon: CalendarDaysIcon,
        title: "Smart Scheduling",
        description:
            "Queue posts across all platforms with a single click. Set it once and let us handle the rest.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: Wand2Icon,
        title: "AI Content Generator",
        description:
            "Generate on-brand captions and stunning images with our built-in AI. Never stare at a blank page again.",
        color: "bg-cyan-50 text-cyan-600",
    },
    {
        icon: BarChart3Icon,
        title: "Activity Dashboard",
        description:
            "Get a bird's eye view of all published posts, scheduled content, and engagement activity in one place.",
        color: "bg-indigo-50 text-indigo-600",
    },
    {
        icon: Share2Icon,
        title: "Multi-Platform",
        description:
            "Connect Twitter, LinkedIn, Facebook, and Instagram. Post everywhere from one unified workspace.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: ZapIcon,
        title: "Instant Publishing",
        description:
            "Need to go live now? Publish immediately or schedule for peak engagement times with full timezone support.",
        color: "bg-cyan-50 text-cyan-600",
    },
    {
        icon: HashIcon,
        title: "Hashtag Suggestions",
        description:
            "Get AI-powered hashtag suggestions to reach a wider audience.",
        color: "bg-indigo-50 text-indigo-600",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                        <ZapIcon className="size-3" />
                        Everything You Need
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-slate-900">
                        Automate your entire
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            social media workflow
                        </span>
                    </h2>

                    <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed">
                        From content creation to scheduling and analytics —
                        Scheduler handles everything so you can focus on growing
                        your audience.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                        >
                            <div
                                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color}`}
                            >
                                <feature.icon className="size-6" />
                            </div>

                            <h3 className="mb-3 text-lg font-semibold text-slate-900">
                                {feature.title}
                            </h3>

                            <p className="text-sm leading-relaxed text-slate-500">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}