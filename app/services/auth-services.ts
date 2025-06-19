import { API_BASE_URL } from "@/config/app.config"
import { authToken } from "@/utils/session"
import { emailRegisterTypeSchema } from "../(auth)/email-register"

export const registerUser = async(data:emailRegisterTypeSchema) => {
    const res = await fetch(`${API_BASE_URL}/api/register`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type':'application/json'}
    })
    const response = await res.json()
    console.log("RESPUESTA DEL BACKEND",response)
    if(!res.ok || !response.token){
        throw new Error(response.message || 'Error al registrar el usuario')
    }
    await authToken?.saveToken('auth_token',response.token)
    // console.log("API RESPONSE FROM SERVICE LAYER",response)
    return response
}