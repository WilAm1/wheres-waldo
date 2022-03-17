// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxMjnA-uIRnLZHJ17wzseualxqVvVrF48",
  authDomain: "wheres-waldo-3d4dc.firebaseapp.com",
  projectId: "wheres-waldo-3d4dc",
  storageBucket: "wheres-waldo-3d4dc.appspot.com",
  messagingSenderId: "100284209055",
  appId: "1:100284209055:web:e025b1cc16cb0ad59d0faa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const LIMIT = 20;
export const queryTopScores = query(
  collection(db, "users"),
  orderBy("span"),
  limit(LIMIT)
);
