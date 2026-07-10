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
    title: "Smart scheduling",
    description:
      "Queue posts across all platforms with a single click. Set it once and let us handle the rest.",
  },
  {
    icon: Wand2Icon,
    title: "AI content generator",
    description:
      "Generate on-brand captions and stunning images with our built-in AI. Never stare at a blank page again.",
  },
  {
    icon: BarChart3Icon,
    title: "Activity dashboard",
    description:
      "Get a bird's eye view of all published posts, scheduled content, and engagement activity in one place.",
  },
  {
    icon: Share2Icon,
    title: "Multi-platform",
    description:
      "Connect Twitter, LinkedIn, Facebook, and Instagram. Post everywhere from one unified workspace.",
  },
  {
    icon: ZapIcon,
    title: "Instant publishing",
    description:
      "Need to go live now? Publish immediately or schedule for peak engagement times with full timezone support.",
  },
  {
    icon: HashIcon,
    title: "Hashtag suggestions",
    description:
      "Get AI-powered hashtag suggestions to reach a wider audience and maximise your content's reach.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#E6F1FB] border border-[#B5D4F4] text-[#185FA5] text-[12px] font-medium uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <ZapIcon className="size-3.5" />
            Everything you need
          </div>

          <h2 className="text-5xl sm:text-6xl xl:text-7xl font-medium leading-tight tracking-tight text-slate-900">
            Automate your entire
            <br />
            <span className="text-[#185FA5]">social media workflow</span>
          </h2>

          <p className="mt-5 mx-auto text-[19px] text-slate-500 leading-relaxed">
            From content creation to scheduling and analytics — Scheduler
            handles everything so you can focus on growing your audience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:border-[#B5D4F4]"
            >
              <div className="mb-5 w-13 h-13 rounded-xl bg-[#E6F1FB] flex items-center justify-center">
                <feature.icon className="size-7 text-[#185FA5]" />
              </div>

              <h3 className="text-[19px] font-medium text-slate-800 mb-2">
                {feature.title}
              </h3>

              <p className="text-[17px] leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}