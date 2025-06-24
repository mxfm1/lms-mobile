import LogoutOverlay from '@/components/logout-overlay'
import MembershipContent from '@/components/membership-component'
import ProfileAvatar from '@/components/profile-avatar'
import ProfileSection, { ProfileButtonData, ProfileSectionButton } from '@/components/profile/profile-section'
import { useUserAuth } from '@/utils/helpers'
import { authToken } from '@/utils/session'
import { Redirect, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

const configButtonData: ProfileButtonData[] = [
  {
    label: 'Mi cuenta',
    icon: 'person'
  },
  {
    label: 'Membresia',
    icon: 'card',
  },{
    label: 'Idioma',
    icon: 'globe-outline',
    isLast:true
  }
]

const courseButtonData: ProfileButtonData[] = [
  {
    label: 'Mis cursos',
    icon: 'book'
  },
  {
    label: 'Mi progreso',
    icon: 'stats-chart',
    isLast:true
  }
]
const ProfileScreen = () => {

  const [isLoggedOut,setIsLoggingOut] = useState<boolean>(false)
  const { isSignedIn,isLoading } = useUserAuth()
  const router = useRouter()

  const handleLogout = async() => {
    setIsLoggingOut(true)
    try{
      await authToken?.closeSession()
      setTimeout(() => {
        router.replace("/login")
      },2000)
    }catch(error){
      console.error("Error al cerrar sesion",error)
      setIsLoggingOut(false)
    }
  }

  if(isLoading){
    return <Text>Loading...</Text>
  }

  if(!isSignedIn){
    return (
      <Redirect href='/login'/>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedOut && <LogoutOverlay />}
      <View style={styles.topSection}>
        <ProfileAvatar />
        <View style={styles.userProfileData}>
          <Text style={styles.profileNameText}>Bienvenido Felipe</Text>
          <Text style={styles.userProfileEmail}>email@email.com</Text>
        </View>
      </View>

        <ScrollView style={styles.profileDataSection} showsVerticalScrollIndicator={false}>
            <MembershipContent />

           <View style={{gap:12, marginTop: 20}}>
            <ProfileSection 
                header='Configuracion'
                data={configButtonData}
                />
              <ProfileSection 
                header='Mis Cursos'
                data={courseButtonData}
              />

              <ProfileSection 
                header='Mis Cursos'
                data={courseButtonData}
              />

             <View style={{
              paddingLeft:14
             }}>
               <ProfileSectionButton
                  pressFunction={() => handleLogout()}
                  label='Cerrar sesion'
                  icon='log-out' 
                  color='#dd6262'
                  isLast
                  />
             </View>
            </View>
        </ScrollView>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 32,
  },
  userProfileData: {
    marginTop: 8,
    alignItems: 'center',
  },
  profileNameText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  userProfileEmail: {
    color: '#A9A9A9',
    fontSize: 14,
  },
  profileDataSection: {
    alignContent: 'center',
    flexDirection: 'column',
    marginTop:12,
    gap:20
  },
  profileButtonContainer: {
    flexDirection: 'column',
    gap: 8,
    marginBottom: 32,
  }
})

export default ProfileScreen
