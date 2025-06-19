import { emailRegisterTypeSchema } from "../(auth)/email-register";
import { registerUser } from "../services/auth-services";

export const registerUserPresentation = async(data:emailRegisterTypeSchema) => {
    try{
        const response = await registerUser(data)
        return {
            success:true,
            data:response
        }
    }catch(error:any){
        console.log("PRESENTATION LAYER ERROR",error)
        return {
            success:false,
            message: error.message || 'Error inesperado'
        }
    }
}