// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-df142.firebaseapp.com",
  projectId: "chat-df142",
  storageBucket: "chat-df142.appspot.com",
  messagingSenderId: "837281098580",
  appId: "1:837281098580:web:0657a2dc662ce5cfd636c1",
  measurementId: "G-CKB57G1CZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services with the app instance
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
