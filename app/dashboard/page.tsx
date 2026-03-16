import { Plus, ArrowRight, FileText, Zap } from "lucide-react";
import Link from "next/link";
import SummaryCard from "@/components/summaries/summary-card";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import { hasReachedLimits } from "@/lib/user";

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) redirect("/sign-in");

  const { hasReachedLimits: limitReached, uploadLimit } =
    await hasReachedLimits(userId);
  const summaries = await getSummaries(userId);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20">

        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Your Summaries
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {summaries.length === 0
                ? "Upload a PDF to create your first summary"
                : `${summaries.length} summar${summaries.length === 1 ? "y" : "ies"} — click any to read`}
            </p>
          </div>

          {!limitReached && (
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 active:scale-95 transition-all duration-200 rounded-xl shadow-sm shadow-rose-200 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              New Summary
            </Link>
          )}
        </div>

        {/* ── Limit banner ── */}
        {limitReached && (
          <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <Zap className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-800">
              You've used all {uploadLimit} uploads on the Basic plan.{" "}
              <Link
                href="/#pricing"
                className="font-semibold underline underline-offset-2 inline-flex items-center gap-0.5 hover:text-amber-900"
              >
                Upgrade to Pro
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>{" "}
              for unlimited uploads.
            </p>
          </div>
        )}

        {/* ── Stats row (when there are summaries) ── */}
        {summaries.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-3">
              <p className="text-xs text-slate-500 mb-0.5">Total Summaries</p>
              <p className="text-2xl font-bold text-slate-800">{summaries.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 px-4 py-3">
              <p className="text-xs text-slate-500 mb-0.5">Completed</p>
              <p className="text-2xl font-bold text-emerald-600">
                {summaries.filter((s: any) => s.status === "completed").length}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Upload limit</p>
                <p className="text-2xl font-bold text-slate-800">
                  {limitReached ? (
                    <span className="text-rose-500">{uploadLimit}/{uploadLimit}</span>
                  ) : (
                    <span>{summaries.length}/{uploadLimit}</span>
                  )}
                </p>
              </div>
              <FileText className="w-6 h-6 text-slate-300" />
            </div>
          </div>
        )}

        {/* ── Summaries grid / empty state ── */}
        {summaries.length === 0 ? (
          <EmptySummaryState />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {summaries.map((summary: any, index: number) => (
              <SummaryCard key={summary.id || index} summary={summary} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
