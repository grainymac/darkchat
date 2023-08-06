// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_Q2bFqNQTbWBR8a7k8xfUkrLdu1ur_Kk",
  authDomain: "darkchat-19b1f.firebaseapp.com",
  projectId: "darkchat-19b1f",
  storageBucket: "darkchat-19b1f.appspot.com",
  messagingSenderId: "786739505167",
  appId: "1:786739505167:web:fd248fae042444f5095b7a",
  measurementId: "G-G8PW6LTW2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()