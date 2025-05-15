import { Course } from "../entities/course";

export interface CoursesRepository{
    getAll():Promise<Course[]>
    getCourseBySlug(slug:string): Promise<Course | null>
}