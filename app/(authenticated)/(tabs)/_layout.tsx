import { Tabs } from 'expo-router'
import React from 'react'

const AppLayout = () => {
  return (
    <Tabs screenOptions={{
        headerShown:false
    }}>
        <Tabs.Screen name='index'/>
        <Tabs.Screen name='profile'/>
        <Tabs.Screen name='courses'/>
    </Tabs>
  )
}

export default AppLayout