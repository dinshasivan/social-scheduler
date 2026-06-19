import { Link } from "react-router-dom";
import { ArrowRightIcon, RocketIcon } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-[#185FA5] bg-[#0c1a2e] p-12 sm:p-16 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#0d2040] border border-[#185FA533] text-[#85b7eb] text-[11px] font-medium uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6">
            <RocketIcon className="size-3" />
            Ready to scale?
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight tracking-tight text-[#f0f4ff]">
            Automate your
            <br />
            <span className="text-[#85b7eb]">social media workflow</span>
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-xl mx-auto text-[15px] text-[#6a85a8] leading-relaxed">
            Schedule posts, generate content with AI, and manage all your
            social accounts from one powerful dashboard.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[9px] bg-[#185FA5] hover:bg-[#0C447C] text-[#e6f1fb] text-[13.5px] font-medium transition-colors w-full sm:w-auto"
            >
              Get started free
              <ArrowRightIcon className="size-3.5" />
            </Link>

            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-6 py-3 rounded-[9px] border border-[#1e2d45] text-[#6a85a8] hover:bg-[#0f1e35] hover:text-[#a8c0dc] text-[13.5px] font-medium transition-all w-full sm:w-auto"
            >
              View pricing
            </a>
          </div>

          <p className="mt-4 text-[12px] text-[#3a5070]">
            No credit card required · Cancel anytime
          </p>

        </div>
      </div>
    </section>
  );
}