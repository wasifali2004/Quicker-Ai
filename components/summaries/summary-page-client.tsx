"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Clock,
  Calendar,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";

import { parseSummary } from "@/utils/parse-summary";

// ─── Point Row ────────────────────────────────────────────────────────────────

function SummaryPointRow({
  point,
  index,
}: {
  point: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
      className="flex items-start gap-4 group py-3 px-3 rounded-xl hover:bg-slate-50 transition-colors duration-150 relative"
    >
      <div className="absolute left-0 top-3.5 w-1.5 h-6 bg-rose-200/50 rounded-r-full shrink-0 group-hover:bg-rose-400 transition-colors duration-200" />
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-rose-500 shrink-0 transition-colors duration-200 ml-2" />
      <p className="text-slate-700 text-[15px] sm:text-base leading-relaxed flex-1 font-medium group-hover:text-slate-900 transition-colors">
        {point}
      </p>
    </motion.div>
  );
}

// ─── Section icon map ─────────────────────────────────────────────────────────

function getSectionIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("overview")) return "🗺️";
  if (t.includes("key insight")) return "💡";
  if (t.includes("main point")) return "📋";
  if (t.includes("takeaway") || t.includes("practical")) return "🎯";
  if (t.includes("term")) return "📖";
  if (t.includes("bottom") || t.includes("conclusion")) return "✅";
  return "📄";
}

// ─── Progress Strip ───────────────────────────────────────────────────────────

function ProgressStrip({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex gap-1.5 px-5 py-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to section ${i + 1}`}
          className="relative flex-1 h-1 rounded-full bg-slate-200 overflow-hidden transition-all duration-200 hover:h-1.5"
        >
          {i <= current && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-400 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Main Page Client ─────────────────────────────────────────────────────────

export function SummaryPageClient({
  title,
  summaryText,
  fileName,
  wordCount,
  readingTime,
  createdAt,
  originalFileUrl,
}: {
  title: string;
  summaryText: string;
  fileName: string;
  wordCount: number;
  readingTime: number;
  createdAt: string;
  originalFileUrl?: string;
}) {
  const sections = parseSummary(summaryText);
  const [current, setCurrent] = useState(0);

  const hasPrev = current > 0;
  const hasNext = current < sections.length - 1;

  const handlePrev = () => hasPrev && setCurrent((c) => c - 1);
  const handleNext = () => hasNext && setCurrent((c) => c + 1);

  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxLineWidth = pageWidth - margin * 2;
    
    let cursorY = margin;

    const addText = (text: string, fontSize: number, isBold: boolean, color: number[], autoWrap: boolean = true) => {
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);

      const lines = autoWrap ? doc.splitTextToSize(text, maxLineWidth) : [text];
      
      lines.forEach((line: string) => {
        if (cursorY + 10 > pageHeight - margin) {
          doc.addPage();
          cursorY = margin;
        }
        doc.text(line, margin, cursorY);
        cursorY += (fontSize * 0.4); 
      });
      cursorY += 4; 
    };

    // --- Title & Metadata ---
    addText(title, 22, true, [15, 23, 42]);
    cursorY += 4;
    
    const dateStr = new Date(createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    addText(`Source File: ${fileName}`, 10, false, [100, 116, 139]);
    cursorY -= 2;
    addText(`Generated on: ${dateStr}`, 10, false, [100, 116, 139]);
    cursorY += 6;
    
    // Line separator
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += 12;

    // --- Content ---
    sections.forEach((section) => {
      if (section.title) {
        addText(section.title, 14, true, [15, 23, 42]);
        cursorY += 2;
      }

      section.points.forEach((point) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(51, 65, 85);
        
        const bulletLines = doc.splitTextToSize(point, maxLineWidth - 6);
        bulletLines.forEach((bLine: string, bIndex: number) => {
          if (cursorY + 10 > pageHeight - margin) {
            doc.addPage();
            cursorY = margin;
          }
          if (bIndex === 0) {
            doc.text("•", margin, cursorY);
            doc.text(bLine, margin + 6, cursorY);
          } else {
            doc.text(bLine, margin + 6, cursorY);
          }
          cursorY += 5.5; 
        });
        cursorY += 2;
      });
      cursorY += 6;
    });

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(148, 163, 184);
        doc.text(`Page ${i} of ${pageCount}  —  Generated by Quicker`, pageWidth / 2, pageHeight - 12, { align: 'center' });
    }

    doc.save(`Summary-${title.replace(/[^a-z0-9]/gi, "_").slice(0, 50)}.pdf`);
  };

  const activeSection = sections[current];
  const sectionIcon = activeSection ? getSectionIcon(activeSection.title) : "";

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors group"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Dashboard
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {originalFileUrl && (
            <a
              href={originalFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-100"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View PDF</span>
            </a>
          )}
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 active:scale-95 transition-all px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm shadow-rose-200"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* ── Page body ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-20">

        {/* ── Document header ── */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">
              <CheckCircle2 className="h-3 w-3" />
              Summary Ready
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              {readingTime} min read
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <BookOpen className="h-3 w-3" />
              {wordCount.toLocaleString()} words
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            {title}
          </h1>
          {fileName && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
              <FileText className="h-3.5 w-3.5 text-rose-400" />
              {fileName}
            </p>
          )}
        </div>

        {/* ── Section navigation pills ── */}
        {sections.length > 1 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {sections.map((sec, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border transition-all duration-200",
                  i === current
                    ? "bg-rose-500 text-white border-rose-500 shadow-sm shadow-rose-200"
                    : "bg-white text-slate-600 border-slate-200 hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50"
                )}
              >
                {getSectionIcon(sec.title)} {sec.title}
              </button>
            ))}
          </div>
        )}

        {/* ── Viewer card ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Progress strip */}
          {sections.length > 1 && (
            <ProgressStrip
              total={sections.length}
              current={current}
              onSelect={setCurrent}
            />
          )}

          {/* Content */}
          <div className="px-5 sm:px-8 py-6 sm:py-8 min-h-[320px]">
            <AnimatePresence mode="wait">
              {activeSection && (
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  {/* Section title */}
                  <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-100">
                    <span className="text-2xl leading-none">{sectionIcon}</span>
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                      {activeSection.title}
                    </h2>
                    <span className="ml-auto text-xs text-slate-400 font-medium">
                      {current + 1} / {sections.length}
                    </span>
                  </div>

                  {/* Points */}
                  <div className="space-y-0.5" role="list">
                    {activeSection.points.length > 0 ? (
                      activeSection.points.map((point, i) => (
                        <SummaryPointRow key={i} point={point} index={i} />
                      ))
                    ) : (
                      <p className="text-slate-400 italic text-sm">
                        No points available for this section.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Nav footer ── */}
          {sections.length > 1 && (
            <div className="border-t border-slate-100 px-5 py-4 flex items-center justify-between bg-slate-50/50">
              <button
                onClick={handlePrev}
                disabled={!hasPrev}
                aria-label="Previous section"
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200",
                  hasPrev
                    ? "text-slate-700 bg-white border border-slate-200 hover:border-rose-200 hover:text-rose-600 shadow-xs"
                    : "text-slate-300 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Dot indicators */}
              <div className="flex gap-1.5">
                {sections.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Section ${i + 1}`}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === current
                        ? "w-5 h-2 bg-rose-500"
                        : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!hasNext}
                aria-label="Next section"
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200",
                  hasNext
                    ? "text-white bg-rose-500 hover:bg-rose-600 shadow-sm shadow-rose-200 active:scale-95"
                    : "text-slate-300 cursor-not-allowed"
                )}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* ── All sections as full read ── */}
        <div className="mt-10 sm:mt-14">
          <h2 className="text-base font-semibold text-slate-500 uppercase tracking-widest mb-5">
            Full Summary
          </h2>
          <div className="space-y-6">
            {sections.map((sec, si) => (
              <div
                key={si}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
                  <span className="text-xl leading-none">
                    {getSectionIcon(sec.title)}
                  </span>
                  <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                    {sec.title}
                  </h3>
                </div>
                <div className="px-4 sm:px-5 py-3 space-y-0.5">
                  {sec.points.map((p, pi) => (
                    <SummaryPointRow key={pi} point={p} index={pi} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom actions ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 active:scale-95 transition-all px-5 py-2.5 rounded-xl shadow-sm shadow-rose-200"
          >
            <Download className="h-4 w-4" />
            Download Summary
          </button>
          {originalFileUrl && (
            <a
              href={originalFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all px-5 py-2.5 rounded-xl border border-slate-200 shadow-xs"
            >
              <ExternalLink className="h-4 w-4" />
              View Original PDF
            </a>
          )}
          <Link
            href="/upload"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all px-5 py-2.5 rounded-xl border border-slate-200 shadow-xs"
          >
            <FileText className="h-4 w-4" />
            Summarize Another PDF
          </Link>
        </div>
      </div>
    </div>
  );
}
