// app/welcome.tsx
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import Animated, {
    FadeInUp,
    FadeOut,
} from 'react-native-reanimated'

const Welcome = () => {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/home')
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <Animated.View
      entering={FadeInUp.duration(800)}
      exiting={FadeOut}
      style={styles.container}
    >
      <Text style={styles.text}>¡Bienvenido a la app!</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default Welcome
