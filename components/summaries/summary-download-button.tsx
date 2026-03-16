"use client";

import React, { useState } from "react";
import { Download, CheckCircle2 } from "lucide-react";
import { generateSummaryPDF } from "@/utils/generate-pdf";
import { cn } from "@/lib/utils";

const DownloadSummaryButton = ({
  title,
  createdAt,
  summaryText,
  fileName,
  className,
}: {
  title: string;
  createdAt: string;
  summaryText: string;
  fileName: string;
  className?: string;
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    generateSummaryPDF(title, createdAt, fileName, summaryText);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <button
      onClick={handleDownload}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white transition-all duration-200 shadow-sm",
        className
      )}
    >
      {downloaded ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          Saved PDF!
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download PDF
        </>
      )}
    </button>
  );
};

export default DownloadSummaryButton;