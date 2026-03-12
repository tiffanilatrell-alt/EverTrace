import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "evertrace-660fc",
  storageBucket: "evertrace-660fc.firebasestorage.app",
  authDomain: "evertrace-660fc.firebaseapp.com",
  apiKey: "AIzaSyDsoBnfgKt1rWaWFCEIThqOjcAMXySSs4M",
  appId: "1:757938126442:web:1a3f52259e5bf6d8485413"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const APP_ID = "evertrace-660fc";