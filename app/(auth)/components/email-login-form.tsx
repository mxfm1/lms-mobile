// import { useGradualAnimation } from '@/lib/screen-height'
import { userEmailLoginController } from '@/app/presentation/controller/auth'
import { EmailLoginFormType } from '@/app/shared/types'
import { IoniconName } from '@/components/auth-button'
import CustomButton from '@/components/button'
import { colors } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Control, Controller, useForm } from 'react-hook-form'
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { emailLoginSchema } from '../../shared/schema'


export const EmailLoginForm = () => {

    const[ isLoading,setIsLoading] = useState<boolean>(false)
    const[apiErrorMessage,setApiErrorMessage] = useState('')

    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(emailLoginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'

    })

    const formSubmit = async(data:EmailLoginFormType) => {
        setIsLoading(true)
        Keyboard.dismiss()
        const result = await userEmailLoginController(data)
        if(result.success){
            router.replace("/welcome")
        }else{
            setApiErrorMessage(result.message)
        }
        setIsLoading(false)
    }

  return (
    <>
        <View style={{gap:12}}>
             <FormInput 
                name='email'
                control={form.control}
                placeholder='Ingresa tu email..'
                secureTextEntry={false}
                icon='mail'
            />
        
            <FormInput 
                name='password'
                control={form.control}
                placeholder='Contraseña**'
                secureTextEntry
                icon='lock-closed'
            />
        </View>

        {apiErrorMessage && (
            <View>
                <Text style={[formStyles.errorText,{alignSelf:'center'}]}>{apiErrorMessage}</Text>
            </View>
        )}
      <CustomButton 
        label='Inicia sesion' 
        style={formStyles.formButton} 
        textColor={colors.dark} 
        onPress={form.handleSubmit(formSubmit)}
        // disabled={isLoading}
        isLoading={isLoading}
        />

        <View style={formStyles.footerContainer}>
            <Text style={formStyles.footerText}>¿No tienes cuenta?</Text>
            <Text 
                style={formStyles.footerLink}
                onPress={() => {
                router.push("/email-register")
                }}
            >
                Regístrate aquí
            </Text>
        </View>
    </>
  )
}

type FormInputProps = {
    name:string;
    control: Control<any>
    placeholder?:string;
    secureTextEntry?:boolean
    icon?: IoniconName
}

type CheboxInputProps = {
    name:string;
    control: Control<any>
    defaultValue?:boolean
    label?:string
    directionLabel?:string;
    setCheckbox: (value:boolean) => void
}
export const FormInput = ({
    name,
    control,
    placeholder,
    icon,
    secureTextEntry
}:FormInputProps) => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <Controller 
            name={name}
            control={control}
            render={({field:{onBlur,onChange,value},fieldState: {error}})=>(
                <View>
                    <View
                        style={formStyles.container}
                    >
                        {icon && <Ionicons name={icon} style={formStyles.formIcon}/> }
                        <TextInput 
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder={placeholder}
                            placeholderTextColor={colors.gray}
                            secureTextEntry={secureTextEntry && !showPassword}
                            textContentType={secureTextEntry ? "oneTimeCode" : 'none'}
                            style={[formStyles.textInput,{flex:1}]}
                        />
                        {secureTextEntry && (
                            <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                                <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={20}
                                color={colors.gray}
                                />
                            </Pressable>
                        )}
                    </View>
                     {error && <Text style={formStyles.errorText}>{error.message}</Text>}
                </View>
            )}
        />
    )
}

export const FormCheckbox = ({
    name,
    control,
    defaultValue=false,
    label,
    directionLabel,
    setCheckbox
}:CheboxInputProps) => {
    return (
        <Controller 
            name={name}
            defaultValue={defaultValue}
            control={control}
            render={({field:{onBlur,onChange,value}}) => (
                <Pressable style={checkboxStyles.checkboxRow} 
                    onPress={() => {
                        onChange(!value)
                        setCheckbox(!value)
                    }}>
                    <View style={[checkboxStyles.checkbox, value && checkboxStyles.checkboxChecked]}>
                        {value && <Ionicons name='checkmark' size={18} color={'black'}/>}
                    </View>    
                    <Text style={checkboxStyles.checkboxLabel}>
                        {label}{' '}
                        <Text
                            style={checkboxStyles.termsLink} 
                            onPress={() => {}}
                            >{directionLabel}</Text>
                    </Text>
                </Pressable>
            )}
        />
    )
}

const formStyles = StyleSheet.create({
    formContainer: {
        width: '100%',
    },
    container: {
        backgroundColor: colors.loginBGColor,
        width: '100%',

        borderColor: colors.gray,
        borderWidth:1,
        borderRadius:5,

        paddingHorizontal: 10,
        marginBottom:6,

        flexDirection: 'row',
        alignItems: 'center'
    },
    formButton: {
        backgroundColor: colors.gray,
        width: '60%',
        alignSelf: 'center',
        marginTop:12,
        color: ''
    },
    formIcon: {
        color:'gray',
        fontSize:16,
        paddingRight:2,
    },
    textInput: {
        color: 'white'
    },
    footerContainer: {
        alignItems: 'flex-end',
        marginTop:10,
        flexDirection: 'column',
    },
    footerText: {
        color: colors.gray,
        fontSize:14,
    },
    footerLink: {
        color: 'white',
        fontWeight: 600,
        textDecorationLine: 'underline',
        // fontSize:15
    },
    errorText: {
        color: colors.errorText,
        fontSize: 12,
        marginTop: 4,
    }
})

const checkboxStyles = StyleSheet.create({
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: colors.gray,
        backgroundColor: 'transparent',
        marginRight: 10,
        alignItems: 'center',
        alignContent: 'center',
    },
    checkboxLabel: {
        color: colors.gray,
        fontSize: 13,
        flexWrap: 'wrap',
        flexShrink: 1
    },
    checkboxChecked:{
        backgroundColor: 'white'
    },
    termsLink: {
        color: colors.forgotPw,
        textDecorationLine: 'underline',
    }
})

export default EmailLoginForm