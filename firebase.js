import admin from "firebase-admin";

// Service account setup
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
};

// Initialize Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Firestore database reference
const db = admin.firestore();

// Example helper function
const saveMessage = async (message) => {
  await db.collection("messages").add({
    text: message,
    createdAt: new Date()
  });
};

export { db, saveMessage };
