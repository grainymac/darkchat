import React, { useState, useEffect } from 'react'
import './Chat.sass'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { db, auth } from '../../firebase-config'

const Chat = ({ room }) => {
    const [user, setUser] = useState(null)
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const messagesRef = collection(db, 'messages')

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy('createdAt'))
        
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }

            onSnapshot(queryMessages, (snapshot) => {
                let messages = []
                snapshot.forEach((doc) => {
                    messages.push({ ...doc.data(), id: doc.id })
                })
                setMessages(messages)
            })
        })

        return () => unsubscribe()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage === '') return
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: user ? user.displayName : 'User:',
            room: room,
        })
        setNewMessage('')
    }

    return (
        <div className='chat-app'>
            <div className='header'>
                <h1>Welcome to: {room.toUpperCase()} </h1>
            </div>
            <div className='messages'> 
                {messages.map((message) => (
                    <div className='message' key={message.id}>
                        <span className='user'>{message.user} </span>
                        {message.text}
                    </div>
                    ))} 
            </div>
            <form onSubmit={handleSubmit} className='new-message-form'>
                <input onChange={(e) => setNewMessage(e.target.value)} className='new-message-input' placeholder='Type your message here' value={newMessage} />
                <button type='submit' className='send-button'>Send</button>
            </form>
        </div>
    )
}

export default Chat