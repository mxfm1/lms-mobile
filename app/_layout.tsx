import { tokenCache } from "@/utils/cache";
import { ClerkProvider } from "@clerk/clerk-expo";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
if(!publishableKey){
  throw new Error("Missing clerk key. Ensure u provide it on the .env file")
}

function 
InitialLayout () {

  return (
    <Stack
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)"/>
    </Stack>
  )
}


const RootLayout = () => {
  
  const colorScheme = useColorScheme()

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache} >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex:1}}>
            {/* <Drawer /> */}
            <InitialLayout />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}

export default RootLayout