import { getSummaryById } from "@/components/summaries/get-summary";
import { SummaryPageClient } from "@/components/summaries/summary-page-client";
import { notFound } from "next/navigation";
import React from "react";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const summary = await getSummaryById(id);
  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name, word_count } = summary;
  const readingTime = Math.ceil((word_count || 0) / 200);

  return (
    <SummaryPageClient
      title={title}
      summaryText={summary_text}
      fileName={file_name}
      wordCount={word_count || 0}
      readingTime={readingTime}
      createdAt={summary.created_at}
      originalFileUrl={summary.original_file_url}
    />
  );
};

export default Page;