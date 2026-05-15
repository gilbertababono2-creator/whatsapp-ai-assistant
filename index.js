import express from "express";
import bodyParser from "body-parser";
import { handleIncomingMessage } from "./ai.js";
import { sendWhatsAppMessage } from "./twilio.js";
import { checkSubscription } from "./payments.js";
import { db, saveMessage } from "./firebase.js";


const app = express();
app.use(bodyParser.json());
initFirebase();

app.post("/webhook", async (req, res) => {
  try {
    const { Body, From } = req.body;
    const userId = From;

    const active = await checkSubscription(userId);
    if (!active) {
      await sendWhatsAppMessage(userId, "Your trial has ended. Please subscribe: https://paystack.com/pay/assistant");
      return res.sendStatus(200);
    }

    const reply = await handleIncomingMessage(userId, Body);
    await sendWhatsAppMessage(userId, reply);
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(500);
  }
});

app.post("/paystack/webhook", async (req, res) => {
  // handle subscription events
  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
app.get("/", (req, res) => {
  res.send("Assistant backend is live ✅");
});
