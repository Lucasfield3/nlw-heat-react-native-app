import React from 'react'

import {
Image
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import avatarImg from '../../assets/avatar.png'

import { styles } from './styles'
import { COLORS } from '../../theme'

const SIZES = {
     SMALL:{
          containerSizes:32,
          avatarSize:28,
     },
     NORMAL:{
          containerSizes:48,
          avatarSize:42,
     }
}

type Props = {
     imageUri:string | undefined,
     sizes?:'NORMAL' | 'SMALL'
}

const AVATAR_DEFAULT = Image.resolveAssetSource(avatarImg).uri

export const UserPhoto = ({imageUri, sizes = 'NORMAL'}:Props) =>{

     const { containerSizes, avatarSize } = SIZES[sizes]

     return(
          <LinearGradient
          style={[
               styles.container,
               {
                    width: containerSizes,
                    height: containerSizes,
                    borderRadius: containerSizes / 2
               }
          ]}
          start={{ x: 0, y: 0.8 }}
          end={{ x: 0.9, y: 1 }} 
          colors={[COLORS.PINK, COLORS.YELLOW]}>
               <Image 
               source={{uri:imageUri || AVATAR_DEFAULT}}
               style={[
                    styles.avatar,
                    {
                         width: avatarSize,
                         height: avatarSize,
                         borderRadius: avatarSize / 2
                    }
               ]} 
               />
          </LinearGradient>
     )

}