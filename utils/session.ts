import { BASE_API_URL } from '@/config/app.config'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

export interface TokenStore {
    getToken: (key:string) => Promise<string | undefined | null>
    saveToken: (key:string,token:string) => Promise<void>
    closeSession: () => Promise<void>
}

const useAuthToken = ():TokenStore => {
    return {
        getToken: async(key:string) => {
            const token = await SecureStore.getItemAsync(key)
            if(token){
                console.log("TOKEN SELECTED",token)
            }
            return token
        },
        saveToken: async(key,token) => {
            await SecureStore.setItemAsync(key,token)
        },
        closeSession: async() =>{
           try{
                const token = await SecureStore.getItemAsync('auth_token')
                console.log("TOKEN FROM FN",token)
                if(token){
                    await fetch(`${BASE_API_URL}/api/logout`,{
                        method: 'POST',
                        headers: {
                            'Authorization':`Bearer ${token}`,
                            'Content-type': 'application/json'
                        }
                    })
                }
                await SecureStore.deleteItemAsync('auth_token')
                console.log("Sesion cerrada correctamente")
           }catch(error){
            console.error("Error al cerrar sesion",error)
            await SecureStore.deleteItemAsync('auth_token')
           }
        }
    }
}

export const authToken = Platform.OS != 'web' ? useAuthToken() : undefined;