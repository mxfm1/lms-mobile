
export interface CoursesRepository{
    // getAll():Promise<Course[]>
    // getCourseBySlug(slug:string): Promise<Course | null>
    getCoursesPhotos(): Promise<any>
    getOnboardingPhotos(quantity:number):Promise<any>
}