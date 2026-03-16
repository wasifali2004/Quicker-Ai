"use client";

import React, { useTransition, useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { DeleteSummaryAction } from "@/actions/summary-action";
import { toast } from "sonner";

const DeleteButton = ({ summaryId }: { summaryId: string }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await DeleteSummaryAction(summaryId);
      if (!result) {
        toast.error("Failed to delete summary. Please try again.", {
          position: "top-center",
        });
        return;
      }
      toast.success("Summary deleted", { position: "top-center" });
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={(e) => e.stopPropagation()}
          aria-label="Delete summary"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all duration-150"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6 text-rose-500" />
          </div>
          <DialogTitle className="text-base font-semibold text-slate-800">
            Delete this summary?
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 mt-1">
            This action cannot be undone. The summary will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 pt-2">
          <button
            onClick={() => setOpen(false)}
            disabled={isPending}
            className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors duration-150 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 active:scale-95 rounded-xl transition-all duration-150 disabled:opacity-60"
          >
            {isPending ? "Deleting…" : "Delete"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
