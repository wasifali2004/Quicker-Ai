import React from "react";
import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => (
  <div className="flex items-start gap-3 mb-3">
    <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 flex-shrink-0 mt-1" />
    <div className="flex-1 min-w-0">
      <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate mb-1">
        {title || formatFileName(fileUrl)}
      </h3>
      <p className="text-sm text-gray-500">
        {createdAt
          ? formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })
          : "No date"}
      </p>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

const SummaryCard = ({ summary }: { summary: any }) => {
  return (
    <Card className="relative h-full p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="absolute top-4 right-4 z-10">
        <DeleteButton summaryId={summary.id} />
      </div>

      <div className="mb-3">
        <StatusBadge status={summary.status} />
      </div>

      <Link href={`/summaries/${summary.id}`} className="block">
        <div className="pr-8">
          {" "}
          <SummaryHeader
            fileUrl={summary.original_file_url}
            title={summary.title}
            createdAt={summary.created_at}
          />
          <p className="text-gray-600 line-clamp-3 text-sm sm:text-base leading-relaxed">
            {summary.summary_text}
          </p>
        </div>
      </Link>
    </Card>
  );
};

export default SummaryCard;
