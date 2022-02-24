import React, { useEffect, useState } from 'react'

import {
    ScrollView,
} from 'react-native'
import { io } from 'socket.io-client'
import { useAuth } from '../../hooks/auth'
import { api } from '../../service/api'
import { Message, MessageProps } from '../Message'

let messagesQueue = [] as MessageProps[]

const socket = io(String(api.defaults.baseURL))

socket.on('new_message', (newMessage:MessageProps)=>{
    messagesQueue.push(newMessage)
})

import { styles } from './styles'

export const MessageList = () =>{
    const [ currentMessage, setCurrentMessage ] = useState<MessageProps[]>()

    const { user } = useAuth()

    useEffect(()=> {
        const fetchMessages = async () =>{
            const messageResponse = await api.get<MessageProps[]>('/messages/last-3')
            setCurrentMessage(messageResponse.data)
        }

        fetchMessages()
    }, [])

    useEffect(()=> {

        const timer =  setInterval(()=> {
                if(messagesQueue.length> 0){
                    setCurrentMessage(prevState => [
                        messagesQueue[0],
                        prevState[0],
                        prevState[1]
                    ].filter(Boolean))

                    messagesQueue.shift()
                }
            }, 3000)
        
        return () => clearInterval(timer)

    }, [])

     return(
          <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps='never'
          >
            {currentMessage && currentMessage.map((message) => <Message key={message.id} data={message}/>) }
          </ScrollView>
     )

} 
 