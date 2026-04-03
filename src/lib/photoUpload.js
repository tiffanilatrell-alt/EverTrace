// Single-photo upload for memory attachments
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { storage } from "../firebaseClient";

export async function uploadMemoryPhoto(tributeId, file) {
  if (!tributeId || !file) return "";

  const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const storageRef = ref(storage, `tributes/${tributeId}/memories/${safeName}`);

  await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);

  return downloadUrl;
}
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseClient";
import { addPhoto } from "./photos";

export async function uploadTributePhotos(tributeId, files) {
  if (!files || files.length === 0) {
    return [];
  }

  const uploadResults = await Promise.all(
    files.map(async (file, index) => {
      const safeName = `${Date.now()}-${index}-${file.name}`;
      const fileRef = ref(storage, `tributes/${tributeId}/photos/${safeName}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      // Create photo doc in Firestore
      const photoId = await addPhoto(tributeId, downloadURL);
      return {
        id: photoId,
        url: downloadURL,
        caption: ""
      };
    })
  );
  return uploadResults;
}