import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCAUU2ldckwuRshJKYH_MxBjSJxrKYRBwE",
  authDomain: "darkc-c9893.firebaseapp.com",
  projectId: "darkc-c9893",
  storageBucket: "darkc-c9893.appspot.com",
  messagingSenderId: "876133936164",
  appId: "1:876133936164:web:3d3bd2da4dc98b70b9bcb1",
  measurementId: "G-DQ63TYXWD7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)