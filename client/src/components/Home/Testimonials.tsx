import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Marketing Manager",
    avatar: "S",
    text: "Scheduler has saved our team 10+ hours a week. The AI composer is genuinely impressive — it writes content that sounds like us.",
  },
  {
    name: "Marcus L.",
    role: "Indie Creator",
    avatar: "M",
    text: "I used to dread posting. Now I queue up a whole week of content in 20 minutes. The smart scheduling feature alone is worth it.",
  },
  {
    name: "Priya D.",
    role: "Startup Founder",
    avatar: "P",
    text: "Finally a scheduler that's beautiful AND powerful. The clean dashboard makes it easy to see exactly what's going out and when.",
  },
];

const stats = [
  { val: "10K+",  label: "Active users" },
  { val: "1M+",   label: "Posts scheduled" },
  { val: "99.9%", label: "Uptime" },
  { val: "4.9/5", label: "User rating" },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#E6F1FB] border border-[#B5D4F4] text-[#185FA5] text-[14px] font-medium uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <StarIcon className="size-4" />
            Testimonials
          </div>

          <h2 className="text-5xl sm:text-6xl xl:text-7xl font-medium leading-tight tracking-tight text-slate-900">
            Loved by{" "}
            <span className="text-[#185FA5]">creators & teams</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-[17px] text-slate-500 leading-relaxed">
            Join thousands of creators, marketers, and businesses automating
            their social media with Scheduler.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:border-[#B5D4F4]"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="size-5 fill-[#378ADD] text-[#378ADD]" />
                ))}
              </div>

              {/* Quote */}
              <p className="flex-1 text-[17px] leading-relaxed text-slate-600">
                "{t.text}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-[#185FA5] flex items-center justify-center text-[15px] font-medium text-[#85b7eb] flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[17px] font-medium text-slate-800">{t.name}</p>
                  <p className="text-[15px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-slate-200 bg-white overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-7 text-center ${i < stats.length - 1 ? "border-r border-slate-100" : ""}`}
            >
              <p className="text-[28px] font-medium text-slate-900">{s.val}</p>
              <p className="text-[15px] text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}