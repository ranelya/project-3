import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCHKIMw2oQh7krSU0EyLTKsKII5Vs21qmo",
  authDomain: "ogogopizza.firebaseapp.com",
  projectId: "ogogopizza",
  storageBucket: "ogogopizza.appspot.com",
  messagingSenderId: "177340116698",
  appId: "1:177340116698:web:2a322e81dbd854cb403fe3",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app); 
export { db, storage };
