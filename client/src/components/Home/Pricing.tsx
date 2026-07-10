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
    cta: "Get started free",
    highlight: false,
    ctaStyle: "outline" as const,
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
    cta: "Start 14-day free trial",
    highlight: true,
    ctaStyle: "pro" as const,
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
    cta: "Contact sales",
    highlight: false,
    ctaStyle: "primary" as const,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 bg-slate-50">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E6F1FB] border border-[#B5D4F4] text-[#185FA5] text-[14px] font-medium uppercase tracking-widest px-5 py-3 rounded-full mb-6">
            <CircleCheckBigIcon className="size-4" />
            Simple pricing
          </div>

          <h2 className="text-5xl sm:text-6xl xl:text-7xl font-medium leading-tight tracking-tight text-slate-900">
            Plans for every stage{" "}
            <span className="text-[#185FA5]">of growth</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-[19px] text-slate-500 leading-relaxed">
            Start free and upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col gap-6 rounded-2xl border p-8 transition-all duration-200
                ${plan.highlight
                  ? "bg-[#0c1a2e] border-[#185FA5]"
                  : "bg-white border-slate-200 hover:border-[#B5D4F4]"
                }`}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div className="absolute left-1/2 -top-3.5 -translate-x-1/2 bg-[#185FA5] text-[#e6f1fb] text-[14px] font-medium px-4 py-1 rounded-full whitespace-nowrap">
                  Most popular
                </div>
              )}

              {/* Plan name + price */}
              <div>
                <p className={`text-[14px] font-medium uppercase tracking-widest mb-2 ${plan.highlight ? "text-[#85b7eb]" : "text-[#378ADD]"}`}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-[42px] font-medium ${plan.highlight ? "text-[#f0f4ff]" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-[17px] ${plan.highlight ? "text-[#4a6080]" : "text-slate-400"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`mt-2 text-[17px] leading-relaxed ${plan.highlight ? "text-[#6a85a8]" : "text-slate-500"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? "bg-[#185FA544]" : "bg-[#E6F1FB]"}`}>
                      <CheckIcon className={`size-5 ${plan.highlight ? "text-[#85b7eb]" : "text-[#185FA5]"}`} />
                    </div>
                    <span className={`text-[17px] ${plan.highlight ? "text-[#a8c0dc]" : "text-slate-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/login"
                className={`mt-auto block text-center py-4 rounded-xl text-[17px] font-medium transition-colors
                  ${plan.ctaStyle === "pro"
                    ? "bg-[#f0f4ff] text-[#185FA5] hover:bg-[#B5D4F4]"
                    : plan.ctaStyle === "outline"
                    ? "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    : "bg-[#185FA5] text-[#e6f1fb] hover:bg-[#0C447C]"
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