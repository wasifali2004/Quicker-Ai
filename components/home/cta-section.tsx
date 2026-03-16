import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
          <div className="absolute inset-0 dot-grid opacity-10" />

          {/* Glow accents */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-rose-600/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-rose-600/10 blur-3xl" />

          {/* Content */}
          <div className="relative px-8 py-14 sm:px-14 sm:py-16 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Start reading smarter{" "}
              <span className="text-rose-400">today</span>
            </h2>
            <p className="mt-5 text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
              Join 10,000+ professionals who save hours every week with Quicker.
              Your first 5 summaries are completely free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-rose-600 text-white font-semibold text-base hover:bg-rose-500 transition-all duration-200 shadow-lg shadow-rose-900/50 hover:-translate-y-0.5 group"
              >
                Get started free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/80 font-semibold text-base hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-200"
              >
                View pricing
              </Link>
            </div>

            {/* Trust note */}
            <p className="mt-6 text-xs text-gray-500">
              No credit card required · Free plan available · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
