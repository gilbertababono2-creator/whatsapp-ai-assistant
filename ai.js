import { db as firebaseDb, saveMessage as firebaseSaveMessage } from "./firebase.js";
import OpenAI from "openai";

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Single unified function to handle incoming WhatsApp messages
const handleIncomingMessage = async (msg, from) => {
  try {
    // Save message to Firestore using the aliased function
    await firebaseSaveMessage(msg, from);
    console.log("Message saved to Firestore ✅");

    // Generate AI response using GPT-4
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are Gilbert's empathetic AI assistant. Capabilities: reminders, email summaries, web search, calendar events, expense tracking, automation rules, empathetic responses, and subscription enforcement." },
        { role: "user", content: msg }
      ]
    });

    // Return the assistant's reply
    return response.choices[0].message.content;

  } catch (error) {
    console.error("Error in handleIncomingMessage:", error);
    return "Sorry, something went wrong while processing your message.";
  }
};

export { handleIncomingMessage };

  const systemPrompt = `
You are Gilbert's empathetic AI assistant. 
Capabilities: reminders, email summaries, calendar, expense tracking, automation rules.
Always respect subscription limits. Respond empathetically when user vents.
`;

  
