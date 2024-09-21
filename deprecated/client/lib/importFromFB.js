import { connectFirestoreEmulator } from "firebase/firestore";
import { doc, db, onSnapshot } from "./firebaseService";
import { importToDb } from "./importToDb";
import { store } from "../src/store";
import { ref } from "vue";
const snapshotLinks = ref([]);
const newLinks = ref([]);
const count = ref(0);

export async function importFromFB() {
  // connectFirestoreEmulator(db, "127.0.0.1", 8080);
  const now = new Date();
  const collectionName = String(now.getFullYear()); // e.g., 20240824
  const documentName = `${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}`;
  const docRef = doc(db, collectionName, documentName);
  onSnapshot(docRef, async (doc) => {
    store.isReceiving = !store.isReceiving;
    console.log("Current data: ", doc.data());
    newLinks.value = doc
      .data()
      .links.filter((x) => !snapshotLinks.value.includes(x));
    store.fromFire = newLinks.value;
    await importToDb(store.fromFire);
    console.log("New Link: ", newLinks.value);
    snapshotLinks.value = doc.data().links;
    console.log("new Snapshot: ", snapshotLinks.value);
    store.isReceiving = !store.isReceiving;
  });

  await importToDb(store.fromFire);
}
