import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { authToken } from "./session"

export const useAuthRedirect = () => {
    const [isSignedIn,setIsSignedIn] = useState<boolean>(false)
    const[isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        const getToken = async() => {
            const token = await AsyncStorage.getItem("auth_token")
            console.log("TOKEN FROM HELPER",token)
            if(!token){
                setIsSignedIn(false)
            }else{
                setIsSignedIn(true)
            }
            setIsLoading(false)
        }
        getToken()
    },[])

    return { isSignedIn, isLoading}
}

export const useUserAuth = () => {
    const [isSignedIn,setIsSignedIn] = useState<boolean>(false)
    const [isLoading,setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getUserToken = async() =>{
            const token = await authToken?.getToken('auth_token')
            if(!token){
                setIsSignedIn(false)
            }else{
                setIsSignedIn(true)
            }
            setIsLoading(false)
        }
        getUserToken()
    },[])

    return {isSignedIn,isLoading}
}