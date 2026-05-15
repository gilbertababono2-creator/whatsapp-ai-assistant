
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

export { db, saveMessage };
