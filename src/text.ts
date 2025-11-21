import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import process from "node:process";
import "dotenv/config";

const github = createOpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_TOKEN,
});

// https://ai-sdk.dev/docs/ai-sdk-core/generating-text#generatetext
const { text } = await generateText({
  model: github.chat("gpt-4.1-nano"),
  prompt: "Say hi in one sentence",
});

console.log(text);
