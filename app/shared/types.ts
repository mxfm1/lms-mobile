import { z } from "zod"
import { emailLoginSchema, emailRegisterSchema } from "./schema"

export type EmailLoginFormType = z.infer <typeof emailLoginSchema>
export type EmailRegisterType = z.infer<typeof emailRegisterSchema>

