import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

const stats = [
  { val: "12", label: "Scheduled" },
  { val: "48", label: "Published" },
  { val: "4",  label: "Accounts" },
  { val: "3",  label: "AI rules" },
];

const activities = [
  { text: "Post published to LinkedIn & Twitter", time: "2m ago" },
  { text: "AI generated 5 new captions",          time: "15m ago" },
  { text: "New campaign scheduled for tomorrow",   time: "1h ago" },
];

export default function Hero() {
  return (
    <section className="bg-slate-50 overflow-hidden">

      <div  />

      {/* Hero copy */}
      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-10 pb-9 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#E6F1FB] border border-[#B5D4F4] text-[#185FA5] text-[12px] font-medium px-3.5 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#378ADD]" />
          AI-powered social media automation
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-slate-900 leading-[1.1]">
          Schedule smarter.
          <br />
          <span className="text-[#185FA5]">Grow faster.</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-[20px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Create, schedule, and automate content across all your social platforms.
          Generate captions with AI, manage multiple accounts, and grow your audience
          from one powerful dashboard.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[9px] bg-[#185FA5] hover:bg-[#0C447C] text-[#e6f1fb] text-[15px] font-medium transition-colors w-full sm:w-auto"
          >
            Start for free
            <ArrowRightIcon className="size-3.5" />
          </Link>

          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center px-6 py-3 rounded-[9px] border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-[15px] font-medium transition-colors w-full sm:w-auto"
          >
            See how it works
          </a>
        </div>

        <p className="mt-4 text-[14px] text-slate-400">
          No credit card required · Free forever plan available
        </p>
      </div>

      {/* Dashboard preview */}
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pb-0">
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">

          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-100 border-b border-slate-200">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="mx-auto h-6 w-48 rounded-md bg-white border border-slate-200" />
          </div>

          {/* Dashboard body */}
          <div className="bg-slate-50 p-5">

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-slate-200 rounded-xl p-4"
                >
                  <p className="text-3xl font-medium text-slate-800">{s.val}</p>
                  <p className="text-[14px] text-slate-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Activity feed */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-[13px] font-medium uppercase tracking-widest text-slate-400 mb-3">
                Recent activity
              </p>
              <div className="flex flex-col divide-y divide-slate-100">
                {activities.map((a) => (
                  <div key={a.text} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#378ADD] flex-shrink-0" />
                    <span className="flex-1 text-[14px] text-slate-600">{a.text}</span>
                    <span className="text-[13px] text-slate-400 flex-shrink-0">{a.time}</span>
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