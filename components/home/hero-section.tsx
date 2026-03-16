import Link from "next/link";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";

const stats = [
  { value: "10K+", label: "PDFs summarized" },
  { value: "98%", label: "Accuracy rate" },
  { value: "30s", label: "Average time" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle modern top fade */}
      <div
        className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-slate-50 to-transparent"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4 pt-28 pb-24 sm:pt-36 sm:pb-32">
        {/* Announcement badge */}
        <div className="flex justify-center mb-8">
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm text-sm font-medium text-gray-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 transition-all duration-200 group"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-100">
              <Star className="w-3 h-3 text-rose-600 fill-rose-600" />
            </span>
            Introducing unlimited summaries on Pro
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all duration-200" />
          </Link>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-[44px] sm:text-6xl lg:text-[72px] font-bold tracking-tight text-slate-900 leading-[1.05]">
            Read smarter, <br className="hidden sm:block" />
            <span className="text-slate-400">not longer.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-[21px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Upload any PDF and get a clear, structured summary in seconds.
            Perfect for research papers, reports, books, and long documents.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6">
            {[
              "No credit card required",
              "5 free summaries",
              "Cancel anytime",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 text-sm text-gray-500"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-medium text-[16px] hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 group active:scale-95 min-w-[200px]"
            >
              Start summarizing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-medium text-[16px] hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm min-w-[200px]"
            >
              See how it works
            </Link>
          </div>

          {/* Social proof avatars */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="flex -space-x-2">
              {[
                { initials: "AK", color: "bg-violet-500" },
                { initials: "TM", color: "bg-blue-500" },
                { initials: "JR", color: "bg-emerald-500" },
                { initials: "SL", color: "bg-amber-500" },
                { initials: "PD", color: "bg-pink-500" },
              ].map((avatar) => (
                <div
                  key={avatar.initials}
                  className={`w-8 h-8 rounded-full ${avatar.color} ring-2 ring-white flex items-center justify-center text-white text-xs font-bold`}
                >
                  {avatar.initials}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-0.5 mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">10,000+</span> happy users
              </p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Preview mockup */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden bg-white/50 backdrop-blur-xl">
            {/* Browser chrome bar */}
            <div className="flex items-center px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </div>
            </div>
            {/* Mockup content */}
            <div className="bg-white p-6 sm:p-10 pointer-events-none">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200/50">
                  <div className="w-5 h-6 rounded bg-slate-300" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-48 bg-slate-800 rounded-full" />
                  <div className="h-2 w-24 bg-slate-200 rounded-full" />
                </div>
              </div>
              <div className="space-y-4">
                {[95, 82, 88].map((w, i) => (
                  <div key={i} className={`h-2.5 bg-slate-100 rounded-full`} style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}