import React, { useState } from 'react'
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

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <button onClick={signInWithGoogle}>Sign In With Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})

  const [formValue, setFormValue] = useState('')

  const sendMessage = async(e) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
  }

  return (
    <>
      <div>
        {messages && messages.map(message => <ChatMessage key={message.id} message={message} />)}
      </div>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt='profile' />
      <p>{text}</p>
    </div>
  )
}

export default App;
