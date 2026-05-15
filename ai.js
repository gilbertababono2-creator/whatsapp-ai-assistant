import OpenAI from "openai";
import admin from "firebase-admin";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// Helper function to save WhatsApp messages
const saveMessage = async (message, sender) => {
  await db.collection("messages").add({
    sender: sender,
    text: message,
    createdAt: new Date()
  });
};

export { db, saveMessage };admin.initializeApp;


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
 import { db as firebaseDb, saveMessage as firebaseSaveMessage } from "./firebase.js";

const handleIncomingMessage = async (msg, from) => {
  await saveMessage(msg, from);
  console.log("Message saved to Firestore ✅");
  
// Use firebaseSaveMessage for Firestore
const handleIncomingMessage = async (msg, from) => {
  await firebaseSaveMessage(msg, from);
};

