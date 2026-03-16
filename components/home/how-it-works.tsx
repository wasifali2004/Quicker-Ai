import { Upload, Cpu, BookOpen, MoveRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    label: "Upload your PDF",
    description:
      "Drag & drop or click to upload any PDF — research papers, reports, books, contracts. Up to 20MB supported.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    number: "02",
    icon: Cpu,
    label: "AI analysis",
    description:
      "Our AI reads your document in seconds, identifying key points, insights, and the most important information.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    number: "03",
    icon: BookOpen,
    label: "Get your summary",
    description:
      "Receive a structured, beautifully formatted summary. Navigate by section, download, or share with your team.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-20 lg:py-28 bg-gray-50">
      {/* Subtle border lines */}
      <div className="container mx-auto px-4">
        {/* Section label */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5 shadow-sm">
            How it works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            From PDF to insight in{" "}
            <span className="gradient-text">three steps</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            No complex setup. No learning curve. Just upload and summarize.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
          {/* Connector lines (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-gray-200 via-rose-200 to-gray-200" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                <div className="h-full flex flex-col p-7 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">
                  {/* Number + Icon row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-4xl font-black text-gray-100 select-none">
                      {step.number}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-xl ${step.bg} ${step.border} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.label}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {step.description}
                  </p>

                  {/* Arrow connector for mobile */}
                  {idx < steps.length - 1 && (
                    <div className="flex justify-center mt-4 md:hidden">
                      <MoveRight className="w-5 h-5 text-gray-300 rotate-90" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
