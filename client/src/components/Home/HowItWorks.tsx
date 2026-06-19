import { ArrowDownIcon, CheckCircleIcon } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Connect your accounts",
    description:
      "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram.",
  },
  {
    step: "02",
    title: "Create or generate content",
    description:
      "Write your own post or let our AI craft captions, hashtags, and content ideas from a simple prompt.",
  },
  {
    step: "03",
    title: "Schedule & publish",
    description:
      "Choose your preferred time, select platforms, and let Scheduler publish automatically.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#E6F1FB] border border-[#B5D4F4] text-[#185FA5] text-[11px] font-medium uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5">
            <CheckCircleIcon className="size-3" />
            Simple setup
          </div>

          <h2 className="text-4xl sm:text-5xl font-medium leading-tight tracking-tight text-slate-900">
            Up and running in{" "}
            <span className="text-[#185FA5]">minutes</span>
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-[15px] text-slate-500 leading-relaxed">
            No complicated onboarding. No steep learning curve. Connect your
            accounts, create content, and start growing your audience immediately.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-2">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 transition-all duration-200 hover:border-[#B5D4F4]"
            >
              {/* Number */}
              <div className="w-[42px] h-[42px] rounded-[9px] bg-[#E6F1FB] flex items-center justify-center text-[13px] font-medium text-[#185FA5] flex-shrink-0">
                {step.step}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-slate-800 mb-1">
                  {step.title}
                </p>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow — hidden on last step */}
              {index < steps.length - 1 && (
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <ArrowDownIcon className="size-3.5 text-slate-400" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}