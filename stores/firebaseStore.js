const firebaseConfig = {
  apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",
  authDomain: "compassprdms.firebaseapp.com",
  projectId: "compassprdms",
  storageBucket: "compassprdms.appspot.com",
  messagingSenderId: "189553958868",
  appId: "1:189553958868:web:38e313ca61559c42d74041",
};

import { initializeApp } from "firebase/app";
import {
  collection,
  query,
  where,
  setDoc,
  onSnapshot,
  getFirestore,
  getDoc,
} from "firebase/firestore";
import { store } from "./store";
import { connectFirestoreEmulator } from "firebase/firestore";
const app = initializeApp(firebaseConfig);

export const firebaseStore = reactive({
  db: null,
  currentlyEditingDoc: null,
  initDb() {
    this.db = getFirestore(app);
  },
  collectionRef(category) {
    return collection(this.db, store.currentYear, store.currentDate, category);
  },
  docRef(category, id) {
    return doc(this.collectionRef(category), id);
  },
  async docSnap(category, id) {
    return await getDoc(this.docRef(data.category, data.id));
  },
  async returnPriority(category) {
    return (
      (await getCountFromServer(this.collectionRef(category))).data().count + 1
    );
  },
  async createDoc(data) {
    data["priority"] = this.returnPriority(data.category);
    await setDoc(this.docRef(data.category, data.id), data, { merge: true });
  },
  async updateDoc(data) {
    const docSnap = this.docSnap(data.category, data.id);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.currentlyEditingDoc = docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    var categoryChanged = determineCategoryChange(
      docSnap.data(),
      this.currentlyEditingDoc
    );
    var priorityChanged = determinePriorityChange(
      docSnap.data(),
      this.currentlyEditingDoc
    );

    if (priorityChanged) {
      //handle priority change
      if (priorityChanged == "down") {
        //handle dwn
        const nextDocRef = doc(targetColRef, data.id + 1);
        await updateDoc(docRef, {
          priority: increment(1),
        });
        await updateDoc(nextDocRef, {
          priority: increment(-1),
        });
      } else {
        const prevDocRef = doc(targetColRef, data.id - 1);
        await updateDoc(docRef, {
          priority: increment(-1),
        });
        await updateDoc(prevDocRef, {
          priority: increment(1),
        });
      }
    } else if (categoryChanged) {
      //handle category change
      await deleteDoc(docRef);
      await addData(editedRefData.value);
    } else {
      //normal updated
      await updateDoc(docRef, editedRefData.value);
    }
  },
});
