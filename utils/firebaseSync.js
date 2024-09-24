import { initializeApp } from "firebase/app";
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import { connectFirestoreEmulator } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",
  authDomain: "compassprdms.firebaseapp.com",
  projectId: "compassprdms",
  storageBucket: "compassprdms.appspot.com",
  messagingSenderId: "189553958868",
  appId: "1:189553958868:web:38e313ca61559c42d74041",
};
import { store } from "~/store";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const snapshotLinks = ref([]);
const snapshotLinksU = ref([]);
const newLinks = ref([]);
const newLinksU = ref([]);
const count = ref(0);
export default function () {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  const now = new Date();
  const collectionName =
    String(now.getFullYear()) +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");
  const collectionNameU =
    String(now.getFullYear()) +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0") +
    "u";
  const q = query(collection(db, collectionName));
  const qu = query(collection(db, collectionNameU));

  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (!snapshotLinks.value.includes(doc.data())) {
        snapshotLinks.value.push(doc.data());
      }
    });
    console.log("snapshot: ", snapshotLinks.value);
  });
  onSnapshot(qu, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (!snapshotLinksU.value.includes(doc.data())) {
        snapshotLinksU.value.push(doc.data());
      }
    });
    console.log("snapshotU: ", snapshotLinksU.value);
  });
  // onSnapshot(docRef, async (doc) => {
  //   store.isImportingLINE = true

  //   const docData = doc.data() ? doc.data() : "No doc data";
  //   console.log("Current data: ", docData);
  // newLinks.value = doc.data()
  //   ? doc.data().links.filter((x) => !snapshotLinks.value.includes(x))
  //   : "no new links";
  // console.log("New Link: ", newLinks.value);
  // await manualImport(newLinks.value)
  // snapshotLinks.value = doc.data() ? doc.data().links : "no snapshot links";
  // console.log("new Snapshot: ", snapshotLinks.value);
  //   store.isImportingLINE = false
  // });
}
