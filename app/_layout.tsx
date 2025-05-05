import { tokenCache } from "@/utils/cache";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Stack />
    </ClerkProvider>
  )
}
