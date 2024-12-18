import { initializeApp, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCqTaYbSfwFvfPKpBq1SHgfDzgVQMnpG0",
  authDomain: "mofilabs.firebaseapp.com",
  projectId: "mofilabs",
  storageBucket: "mofilabs.appspot.com",
  messagingSenderId: "598464211339",
  appId: "1:598464211339:web:df59668eb6bc86505a678e",
  measurementId: "G-SCYM167B7B"
};

function getOrInitApp() {
  try {
    return initializeApp(firebaseConfig);
  } catch (e) {
    console.error(e);
  }
  return getApp();
}

export const app = getOrInitApp();
export const firestore = getFirestore(app);
