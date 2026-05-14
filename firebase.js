import admin from "firebase-admin";

export function initFirebase() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }
}

export const db = admin.firestore();

export async function getUser(userId) {
  const doc = await db.collection("users").doc(userId).get();
  return doc.exists ? doc.data() : null;
}

export async function saveMessage(userId, message) {
  await db.collection("users").doc(userId).collection("messages").add({
    text: message,
    timestamp: new Date(),
  });
}