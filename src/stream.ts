import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import process from "node:process";
import "dotenv/config";

const github = createOpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_TOKEN,
});

// https://ai-sdk.dev/docs/ai-sdk-core/generating-text#streamtext
const { textStream } = streamText({
  model: github.chat("gpt-4.1-nano"),
  prompt: "Write a very short poem about the sea.",
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
process.stdout.write("\n");
