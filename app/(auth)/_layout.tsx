import { useAuthRedirect } from '@/utils/helpers'
import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {

  const {isSignedIn,isLoaded} = useAuth()
  const {} = useAuthRedirect()
  if(isSignedIn){
    return <Redirect href='/home' />
  }
  return (
    <Stack
      screenOptions={{
        headerShown:false
      }}
    />
  )
}

export default AuthLayout