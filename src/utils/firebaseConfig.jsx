import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNP3awqRKg54evdkoFcTpcmhu364IHGAE",
  authDomain: "auction-website-3ba57.firebaseapp.com",
  projectId: "auction-website-3ba57",
  storageBucket: "auction-website-3ba57.appspot.com",
  messagingSenderId: "988581494489",
  appId: "1:988581494489:web:9eec55ee4e7429c9b048c8",
  measurementId: "G-1YH8YMZX51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
