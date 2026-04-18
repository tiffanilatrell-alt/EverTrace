import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseClient";

export async function logGroundsEvent(eventName, payload = {}) {
  try {
    await addDoc(collection(db, "grounds_click_events"), {
      eventName,
      ...payload,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    // Event logging should never block user flow.
    console.error("Failed to log grounds event", error);
  }
}
