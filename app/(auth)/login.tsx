import { AuthButton } from '@/components/auth-button'
import { API_BASE_URL } from '@/config/app.config'
import { HTTPRepository } from '@/infraestructure/api/users'
import { useKeyboardHeight } from '@/lib/screen-height'
import { colors } from '@/theme/colors'
import { useUserAuth } from '@/utils/helpers'
import { authToken } from '@/utils/session'
import { useSSO } from '@clerk/clerk-expo'
import * as AuthSession from 'expo-auth-session'
import { Redirect, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EmailRegistrationForm from './components/email-register-form'

const userRepo = new HTTPRepository()

const login = () => {
  const { startSSOFlow } = useSSO()

  console.log("AUTH URL",AuthSession.makeRedirectUri())
  const handleAuth = async(strategy: 'oauth_google' | 'oauth_apple') => {
    try{
      const { createdSessionId,setActive,signUp } = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri({
          path: '/home'
        })
      })
      if(!createdSessionId){
        return {
          success: false,
          message: "No se pudo crear la sesion"
        }
      }
      if(createdSessionId){
        setActive!({session: createdSessionId})

        const email = signUp?.emailAddress!
        const firstName = signUp?.firstName
        const lastName = signUp?.lastName
        const password = 'testpassword'

        if(!email || !firstName ||!lastName){
          return {
            success:false,
            message: "Faltan datos del usuario. Porfavor completa tu perfil"
          }
        }
        const createdUser = {
          name: `${firstName} ${lastName}`,
          email,
          password
        }

        const newUser = userRepo.createUser(createdUser)

        return {
          success: true,
          message: "Inicio de sesión exitoso",
          user: newUser
        }
      }
    }catch(error){
      console.error(error)
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/intro.png")}
          style={styles.loginImage}
        />
        <Text style={styles.loginText}>
          Bienvenido a LMSFY
        </Text>
        <View style={styles.buttonContainer}>
          <AuthButton 
            label='Google'
            iconName='logo-google'
            onPress={() => handleAuth('oauth_google')}
            iconColor='#4285F4'
          />

          <AuthButton 
            label='Apple'
            iconName='logo-apple'
            onPress={() => handleAuth("oauth_apple")}
            backgroundColor='black'
            textColor='white'
            iconColor='white'
          />
        </View>
      </View>
    </View>
  )
}

const testLogin = () => {

  const { isSignedIn, isLoading } = useUserAuth()
  const [loginLoadingm,setLoginLoading] = useState<boolean>(false)
  const router = useRouter()
  const kbHeight = useKeyboardHeight()

  if(isLoading){
    return <Text>Cargando..</Text>
  }
  if(isSignedIn){
    return <Redirect href="/home"/>
  }
  const handleAuth = async() => {
    try{
      const email = 'usuarionuevo1@prueba123.com'
      const password = 'prueba123'
      const name = 'usuario Prueba'


      console.log("DATOS DEL USUARIO A REGISTRAR",email,password,name)
      const res = await fetch(`${API_BASE_URL}/api/register`,{
        method: 'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email,password,name})
      })

      const data = await res.json()
      console.log("DATA FROM BACKEND",data)
      console.log("TOKEN FROM FRONTEND",data.token)
      if(!res.ok || !data.token){
        console.log("Problemas al registrar..")
        return {
          success: false,
          message: data.message || "No se pudo registrar"
        }
      }
      await authToken?.saveToken("auth_token",data.token)
      
      router.push("/home")
      return {
        sucess: true,
        message: "Usuario Creado",
        token: data.token
      }
      
    }catch(err){
        console.error(err)
        return {
          success: false,
          message: 'error inesperado'
        }
    }finally{
      // router.push("/home")
    }
  }
  return (
     <KeyboardAwareScrollView
        enableAutomaticScroll
        keyboardOpeningTime={500}
        style={styles.container}
        contentContainerStyle={styles.formContent}
        enableOnAndroid
        keyboardShouldPersistTaps='handled'
     >
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/intro.png")}
          style={styles.loginImage}
        />
        <Text style={styles.loginText}>
          Bienvenido a LMSFY
        </Text>

        <View style={styles.formContainer}>
          <EmailRegistrationForm />
        </View>
        <View style={styles.buttonContainer}>
          {Platform.OS === 'android' ? (
            <AuthButton 
              label='Google'
              iconName='logo-google'
              onPress={() => handleAuth()}
              iconColor='#4285F4'
            />
          ): (
            <AuthButton 
              label='Apple'
              iconName='logo-apple'
              onPress={() => handleAuth()}
              iconColor='#4285F4'
            />
          )}
        </View>
      </View>
     </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.loginBGColor
  },
  formContent:{
    flexGrow: 1,
    justifyContent: 'center'
  },
  formContainer: {
    width: '70%'
  },
  content:{
    alignItems: 'center',
    alignSelf: 'center',
    gap: 32,
    width : '100%',
    maxWidth: 400
  },
  loginImage: {
    width: '100%',
    height: 300,
    aspectRatio:1
  },
  loginText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 700,
    color: 'white',
    // marginBottom: 8,
  },
  buttonContainer:{
    paddingHorizontal: 16,
    gap:16,
    width: '100%'
  }
})
export default testLogin;