import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {

  const {isSignedIn,isLoaded} = useAuth()
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