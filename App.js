import "react-native-gesture-handler";
import { NativeBaseProvider, StatusBar } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./Routes";
import React from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <React.Suspense fallback={"loading..."}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <Provider store={store}>
            <StripeProvider publishableKey="pk_test_51Ns3yNSICWvJLyV1xhpRTyoJJvdBaEDiuT6AbX4Pk8c2zGl1efx7ubmJji0k4uv8AWZ4eGXq7w0VStzk9AeIsj0W00OvWjOZQD">
              <StatusBar barStyle={"default"} backgroundColor="#000" />
              <Routes />
              <Toast />
            </StripeProvider>
          </Provider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </React.Suspense>
  );
}
