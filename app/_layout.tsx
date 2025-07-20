import HeaderRightButtons from "@/components/header-right-buttons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "../globals.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="dashboard"
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#008000",
            },
            headerTintColor: "#fff",
            headerRight: () => <HeaderRightButtons />,
          }}
        />
        <Stack.Screen
          name="add/expense/index"
          options={{
            title: "Add Expense",
            headerStyle: {
              backgroundColor: "#008000",
            },
            headerTintColor: "#fff",
            headerRight: () => <HeaderRightButtons />,
          }}
        />
        <Stack.Screen
          name="add/investment/index"
          options={{
            title: "Add Investment",
            headerStyle: {
              backgroundColor: "#008000",
            },
            headerTintColor: "#fff",
            headerRight: () => <HeaderRightButtons />,
          }}
        />
        <Stack.Screen
          name="add/outstandings/index"
          options={{
            title: "Add Outstandings",
            headerStyle: {
              backgroundColor: "#008000",
            },
            headerTintColor: "#fff",
            headerRight: () => <HeaderRightButtons />,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
