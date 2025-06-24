import { registerUser } from "../services/auth-services";
import { EmailRegisterType } from "../shared/types";

export const registerUserPresentation = async(data:EmailRegisterType) => {
    try{
        const response = await registerUser(data)
        return {
            success:true,
            data:response
        }
    }catch(error:any){
        return {
            success:false,
            message: error.message || 'Error inesperado'
        }
    }
}