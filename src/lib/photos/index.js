import { addDoc, collection, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebaseClient";

// Add a photo to a tribute's photos subcollection
export async function addPhoto(tributeId, photoUrl) {
  const photosRef = collection(db, "tributes", tributeId, "photos");
  const docRef = await addDoc(photosRef, {
    url: photoUrl,
    reactions: { candle: 0, dove: 0, flower: 0 },
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

// Get all photos for a tribute
export async function getPhotos(tributeId) {
  const photosRef = collection(db, "tributes", tributeId, "photos");
  const snapshot = await getDocs(photosRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Increment a reaction for a specific photo
export async function incrementPhotoReaction(tributeId, photoId, type) {
  const photoRef = doc(db, "tributes", tributeId, "photos", photoId);
  await updateDoc(photoRef, {
    [`reactions.${type}`]: increment(1),
  });
}
