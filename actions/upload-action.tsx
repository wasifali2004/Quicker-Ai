"use server";

import { getDBConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPDFText } from "@/lib/langchain";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const generatePDFSummary = async ({fileUrl, fileName}: {fileUrl:string, fileName:string}) => {
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

    // Unified cascade: tries GPT-4o → GPT-4o Mini → Gemini 2.5 Flash → Gemini 2.0 Flash → Gemini 1.5 Flash
    let summary: string | undefined;
    try {
      summary = await generateSummaryFromGemini(pdfText);
      console.log("✨ Summary generated:", summary);
    } catch (aiError: any) {
      console.error("All AI providers failed:", aiError.message);
      return {
        success: false,
        message: `AI generation failed: ${aiError.message}`,
        data: null,
      };
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
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
