import React from "react";
import Link from "next/link";
import { FileSearch, Upload } from "lucide-react";

const EmptySummaryState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <FileSearch className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">
        No summaries yet
      </h3>
      <p className="text-sm text-slate-500 max-w-xs mb-6">
        Upload a PDF and we'll turn it into a clear, structured summary in seconds.
      </p>
      <Link
        href="/upload"
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 active:scale-95 transition-all duration-200 rounded-xl shadow-sm shadow-rose-200"
      >
        <Upload className="w-4 h-4" />
        Upload your first PDF
      </Link>
    </div>
  );
};

export default EmptySummaryState;
