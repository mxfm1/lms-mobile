import { CoursesRepository } from "@/domain/repositories/course";

export class HTTPcourseRepo implements CoursesRepository {
    async getCoursesPhotos(): Promise<any> {
        try{

            const APIKEY = process.env.EXPO_PUBLIC_PEXELS_API_KEY!
            const APIURL = "https://api.pexels.com/v1/search?query=nature&per_page=20"

            console.log("API KEY",APIKEY)

            const data = await fetch(APIURL,{
                headers: {
                    'Authorization': APIKEY
                }
            })

            const result = await data.json()
            // console.log('API CALL RESULT:',result.photos)
            return result.photos
            
        }catch(error){
            console.log(error)
        }
    }
    async getOnboardingPhotos(quantity:number): Promise<any>{
        try{
            const APIKEY = process.env.EXPO_PUBLIC_PEXELS_API_KEY!
            const APIURL = `https://api.pexels.com/v1/search?query=nature&per_page=${quantity}`

             const data = await fetch(APIURL,{
                headers: {
                    'Authorization': APIKEY
                }
            })

            const result = await data.json()
            return result.photos
           
        }catch(error){
            console.log(error)
        }
    }
}