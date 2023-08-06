import React, { useState, useEffect } from 'react'
import './Chat.sass'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../../firebase-config'

const Chat = ({ room }) => {
    const [newMessage, setNewMessage] = useState('')
    const [user, setUser] = useState(null)

    const messagesRef = collection(db, 'messages')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })

        return () => unsubscribe()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage === '') return
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: user ? user.displayName : 'Anonymous',
            room: room,
        })
        setNewMessage('')
    }

    return (
        <div className='chat-app'>
            <form onSubmit={handleSubmit} className='new-message-form'>
                <input onChange={(e) => setNewMessage(e.target.value)} className='new-message-input' placeholder='Type your message here' value={newMessage} />
                <button type='submit' className='send-button'>Send</button>
            </form>
        </div>
    )
}

export default Chat