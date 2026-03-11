import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

// ── Providers ──────────────────────────────────────────────────────────────────

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "",
});

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// ── Type alias ────────────────────────────────────────────────────────────────

type AnyModel = Parameters<typeof generateText>[0]["model"];

// ── Key validation: 1-token probe to surface auth/quota errors ────────────────

async function isModelAvailable(
  model: AnyModel,
  label: string,
): Promise<boolean> {
  try {
    await generateText({ model, prompt: "hi", maxOutputTokens: 1 });
    console.log(`✅ ${label} is available`);
    return true;
  } catch (err) {
    const e = err as {
      message?: string;
      statusCode?: number;
      status?: number;
      code?: string;
    };
    const status = e?.statusCode ?? e?.status ?? 0;
    const msg = e?.message ?? String(err);

    if (status === 429 || msg.includes("quota") || msg.includes("429")) {
      console.warn(`⚠️  ${label}: quota exceeded, skipping`);
    } else {
      console.warn(`⚠️  ${label}: ${status} ${msg.slice(0, 120)}`);
    }
    return false;
  }
}

// ── Unified model cascade for summary generation ─────────────────────────────

const modelCascade: { getModel: () => AnyModel; label: string; hasKey: () => boolean }[] = [
  // OpenAI models (try first — more reliable)
  {
    getModel: () => openai("gpt-4o"),
    label: "GPT-4o",
    hasKey: () => !!process.env.OPENAI_API_KEY,
  },
  {
    getModel: () => openai("gpt-4o-mini"),
    label: "GPT-4o Mini",
    hasKey: () => !!process.env.OPENAI_API_KEY,
  },
  // Gemini cascade (newest first)
  {
    getModel: () => google("gemini-2.5-flash"),
    label: "Gemini 2.5 Flash",
    hasKey: () => !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
  },
  {
    getModel: () => google("gemini-2.0-flash"),
    label: "Gemini 2.0 Flash",
    hasKey: () => !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
  },
  {
    getModel: () => google("gemini-2.0-flash-001"),
    label: "Gemini 2.0 Flash 001",
    hasKey: () => !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
  },
  {
    getModel: () => google("gemini-1.5-flash"),
    label: "Gemini 1.5 Flash",
    hasKey: () => !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
  },
];

// ── Core Function ─────────────────────────────────────────────────────────────

export const generateSummaryFromGemini = async (pdfText: string) => {
  for (const { getModel, label, hasKey } of modelCascade) {
    // Skip if required API key is missing
    if (!hasKey()) continue;

    const model = getModel();

    if (await isModelAvailable(model, label)) {
      try {
        const { text } = await generateText({
          model,
          system: SUMMARY_SYSTEM_PROMPT,
          prompt: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
          temperature: 0.7,
          maxOutputTokens: 1500,
        });

        if (!text) {
          throw new Error(`Empty response from ${label}`);
        }

        console.log(`✨ Summary generated using ${label}`);
        return text;
      } catch (genErr: any) {
        console.error(`❌ Error generating with ${label}:`, genErr.message);
        continue;
      }
    }
  }

  throw new Error("All AI providers exhausted or API keys invalid.");
};