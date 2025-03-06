import React, { useCallback, useEffect } from "react"
import * as WebBrowser from "expo-web-browser"
import { useSSO } from "@clerk/clerk-expo"
import * as AuthSession from "expo-auth-session"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { createTokenCache } from "@/cache"

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync()

    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function SignInScreen() {
  useWarmUpBrowser()

  const { startSSOFlow } = useSSO()

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri(),
        })

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        //
        console.log("The else happened")
      }
    } catch (error) {
      console.error(
        "Error signing in with Google:",
        JSON.stringify(error, null, 2)
      )
    }
  }, [])

  return (
    <SafeAreaView>
      <View>
        <Text>Sign in to Google</Text>

        <TouchableOpacity onPress={handleGoogleSignIn}>
          <View>
            <Text className="font-bold text-lg">Tap to Sign In</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={async () => {
            // Clear the JWT token
            const { getToken, clearToken } = createTokenCache()
            if (clearToken) {
              const token = await getToken("__clerk_client_jwt")
              if (token) {
                clearToken("__clerk_client_jwt")
                console.log("Clearing the JWT token")
              } else {
                console.log("No JWT token found")
              }
            }
          }}
        >
          <Text>Click here to clear clerk JWT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
