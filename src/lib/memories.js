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
    author: payload.author,
    text: payload.text,
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