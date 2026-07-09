import { Link } from "react-router-dom";

const footerLinks: Record<string, string[]> = {
  Product: ["Features", "How it works", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal:   ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-7 sm:px-10 py-16">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              onClick={() => scrollTo(0, 0)}
              className="inline-flex items-center gap-3 mb-5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#185FA5] flex items-center justify-center flex-shrink-0">
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="size-5 brightness-0 invert"
                />
              </div>
              <span className="text-[17px] font-medium text-slate-800">
                Scheduler
              </span>
            </Link>

            <p className="max-w-xs text-[15px] leading-relaxed text-slate-500">
              The AI-powered social media scheduler that helps creators,
              agencies, and businesses automate content, manage accounts, and
              grow their audience faster.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#639922]" />
              <span className="text-[13px] text-slate-400">
                All systems operational
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-[11px] font-medium uppercase tracking-widest text-slate-400">
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[15px] text-slate-500 hover:text-[#185FA5] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-7">
          <p className="text-[13px] text-slate-400">
            © {new Date().getFullYear()} Scheduler. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-[13px] text-slate-400 hover:text-[#185FA5] transition-colors">
              Privacy policy
            </a>
            <a href="#" className="text-[13px] text-slate-400 hover:text-[#185FA5] transition-colors">
              Terms of service
            </a>
            <Link to="/login" className="text-[13px] text-slate-400 hover:text-[#185FA5] transition-colors">
              Sign in
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}