import React from 'react'
import './App.css';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyD_Q2bFqNQTbWBR8a7k8xfUkrLdu1ur_Kk",
  authDomain: "darkchat-19b1f.firebaseapp.com",
  projectId: "darkchat-19b1f",
  storageBucket: "darkchat-19b1f.appspot.com",
  messagingSenderId: "786739505167",
  appId: "1:786739505167:web:fd248fae042444f5095b7a",
  measurementId: "G-G8PW6LTW2K"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

const App = () => {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
    <section>
      {user ? <ChatRoom /> : <SignIn />}
    </section>
    </div>
  );
}

export default App;
