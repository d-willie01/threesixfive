// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADDCACU1tgmmGGcG0R2jqW0DPOsGTTmbs",
  authDomain: "threesixfive-1b6e6.firebaseapp.com",
  projectId: "threesixfive-1b6e6",
  storageBucket: "threesixfive-1b6e6.appspot.com",
  messagingSenderId: "62281878297",
  appId: "1:62281878297:web:630c11ab187aa9a5abd388",
  measurementId: "G-285DJ03S6S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

