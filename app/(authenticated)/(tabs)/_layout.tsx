import { colors } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const AppLayout = () => {
  return (
    <Tabs screenOptions={
      process.env.EXPO_OS === 'ios' ? {

      } : {
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.profileTextColor,
        headerShown:false
      }
    }>
        <Tabs.Screen 
          name='home'
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({size,color}) => <Ionicons name='home' size={size} color={color}/> 
          }}
          />
        <Tabs.Screen 
          name='courses'
          options={{
            tabBarLabel: 'Cursos',
            tabBarIcon: ({size,color}) => <Ionicons name='book-outline' size={size} color={color} /> 
          }}
          />
        <Tabs.Screen 
          name='profile'
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({size,color}) => <Ionicons name='person' size={size} color={color} />
          }}
          />
    </Tabs>
  )
}

export default AppLayout