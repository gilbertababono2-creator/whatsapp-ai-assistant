import schedule from "node-schedule";
import { db } from "./firebase.js";
import { sendWhatsAppMessage } from "./twilio.js";

export function scheduleReminder(userId, reminderText, time) {
  schedule.scheduleJob(time, async () => {
    await sendWhatsAppMessage(userId, `Reminder: ${reminderText}`);
  });
  db.collection("users").doc(userId).collection("reminders").add({ reminderText, time });
}