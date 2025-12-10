// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth , GoogleAuthProvider, signOut, signInWithPopup , createUserWithEmailAndPassword , signInWithEmailAndPassword

} from 'firebase/auth';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJYhtDII3j85EvImn9tTqs6e3PYGrjrqw",
  authDomain: "gtu-solution.firebaseapp.com",
  projectId: "gtu-solution",
  storageBucket: "gtu-solution.firebasestorage.app",
  messagingSenderId: "658478369866",
  appId: "1:658478369866:web:3253493605177ca1b86ab3"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize auth+ google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//export login function with google
export const loginWithGoogle = ()=>{
    return signInWithPopup(auth , googleProvider)
};

// Email + Password Signup
export const signupWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Email + Password Login
export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);