import { loginUser } from "@/app/services/auth-services"
import { EmailLoginFormType } from "@/app/shared/types"

export const userEmailLoginController = async(data:EmailLoginFormType) => {
    try{
        const userResponse = await loginUser(data)
        return {
            success:true,
            message:'Inicio de sesión exitoso'
        }
    }catch(error:any){
        return {
            success:false,
            message: error.message || 'Error al iniciar sesion del usuario'
        }
    }
}