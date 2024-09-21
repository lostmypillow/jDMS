//onsnapshot that invokes the importToDb function

import { initializeApp } from "firebase/app";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";

import { connectFirestoreEmulator } from "firebase/firestore";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmPsIFIEUigPbpmMhUAiu9KP_7r8TO8RI",

  authDomain: "jdms-63d90.firebaseapp.com",

  projectId: "jdms-63d90",

  storageBucket: "jdms-63d90.appspot.com",

  messagingSenderId: "448710525764",

  appId: "1:448710525764:web:f398e07746fadf0034cd11",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db, doc, onSnapshot, getFirestore };
