import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import process from "node:process";
import "dotenv/config";

const github = createOpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_TOKEN,
});

const todoHtmlSample = `
<body>
  <h1>Today\'s Todos</h1>
  <ul>
    <li>
      <h2>Buy groceries</h2>
      <p>Milk, eggs, and bread.</p>
    </li>
    <li>
      <h2>Email John</h2>
      <p>Share the meeting notes.</p>
    </li>
    <li>
      <h2>Workout</h2>
      <p>Quick 20-minute run.</p>
    </li>
  </ul>
</body>
`;

const schema = z.object({
  todos: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    })
  ),
});

// https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
const { object } = await generateObject({
  model: github.chat("gpt-4.1-nano"),
  schema,
  prompt: `Extract a concise todo list (title and short description) from the following HTML. Return strictly as the provided JSON schema. HTML: ${todoHtmlSample}`,
});

// The object is fully typed according to the schema
console.log(JSON.stringify(object, null, 2));
