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
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-[#E6F1FB] border border-[#B5D4F4] text-[#185FA5] text-[11px] font-medium uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5">
            <StarIcon className="size-3" />
            Testimonials
          </div>

          <h2 className="text-4xl sm:text-5xl font-medium leading-tight tracking-tight text-slate-900">
            Loved by{" "}
            <span className="text-[#185FA5]">creators & teams</span>
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-[15px] text-slate-500 leading-relaxed">
            Join thousands of creators, marketers, and businesses automating
            their social media with Scheduler.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-[#B5D4F4]"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="size-3.5 fill-[#378ADD] text-[#378ADD]" />
                ))}
              </div>

              {/* Quote */}
              <p className="flex-1 text-[13px] leading-relaxed text-slate-600">
                "{t.text}"
              </p>

              {/* User */}
              <div className="flex items-center gap-2.5 pt-3.5 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-[#185FA5] flex items-center justify-center text-[13px] font-medium text-[#85b7eb] flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-slate-800">{t.name}</p>
                  <p className="text-[12px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl border border-slate-200 bg-white overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-5 text-center ${i < stats.length - 1 ? "border-r border-slate-100" : ""}`}
            >
              <p className="text-[22px] font-medium text-slate-900">{s.val}</p>
              <p className="text-[12px] text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}