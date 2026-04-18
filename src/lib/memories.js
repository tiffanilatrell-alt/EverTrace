import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseClient";

export async function addMemory(tributeId, payload) {
  const memoriesRef = collection(db, "tributes", tributeId, "memories");


  const docRef = await addDoc(memoriesRef, {
    contributorName: payload.contributorName || payload.author || "",
    memoryText: payload.memoryText || payload.text || "",
    photoUrl: payload.photoUrl || "",
    // Keep legacy fields for backwards compatibility with older rendering code.
    author: payload.author || payload.contributorName || "",
    text: payload.text || payload.memoryText || "",
    createdAt: serverTimestamp(),
    reactions: {
      candle: 0,
      respect: 0,
      flower: 0,
    },
  });

  return docRef.id;
}

export async function getMemories(tributeId) {
  const memoriesRef = collection(db, "tributes", tributeId, "memories");
  const q = query(memoriesRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}