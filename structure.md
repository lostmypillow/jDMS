 - 2024 (collection)
   - 0924 (document)
     - "Qualcomm相關新聞" (collection)
       - news1 (document)
       - news2
     - "MediaTek相關新聞"
     - "無線通訊市場"
     - "智慧型手機/消費性電子產品"
     - "其他業界重要訊息"
   - 0925 (document)


```js
const data = {
    id: 0,
    priority: '',
    title: '',
  date: '',
  source: '',
  author: '',
  category: '',
  content: '',

};

// Create Nodejs
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

initializeApp();

const db = getFirestore();
const data
const targetColRef = db.collection('2024').doc('0924').collection(data.category)
data["priority"]  = (await targetColRef.count().get()).data().count + 1 //e.g. 0 + 1

const res = await targetColRef.doc(data.id).set(data);


//initialization web
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const firebaseConfig = {
    FIREBASE_CONFIGURATION


};
const data

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// add/create data Web
async function addData(data) {
    const targetColRef = collection(db, '2024', '0924', data.category)
    data["priority"] = (await getCountFromServer(targetColRef)).data().count;
    await setDoc(doc(targetColRef, data.id), data, { merge: true });
}



//update data
//// first get data



//read data web

import { onSnapshot } from "firebase/firestore";
import {  doc,collection, query, where, onSnapshot } from "firebase/firestore";
let store
const q = query(collection(db, '2024', '0924', "Qualcomm相關新聞"));
const m = query(collection(db, '2024', '0924', "MediaTek相關新聞"));
const c = query(collection(db, '2024', '0924', "無線通訊市場"));
const p = query(collection(db, '2024', '0924', "智慧型手機/消費性電子產品"));
const o = query(collection(db, '2024', '0924', "其他業界重要訊息"));


// Define the function to handle snapshot updates
function handleSnapshot(querySnapshot) {
    querySnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
            console.log("New data: ", change.doc.data());
            store.data.push(change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified data: ", change.doc.data());
            const index = store.data.findIndex(obj => obj.id === change.doc.data().id);
            if (index !== -1) {
                // Overwrite the existing object
                store.data[index] = change.doc.data();
            }
        }
        if (change.type === "removed") {
            const index = store.data.findIndex(obj => obj.id === change.doc.data().id);
            if (index !== -1) {
                store.data.splice(index, 1);
            }
            console.log("Removed data: ", change.doc.data());
        }
    });
}


const qualcomm = onSnapshot(q, handleSnapshot);
const mediatek = onSnapshot(m, handleSnapshot);
const commu = onSnapshot(c, handleSnapshot);
const phone = onSnapshot(p, handleSnapshot);
const other = onSnapshot(o, handleSnapshot);


```