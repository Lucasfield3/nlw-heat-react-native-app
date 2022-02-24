import React from 'react'

import {
    ScrollView,
} from 'react-native'
import { useAuth } from '../../hooks/auth'
import { Message } from '../Message'


import { styles } from './styles'

export const MessageList = () =>{

    const { user } = useAuth()

    const message = {
        id: '1',
        text: 'Texto da mensagem',
    }

     return(
          <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps='never'
          >
            <Message data={message}/>
            <Message data={message}/>
            <Message data={message}/>
          </ScrollView>
     )

}