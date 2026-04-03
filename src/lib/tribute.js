import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseClient";

export async function createTribute(payload) {
  const tributesRef = collection(db, "tributes");

  const docRef = await addDoc(tributesRef, {
    name: payload.name,
    relationship: payload.relationship,
    message: payload.message,
    creatorName: payload.creatorName,
    email: payload.email,
    visibility: payload.visibility,
    allowPhotoReactions: payload.allowPhotoReactions ?? true,
    photoCount: payload.photoCount ?? 0,
    photoUrls: payload.photoUrls ?? [],
    birthYear: payload.birthYear ?? "",
    passingYear: payload.passingYear ?? "",
    highlights: payload.highlights ?? [],
    theme: payload.theme ?? "light",
    // Ownership fields
    ownerEmail: payload.ownerEmail ?? payload.email ?? "",
    candleCount: 0,
    primaryPhotoId: payload.primaryPhotoId ?? "",
    primaryPhotoUrl: payload.primaryPhotoUrl ?? "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getTributeById(tributeId) {
  const tributeRef = doc(db, "tributes", tributeId);
  const snapshot = await getDoc(tributeRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}


export async function updateTribute(tributeId, updates) {
  const tributeRef = doc(db, "tributes", tributeId);
  await updateDoc(tributeRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}