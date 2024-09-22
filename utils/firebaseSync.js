import { initializeApp } from "firebase/app";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { connectFirestoreEmulator } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",
  authDomain: "compassprdms.firebaseapp.com",
  projectId: "compassprdms",
  storageBucket: "compassprdms.appspot.com",
  messagingSenderId: "189553958868",
  appId: "1:189553958868:web:38e313ca61559c42d74041",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const snapshotLinks = ref([]);
const newLinks = ref([]);
const count = ref(0);
export default function () {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  const now = new Date();
  const collectionName = String(now.getFullYear());
  const documentName = `${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}`;
  const docRef = doc(db, collectionName, documentName);
  onSnapshot(docRef, async (doc) => {
    const docData = doc.data() ? doc.data() : "No doc data";
    console.log("Current data: ", docData);
    newLinks.value = doc.data()
      ? doc.data().links.filter((x) => !snapshotLinks.value.includes(x))
      : "no new links";
    console.log("New Link: ", newLinks.value);
    snapshotLinks.value = doc.data() ? doc.data().links : "no snapshot links";
    console.log("new Snapshot: ", snapshotLinks.value);
  });
}
