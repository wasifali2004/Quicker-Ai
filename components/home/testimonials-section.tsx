"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Research Analyst",
    company: "Deloitte",
    initials: "SC",
    color: "bg-violet-500",
    rating: 5,
    text: "I process 20+ research papers a week. Quicker cut my reading time by 70%. The summaries are accurate and structured perfectly for my workflow.",
  },
  {
    name: "Marcus Reyes",
    role: "PhD Student",
    company: "MIT",
    initials: "MR",
    color: "bg-blue-500",
    rating: 5,
    text: "Incredible tool for academic research. I can quickly evaluate whether a paper is worth reading in depth. Game changer for literature reviews.",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    company: "Notion",
    initials: "PS",
    color: "bg-emerald-500",
    rating: 5,
    text: "We use Quicker for summarizing competitor analysis reports. Saves our team hours every sprint. The Pro plan is worth every penny.",
  },
  {
    name: "James O'Brien",
    role: "Lawyer",
    company: "Ward & Co.",
    initials: "JO",
    color: "bg-amber-500",
    rating: 5,
    text: "Contract review used to take hours. Now I get a clear summary of key clauses in seconds. I wish I'd found this tool sooner.",
  },
  {
    name: "Nina Kwak",
    role: "Content Strategist",
    company: "HubSpot",
    initials: "NK",
    color: "bg-pink-500",
    rating: 5,
    text: "The sectioned output is brilliant. I can navigate to exactly the part I need. Clean UI, fast results. Recommending this to everyone.",
  },
  {
    name: "David Park",
    role: "Startup Founder",
    company: "Founders Fund",
    initials: "DP",
    color: "bg-rose-500",
    rating: 5,
    text: "Due diligence requires reading hundreds of pages. Quicker helps us screen deals 10x faster. Essential tool for our investment process.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">
            Loved by thousands
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            The best teams are already{" "}
            <span className="gradient-text">reading smarter</span>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative flex flex-col p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 group"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-gray-100 mb-4 group-hover:text-rose-100 transition-colors duration-300" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-50">
                <div
                  className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {[
            "10,000+ users",
            "99.9% uptime",
            "SOC 2 compliant",
            "GDPR ready",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
