import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAS_5PmZhCrKn0EiWyXIZt2DuUYZsdEu8g",
  authDomain: "to-do-list-28a77.firebaseapp.com",
  databaseURL: "https://to-do-list-28a77-default-rtdb.firebaseio.com",
  projectId: "to-do-list-28a77",
  storageBucket: "to-do-list-28a77.appspot.com",
  messagingSenderId: "725875554609",
  appId: "1:725875554609:web:1a4e972366027a7d479810"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();