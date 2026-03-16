"use client";

import React from "react";
import Link from "next/link";
import { FileText, Clock, Trash2, CheckCircle2, Loader2 } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import DeleteButton from "./delete-button";

const SummaryCard = ({ summary }: { summary: any }) => {
  const isCompleted = summary.status === "completed";
  const displayTitle = summary.title || formatFileName(summary.original_file_url || "");
  const timeAgo = summary.created_at
    ? formatDistanceToNow(new Date(summary.created_at), { addSuffix: true })
    : "Unknown date";

  // Pull a snippet: first 140 chars of summary text, stripped of markdown
  const snippet = (summary.summary_text || "")
    .replace(/^#+\s+/gm, "")
    .replace(/^[•\-\*]\s+/gm, "")
    .replace(/\p{Emoji_Presentation}/gu, "")
    .trim()
    .slice(0, 140);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 hover:border-rose-200 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      {/* Top accent line */}
      <div className={cn(
        "h-0.5 w-full",
        isCompleted
          ? "bg-gradient-to-r from-rose-400 to-orange-400"
          : "bg-gradient-to-r from-slate-300 to-slate-200"
      )} />

      {/* Delete button — positioned inside */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <DeleteButton summaryId={summary.id} />
      </div>

      {/* Card body — entire card is a link except delete button */}
      <Link href={`/summaries/${summary.id}`} className="flex flex-col flex-1 p-5">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3 pr-8">
          <div className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
            isCompleted ? "bg-rose-50 text-rose-500" : "bg-slate-50 text-slate-400"
          )}>
            <FileText className="w-4.5 h-4.5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-rose-600 transition-colors">
              {displayTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo}
            </p>
          </div>
        </div>

        {/* Snippet */}
        {snippet && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
            {snippet}…
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
          <span className={cn(
            "inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full",
            isCompleted
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          )}>
            {isCompleted ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : (
              <Loader2 className="w-3 h-3 animate-spin" />
            )}
            {isCompleted ? "Ready" : "Processing"}
          </span>

          <span className="text-xs text-rose-500 font-medium group-hover:translate-x-0.5 transition-transform inline-block">
            Read →
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SummaryCard;
