import { API_BASE_URL } from "@/config/app.config"
import { authToken } from "@/utils/session"
import { EmailLoginFormType, EmailRegisterType } from "../shared/types"

export const registerUser = async(data:EmailRegisterType) => {
    const res = await fetch(`${API_BASE_URL}/api/register`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type':'application/json'}
    })
    const response = await res.json()
    if(!res.ok || !response.token){
        throw new Error(response.message || 'Error al registrar el usuario')
    }
    await authToken?.saveToken('auth_token',response.token)
    return response
}

export const loginUser = async(data:EmailLoginFormType)=> {
    const res = await fetch(`${API_BASE_URL}/api/login`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type':'application/json'}
    })
    const response = await res.json()
    if(!res.ok || !response.data.token){
        throw new Error(response.message)
    }
    await authToken?.saveToken('auth_token',response.data.token)
    return response
}