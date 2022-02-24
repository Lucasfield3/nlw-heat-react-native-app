import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '../service/api'

const CLIENT_ID = '4a62dff51029c38652e7'
const SCOPE = 'read:user'
const USER_STORAGE = '@nlwheat:user'
const TOKEN_STORAGE = '@nlwheat:token' 

type User = {
    id: string,
    avatar_url: string
    name: string,
    login: string,
}

type AuthContextData = {
    user: User | null,
    isSignin:boolean,
    signIn:()=> Promise<void>,
    signOut:()=> Promise<void>
}

type AuthProviderProps = {
     children: ReactNode
}

type AuthResponse = {
    token:string,
    user:User
}

type AuthorizationResponse = {
    params:{
        code?:string,
        error?:string
    }
    type?:string
}

export const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({children}: AuthProviderProps) =>{
    const [ user, setUser ] = useState<User | null>(null)
    const [ isSignin, setIsSignin ] = useState<boolean>(true)

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`

    const signIn = async () =>{
        try {
            setIsSignin(true)
    
            const authSessionResponse = await AuthSession.startAsync({authUrl}) as AuthorizationResponse
            
            if(authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied'){
                const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code})
                const { user, token } = authResponse.data as AuthResponse
    
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
                await AsyncStorage.setItem(TOKEN_STORAGE, token)
    
                setUser(user)
            }
            
        } catch (error) {
            console.log(error);
            
        } finally {
            setIsSignin(false)
        }
    }

    const signOut = async () =>{
        setUser(null)
        await AsyncStorage.removeItem(USER_STORAGE)
        await AsyncStorage.removeItem(TOKEN_STORAGE)
    }

    useEffect(()=> {

        const loadUserStorageData = async () => {
            const userStorage = await AsyncStorage.getItem(USER_STORAGE)
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE)

            if(userStorage && tokenStorage){
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`
                setUser(JSON.parse(userStorage))
            }

            setIsSignin(false)
        }

        loadUserStorageData()

    }, [])

     return(
          <AuthContext.Provider value={{user, isSignin, signIn, signOut}}>
               {children}
          </AuthContext.Provider>
     )

}

const useAuth = ()=>{
    const context = useContext(AuthContext)

    return context
}

export {useAuth, AuthProvider}