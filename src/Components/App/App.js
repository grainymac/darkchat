import React, { useState, useRef } from 'react'
import './App.sass'
import Auth from '../Auth/Auth'
import Chat from '../Chat/Chat'
import Cookies from 'universal-cookie'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-config'
import logOut from '../../assets/logout.png'

const cookies = new Cookies()

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null)

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  }

  return (
    <>
      <div className='app'>
        {room ? (
          <Chat room={room} />
        ) : (
          <div className='room'>
            <label>Enter Room Name:</label>
            <input ref={roomInputRef} />
            <button onClick={() => setRoom(roomInputRef.current.value)}> Enter Chat</button>
          </div>
        )}
        <div className='sign-out'>
          <button onClick={signUserOut}>
            <img src={logOut} alt='logout' />
          </button>
        </div>
      </div>
    </>
  )
}

export default App