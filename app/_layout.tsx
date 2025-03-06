import { Text, ActivityIndicator, View } from "react-native"
import { Stack } from "expo-router"
import { tokenCache } from "@/cache"
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/clerk-expo"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  )
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoading>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Clerk is Loading...</Text>
        </View>
      </ClerkLoading>
      <ClerkLoaded>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
