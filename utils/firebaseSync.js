import { initializeApp } from "firebase/app";
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import { connectFirestoreEmulator } from "firebase/firestore";

import { store } from "~/store";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const snapshotLinks = ref([]);
const snapshotLinksU = ref([]);
const newLinks = ref([]);
const newLinksU = ref([]);
const count = ref(0);
export default function () {
  // connectFirestoreEmulator(db, "127.0.0.1", 8080);
  const now = new Date();
  const collectionName =
    String(now.getFullYear()) +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  const q = query(collection(db, collectionName));

  onSnapshot(q, (snapshot) => {
    let newArray = [];
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New news content: ", change.doc.data());
        if (change.doc.data().error == "unsupported") {
          store.unsupportedLinks.push(change.doc.data());
          console.log("this is an unsupported link, moving to unsupported");
        } else {
          store.addItem(change.doc.data())
          // store.data.push(change.doc.data());
          console.log("this is a supported link, moving to main store");
        }
      }
      if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
        if (change.doc.data().error == "cleared") {
         resolveClearedLinks(change.doc.data())
         
        }
        newArray.push(change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
      }
    });
    const originalArray = [...store.data];
  });
  // onSnapshot(qu, (querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     if (!snapshotLinksU.value.includes(doc.data())) {
  //       snapshotLinksU.value.push(doc.data());
  //     }
  //   });
  //   console.log("snapshotU: ", snapshotLinksU.value);
  // });
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
