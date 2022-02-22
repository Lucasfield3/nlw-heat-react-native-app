import React from 'react'

import {
    ScrollView,
View
} from 'react-native'
import { Message } from '../Message'


import { styles } from './styles'

export const MessageList = () =>{

    const message = {
        id: '1',
        text: 'Texto da mensagem',
        user:{
            id: '2',
            name: 'lucas',
            login: 'Lucasfield3',
            avatar_url: 'https://github.com/Lucasfield3.png',
        }
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