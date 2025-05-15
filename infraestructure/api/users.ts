import { User } from "@/domain/entities/user"
import { UserRepository } from "@/domain/repositories/users"

type UserType = {
    user: Omit<User,'id'>
}

const isDev = process.env.NODE_ENV === 'development'

// export const createNewUser: UserRepository['createUser'] = async({
//     user
// }:UserType):Promise<User | null>=> {
//     try{
//         const response = await fetch('http://localhost:someurl',{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(user)
//         })
//         if(!response.ok){
//             throw new Error('hubo un error. Porfavor intenta nuevamente más tarde' + response.status)
//         }
//         const result = await response.json()
//         console.log("RESULT",result)
//         return result
        
//     }catch(error){
//         console.error(isDev ? 'Hubo un error: '+ error : 'Hubo un error al crear al usuario, porfavor intenta más tarde' )
//         throw error;
//     }
// }

export class HTTPRepository implements UserRepository {
    async createUser(user: Omit<User, 'id'>): Promise<User | null> {
        try {
          const res = await fetch("https://tu-backend.com/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
          })
    
          if (!res.ok) {
            throw new Error("Error creating user")
          }
    
          const data = await res.json()
          return data as User
        } catch (error) {
          console.error("HttpUserRepository error:", error)
          return null
        }
    }
}