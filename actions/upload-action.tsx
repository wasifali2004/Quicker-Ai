"use server";

import { getDBConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPDFText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type UploadResponse = [
  {
    serverData: {
      userId: string;
      file: {
        url: string;
        name: string;
      };
    };
  }
];

export const generatePDFSummary = async ({fileUrl, fileName}: {fileUrl:string, fileName:string}) => {
  if (!fileUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }


  if (!fileUrl) {
    return {
      success: false,
      message: "File URL missing",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPDFText(fileUrl);
    console.log(pdfText);
    let summary;

    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log(summary);
    } catch (openAIError: any) {
      console.log("OpenAI failed:", openAIError.message);

      if (
        openAIError.status === 429 ||
        openAIError.code === "insufficient_quota" ||
        openAIError.message === "RATE_LIMIT_EXCEEDED"
      ) {
        console.log("OpenAI quota exceeded, trying Gemini...");

        try {
          summary = await generateSummaryFromGemini(pdfText);
          console.log("Gemini succeeded:", summary);
        } catch (geminiError: any) {
          console.error("Gemini also failed:", geminiError.message);

          return {
            success: false,
            message: `Both AI providers failed. OpenAI: ${openAIError.message}. Gemini: ${geminiError.message}`,
            data: null,
          };
        }
      } else {
        return {
          success: false,
          message: `OpenAI error: ${openAIError.message}`,
          data: null,
        };
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary from both providers",
        data: null,
      };
    }

    const FormattedFileName = formatFileNameAsTitle(fileName);
    return {
      success: true,
      data: {
        title: FormattedFileName,
        summary,
        fileName: fileName,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Failed to extract PDF text",
      data: null,
    };
  }
};

interface PDFSummaryType {
  fileUrl: string;
  userId?: string;
  summary: string;
  title: string;
  fileName: string;
}

async function savePDFSummary({
  fileUrl,
  userId,
  summary,
  title,
  fileName,
}: PDFSummaryType) {
  try{

    const sql = await getDBConnection();
    const result = await sql`
      INSERT INTO pdf_summaries(user_id, original_file_url, summary_text, title, file_name) 
      VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}) 
      RETURNING id, user_id, title, created_at
    `;

    console.log("✅ INSERT successful!");
    console.log("Returned data:", result[0]);

    return result[0];
  } catch (err) {
    console.error("Error message:", err instanceof Error ? err.message : err);
    throw new Error(
      `Error saving PDF Summary: ${
        err instanceof Error ? err.message : "Unknown error"
      }`
    );
  }
}

export async function StorePDFSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PDFSummaryType) {

  let saveSummary;
  try {
    const { userId } = await auth();
    console.log("Auth result - userId:", userId);

    if (!userId) {
      console.error("❌ No userId from auth");
      return {
        success: false,
        message: "User Not Found",
      };
    }
    saveSummary = await savePDFSummary({
      fileUrl,
      userId,
      summary,
      title,
      fileName,
    });

    console.log("✅ savePDFSummary completed:", saveSummary);
  } catch (err) {
    console.error("❌ StorePDFSummaryAction error:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Error",
    };
  }

  revalidatePath(`/summaries/${saveSummary.id}`);
  return {
    success: true,
    message: "PDF saved successfully",
    data: {
      id: saveSummary.id,
    },
  };
}
