import { Link } from "react-router-dom";
import { ArrowRightIcon, RocketIcon } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-8xl mx-auto px-6 sm:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#185FA5] bg-[#0c1a2e] p-16 sm:p-20 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0d2040] border border-[#185FA533] text-[#85b7eb] text-[14px] font-medium uppercase tracking-widest px-5 py-3 rounded-full mb-7">
            <RocketIcon className="size-4" />
            Ready to scale?
          </div>

          {/* Heading */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl xl:text-7xl  font-medium leading-tight tracking-tight text-[#f0f4ff]">
            Automate your
            <br />
            <span className="text-[#85b7eb]">social media workflow</span>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-2xl mx-auto text-[17px] text-[#6a85a8] leading-relaxed">
            Schedule posts, generate content with AI, and manage all your
            social accounts from one powerful dashboard.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-xl bg-[#185FA5] hover:bg-[#0C447C] text-[#e6f1fb] text-[17px] font-medium transition-colors w-full sm:w-auto"
            >
              Get started free
              <ArrowRightIcon className="size-5" />
            </Link>

            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-[#1e2d45] text-[#6a85a8] hover:bg-[#0f1e35] hover:text-[#a8c0dc] text-[17px] font-medium transition-all w-full sm:w-auto"
            >
              View pricing
            </a>
          </div>

          <p className="mt-5 text-[15px] text-[#3a5070]">
            No credit card required · Cancel anytime
          </p>

        </div>
      </div>
    </section>
  );
}