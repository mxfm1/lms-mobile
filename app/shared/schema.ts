import { z } from "zod"

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/

export const emailRegisterSchema =z.object({
    name: z.string().min(1,{message: '**Ingresa un Nombre..'}),
    lastName: z.string(),
    email: z.string().min(1,{message: '**Ingresa tu email..'}).email({message: '**Email inválido..'}),
    password: z.string()
        .min(6,{message: "**Ingresa una contraseña de al menos 6 carácteres.."})
        .regex(passwordRegex,{
            message: "**Debes incluir al menos una mayús y un número.."
        }),
    confirmPassword: z.string().min(1,{message:"**Confirma tu contraseña.."}),
    terms: z.boolean()
}).refine(( data) => data.password === data.confirmPassword,{
    path:['confirmPassword'],
    message: 'Las contraseñas no coinciden'
})

export const emailLoginSchema = z.object({
    email: z.string().email({message:"**Email Inválido.."}),
    password:  z.string().min(1,{message:'**Ingresa una contraseña..'})
})