
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMnuhcxcII83ErrX7XooatKuwjSXnvZuM",
  authDomain: "corerespaldo-5e959.firebaseapp.com",
  projectId: "corerespaldo-5e959",
  storageBucket: "corerespaldo-5e959.appspot.com",
  messagingSenderId: "248676109106",
  appId: "1:248676109106:web:b93edb9d7223e39670e52b"
};
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);