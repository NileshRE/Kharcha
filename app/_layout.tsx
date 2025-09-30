import HeaderRightButtons from "@/components/header-right-buttons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Stack, useSegments } from "expo-router";
import "react-native-url-polyfill/auto";
import "../globals.css";
import { AuthProvider, useAuthContext } from "./context/useAuthContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppStack />
      </AuthProvider>
    </QueryClientProvider>
  );
}

function AppStack() {
  const { session, loading } = useAuthContext();
  const segments = useSegments();

  const isLoginPage = segments[0] === "login";
  const isSignupPage = segments[0] === "signup";

  if (loading) return null; // or a loader

  // Redirect logged-in users away from login/signup pages
  if (session && (isLoginPage || isSignupPage)) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="signup/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "#16a34a" },
          headerTintColor: "#fff",
          headerRight: () => <HeaderRightButtons />,
        }}
      />
      <Stack.Screen
        name="add/index"
        options={{
          title: "Chat & Add",
          headerStyle: { backgroundColor: "#008000" },
          headerTintColor: "#fff",
          headerRight: () => <HeaderRightButtons />,
        }}
      />
    </Stack>
  );
}
