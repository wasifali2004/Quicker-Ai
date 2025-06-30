"use client";

import React, { useRef, useState } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthings";
import { toast } from "sonner";
import { generatePDFSummary, StorePDFSummaryAction } from "@/actions/upload-action";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(  
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be PDF"
    ),
});

// Define types for better type safety
interface UploadResponse {
  data?: {
    summary?: string;
  };
  message?: string;
}

interface UploadThingFile {
  file: string;
  // Add other properties as needed based on your uploadthing response
}

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("File uploaded successfully", {
        position: "top-center",
      });
    },
    onUploadError: () => {
      toast.error("Error occurred in uploading file", {
        position: "top-center",
      });
    },
    onUploadBegin: (file) => {
      console.log("Upload started:", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      const validated = schema.safeParse({ file });

      if (!validated.success) {
        toast.error(
          validated.error.flatten().fieldErrors.file?.[0] ?? "Invalid file",
          {
            position: "top-center",
          }
        );
        setIsLoading(false);
        return;
      }

      toast("📃 Uploading your PDF...", {
        position: "top-center",
      });

      const resp = await startUpload([file]);

      if (!resp || resp.length === 0) {
        toast.error("Upload failed. Please try again.", {
          position: "top-center",
        });
        setIsLoading(false);
        return; // Stop here if upload failed
      }
      
      toast(
        "📃 Processing PDF\nHang tight! Our AI is reading your document! ✨",
        {
          position: "top-center",
        }
      );
      const uploadedFileUrl = resp[0].serverData.file.url
      const result = await generatePDFSummary(
        {fileUrl: uploadedFileUrl, fileName:file.name}
      );
      
      const { data = null, message = null } = result

      if (data) {
        let storedResult: any
        formRef.current?.reset();
        setIsLoading(false);
        formRef.current?.reset();
        if(data.summary) {
          storedResult = await StorePDFSummaryAction({summary: data.summary, fileUrl: resp[0].serverData.file.url, title:data.title, fileName:data.fileName})
        }

        toast.success("✨Summary Generated\nYour PDF has been successfully summarized and saved", {
          position: "top-center",
        })
        formRef.current?.reset();
        toast.success("Redirecting to summary...", {
          position: "top-center",
        })
        router.push(`summaries/${storedResult.data.id}`)

      } else {
        toast.error(
          message ?? "Something went wrong while processing the PDF."
        );
        setIsLoading(false);
      }

    } catch (error: any) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.", {
        position: "top-center",
      });
      formRef.current?.reset();
      setIsLoading(false);
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>

  );
};

export default UploadForm;