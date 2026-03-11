import { initialMessage } from "@/lib/data";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import {
  generateText,
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  type UIMessage,
  type ModelMessage,
} from "ai";

// ── Providers ──────────────────────────────────────────────────────────────────

function getGoogleProvider() {
  return createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || "",
  });
}

function getOpenAIProvider() {
  return createOpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });
}

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
    // Don't log 429 as error, it's just quota-exceeded (temporary)
    if (status === 429 || msg.includes("quota") || msg.includes("429")) {
      console.warn(`⚠️  ${label}: quota exceeded, skipping`);
    } else {
      console.warn(`⚠️  ${label}: ${status} ${msg.slice(0, 120)}`);
    }
    return false;
  }
}

// ── Route ──────────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  let body: { messages: UIMessage[] };
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const { messages } = body;
  if (!messages || messages.length === 0) {
    return new Response("No messages provided", { status: 400 });
  }

  const modelMessages: ModelMessage[] = await convertToModelMessages(messages);

  function streamResponse(model: AnyModel) {
    const result = streamText({
      model,
      system: initialMessage.content,
      messages: modelMessages,
      temperature: 0.7,
      maxOutputTokens: 2048,
    });
    return createUIMessageStreamResponse({
      stream: result.toUIMessageStream(),
    });
  }

  const google = getGoogleProvider();
  const openai = getOpenAIProvider();

  // ── Unified model cascade ────────────────────────────────────────────────
  const modelCascade: { provider: any; id: string; label: string }[] = [
    // OpenAI New Models
    { provider: openai, id: "gpt-4o", label: "GPT-4o" },
    { provider: openai, id: "gpt-4o-mini", label: "GPT-4o Mini" },
    
    // Gemini model cascade
    { provider: google, id: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
    { provider: google, id: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
    { provider: google, id: "gemini-2.0-flash-001", label: "Gemini 2.0 Flash 001" },
    { provider: google, id: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
  ];

  for (const item of modelCascade) {
    // Skip if key is missing for the provider
    if (item.label.includes("GPT") && !process.env.OPENAI_API_KEY) continue;
    if (item.label.includes("Gemini") && !process.env.GOOGLE_API_KEY && !process.env.GEMINI_API_KEY) continue;

    const model = item.provider(item.id);
    if (await isModelAvailable(model, item.label)) {
      return streamResponse(model);
    }
  }

  console.warn("⚠️ All providers exhausted — no models left.");

  // ── All providers exhausted ───────────────────────────────────────────────
  return new Response(
    JSON.stringify({
      error:
        "All AI providers are currently unavailable (quota exceeded or invalid keys). Please try again later.",
    }),
    { status: 503, headers: { "Content-Type": "application/json" } },
  );
}
