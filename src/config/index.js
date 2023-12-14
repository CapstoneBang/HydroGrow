import serviceAccount from "./serviceAccount.js";
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hydrogrow-d1a05.firebaseio.com",
});

const db = admin.firestore();

export { db };
