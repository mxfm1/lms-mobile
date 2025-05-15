import { AuthButton } from '@/components/auth-button'
import { HTTPRepository } from '@/infraestructure/api/users'
import { colors } from '@/theme/colors'
import { useSSO } from '@clerk/clerk-expo'
import * as AuthSession from 'expo-auth-session'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'


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
      if(createdSessionId){
        setActive!({session: createdSessionId})

        const user = {
          email: 'test',
          name: 'lucas',
          password: '123'
        }

        // const newUser = userRepo.createUser(user)x
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.loginBGColor
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
    height: 400,
    aspectRatio:1
  },
  loginText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 700,
    color: 'white',
    marginBottom: 8,
  },
  buttonContainer:{
    paddingHorizontal: 16,
    gap:16,
    width: '100%'
  }
})
export default login