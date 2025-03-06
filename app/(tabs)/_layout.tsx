import React from "react"
import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function TabLayout() {
  const defaultIconSize = 27

  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 175,
          },
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#0000ff",
        tabBarInactiveTintColor: "#808080",
        tabBarStyle: {
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          height: 75,
          paddingTop: 10,
          backgroundColor: "black",
          shadowOpacity: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={defaultIconSize} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={defaultIconSize} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
