import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",
    authDomain: "compassprdms.firebaseapp.com",
    projectId: "compassprdms",
    storageBucket: "compassprdms.appspot.com",
    messagingSenderId: "189553958868",
    appId: "1:189553958868:web:38e313ca61559c42d74041",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Provide Firebase services globally in the app
  nuxtApp.provide("firebase", { db });
});
