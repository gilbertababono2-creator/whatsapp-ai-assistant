import axios from "axios";
import { db } from "./firebase.js";

export async function checkSubscription(userId) {
  const user = await db.collection("users").doc(userId).get();
  if (!user.exists) return true; // allow trial
  const data = user.data();
  return data.subscriptionActive || data.trialMessages < 50;
}

export async function createSubscription(userId, plan) {
  const res = await axios.post("https://api.paystack.co/transaction/initialize", {
    email: `${userId}@example.com`,
    amount: plan * 100,
  }, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
  });
  return res.data;
}