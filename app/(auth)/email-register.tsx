import { AuthButton } from '@/components/auth-button';
import CustomButton from '@/components/button';
import Separator from '@/components/separator';
import { colors, iconColors } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { registerUserPresentation } from '../presentation/auth';
import { emailRegisterSchema } from '../shared/schema';
import { EmailRegisterType } from '../shared/types';
import { FormCheckbox, FormInput } from './components/email-login-form';


const EmailRegister = () => {
    
    const [selectedTerms,setIsSelectedTerms] = useState<boolean>(true)
    const [apiErrorMessage,setApiErrorMessage] = useState('')
    const [loadingAction,setIsLoadingAction] = useState(false)

    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(emailRegisterSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false
        }
    })
    
    const handleFormSubmit = async(data: EmailRegisterType) => {
        setIsLoadingAction(true)
        Keyboard.dismiss()
        const result = await registerUserPresentation(data)
        if(result.success){
            await new Promise((res) => setTimeout(res,400))
            router.replace("/welcome")
        }else{
            setApiErrorMessage(result.message)
        }

        setIsLoadingAction(false)
    }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex:1}}
        
        contentContainerStyle={styles.formContainer}
        enableOnAndroid
        keyboardShouldPersistTaps='handled'
      >     
        <View style={styles.formHeader}>
            <Pressable style={styles.iconContainer} onPress={() => {router.push("/login")}}>
                <Ionicons name='chevron-back-outline' color={'black'} size={20}/>
            </Pressable>
            <Text style={styles.formHeaderFAQ}>Problemas para crear tu cuenta?</Text>
        </View>
        <View style={styles.formTitleContainer}>
            <Text style={styles.formTitle}>Bienvenido!</Text>
            <Text style={styles.formSubtitle}>Antes de usar nuestra aplicacion debes crearte una cuenta de usuario..</Text>
        </View>
        <View style={styles.formNameContainer}>
            <View style={{flex:1}}>
                <FormInput name='name' control={form.control} secureTextEntry={false} placeholder='Nombre..'/>
            </View>

            <View style={{flex:1}}>
                <FormInput name='lastName' control={form.control} placeholder='Segundo Nombre..'/>
            </View>
        </View>
            <View style={styles.formDataContainer}>
                <FormInput name='email' control={form.control} placeholder='Correo..' />
                <FormInput name='password' control={form.control} placeholder='Contraseña..' secureTextEntry />
                <FormInput name='confirmPassword' control={form.control} placeholder='Confirma tu contraseña..' secureTextEntry />
            </View>

            <View style={styles.termsContainer}>
                <FormCheckbox 
                    name='terms'
                    control={form.control}
                    label='Al crear tu cuenta, aceptas los'
                    directionLabel='términos y condiciones'
                    setCheckbox={(value) => setIsSelectedTerms(!value)}
                />
            </View>

            {apiErrorMessage && (
                <Text style={{color: colors.errorText, alignSelf: 'center',marginTop:4}}>{apiErrorMessage}</Text>
            )}
            <CustomButton 
                label='Registrate' 
                style={styles.registerButton} textColor='black' 
                onPress={form.handleSubmit(handleFormSubmit)}
                disabled={selectedTerms}
                />

            <Separator label='O inicia sesion con'/>

            <AuthButton 
                label='Google'
                onPress={() => {}}
                iconName='logo-google'
                iconColor={iconColors.google}
            />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    formHeader: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formHeaderFAQ:{
        color: 'white',
        fontWeight: 600,
        textDecorationLine: 'underline',
        fontSize: 12,
    },
    container: {
        flex:1,
        backgroundColor: colors.loginBGColor,
        width: '100%'
    },
    formTitleContainer: {
        marginVertical: 18
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 6,
    },
    formSubtitle: {
        fontSize: 14,
        color: colors.gray,
        lineHeight: 20,
    },
    formContainer: {
        marginHorizontal: 12,
        // flexGrow:1,
        // justifyContent: 'center'
    },
    formNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap:20
    },
    formDataContainer: {
        marginTop:20,
        gap: 8
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 100,
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray
    },
    registerButton: {
        backgroundColor: 'white',
        width: '60%',
        alignSelf: 'center',
        marginTop: 12
    },
    termsContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop:32,
        marginBottom: 12
    },
    forgotPasswordText: {
        color: colors.forgotPw,
        
    }
})
export default EmailRegister