import OpenAI from "openai";
import { db, saveMessage } from "./firebase.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function handleIncomingMessage(userId, text) {
  await saveMessage(userId, text);

  const systemPrompt = `
You are Gilbert's empathetic AI assistant. 
Capabilities: reminders, email summaries, calendar, expense tracking, automation rules.
Always respect subscription limits. Respond empathetically when user vents.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: text },
    ],
  });

  return response.choices[0].message.content;
}