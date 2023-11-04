import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";

const env = import.meta.env;
const key = env.VITE_REACT_API_KEY

const firebaseConfig = {
    apiKey: `${key}`,
    authDomain: "chatverse-6401a.firebaseapp.com",
    databaseURL: "https://chatverse-6401a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chatverse-6401a",
    storageBucket: "chatverse-6401a.appspot.com",
    messagingSenderId: "162574296404",
    appId: "1:162574296404:web:649363226b4112b05f54c1",
    measurementId: "G-L55P5SJSGN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);