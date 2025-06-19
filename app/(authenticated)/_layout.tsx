import { colors } from '@/theme/colors'
import { Ionicons } from '@expo/vector-icons'
import { Drawer } from 'expo-router/drawer'
import React from 'react'
import { View } from 'react-native'

const AppLayout = () => {
  return (
    <View style={{flex:1}}>
      <Drawer 
        screenOptions={{
          headerTitle: '',
          headerStyle: {backgroundColor: colors.pressedBackground},
          drawerActiveTintColor: colors.primary,
          
        }}
      >
        <Drawer.Screen 
          name="(tabs)/courses"
          options={{
            drawerLabel:'Inicio',
            title:'My App',
            drawerIcon: ({color,size}) => <Ionicons name='home' size={size} color={color} /> 
          }}
        />
        
      </Drawer >
    </View>
  )
}

export default AppLayout