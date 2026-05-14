import { db } from "./firebase.js";

export async function executeRules(userId, event) {
  const rules = await db.collection("users").doc(userId).collection("rules").get();
  rules.forEach(rule => {
    const data = rule.data();
    if (event.type === data.trigger) {
      // Example: save invoice to Google Drive
      console.log("Executing rule:", data);
    }
  });
}