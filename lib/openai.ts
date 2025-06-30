import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateSummaryFromOpenAI(pdfText: string) {
  console.log("API KEY:", process.env.OPENAI_API_KEY); // Should not be undefined
  try {
    if (!pdfText) {
      throw new Error("No PDF text provided");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Cheaper alternative
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Please analyze this document and create a comprehensive summary following the exact format requirements. Focus on extracting the most valuable insights, practical recommendations, and key takeaways that would be most useful to someone trying to understand the main value and actionable points from this content:${pdfText.slice(0, 4000)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return (
      completion.choices[0]?.message?.content
    );
  } catch (err: any) {
    console.error("OpenAI Error:", err);
    if (err?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    throw new Error(`Failed to generate summary: ${err.message}`);
  }
}
