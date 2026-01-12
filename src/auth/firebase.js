// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJYhtDII3j85EvImn9tTqs6e3PYGrjrqw",
  authDomain: "gtu-solution.firebaseapp.com",
  projectId: "gtu-solution",
  storageBucket: "gtu-solution.firebasestorage.app",
  messagingSenderId: "658478369866",
  appId: "1:658478369866:web:3253493605177ca1b86ab3",
};

// ✅ Initialize Firebase FIRST
export const app = initializeApp(firebaseConfig);

// ✅ Initialize Analytics AFTER app
export const analytics = getAnalytics(app);

// ✅ Initialize Auth
export const auth = getAuth(app);

// ✅ Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

// ✅ Google Login
export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// ✅ Email + Password Signup
export const signupWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// ✅ Email + Password Login
export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// ✅ Logout
export const logoutUser = () => signOut(auth);
