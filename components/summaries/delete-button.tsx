'use client'

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { DeleteSummaryAction } from "@/actions/summary-action";
import { toast } from "sonner";




const DeleteButton = ({summaryId}:{summaryId: string}) => {
  const [Open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () =>{
    const result = await DeleteSummaryAction(summaryId)
    if(!result) {
      console.log("Error in deleting")
    }
    toast.success("Summary Deleted", {
      position: "top-center"
    })
    setOpen(false)
    })
  }

  return (
    <Dialog open={Open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-white hover:bg-rose-500"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
           Are you sure you want to delete this summary? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}
          variant={"ghost"}
          className=" bg-gray-50 border border-gray-200 hover:text-white hover:bg-rose-500"
        >
          Cancel
        </Button>
        <Button onClick={handleDelete}
          variant={"destructive"}
          className=" bg-gray-900 hover:bg-gray-600"
        >
          {isPending? "Deleting...":"Delete"}
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
