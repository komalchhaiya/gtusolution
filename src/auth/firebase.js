import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJYhtDII3j85EvImn9tTqs6e3PYGrjrqw",
  authDomain: "gtu-solution.firebaseapp.com",
  projectId: "gtu-solution",
  storageBucket: "gtu-solution.firebasestorage.app",
  messagingSenderId: "658478369866",
  appId: "1:658478369866:web:3253493605177ca1b86ab3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signupWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);
