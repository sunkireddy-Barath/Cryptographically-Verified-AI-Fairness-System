// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAI4cYTawxZfOuH4UBoC8qvpovTt0c88WY",
  authDomain: "cit-chennai.firebaseapp.com",
  projectId: "cit-chennai",
  storageBucket: "cit-chennai.firebasestorage.app",
  messagingSenderId: "411587368926",
  appId: "1:411587368926:web:34a33dbaa80598a8bfef4f",
  measurementId: "G-BGW8NG7M60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
