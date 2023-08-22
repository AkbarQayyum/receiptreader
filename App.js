import "react-native-gesture-handler";
import { NativeBaseProvider, StatusBar } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./Routes";
import React from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import store from "./Redux/store";

export default function App() {
  return (
    <React.Suspense fallback={"loading..."}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <Provider store={store}>
            <StatusBar barStyle={"default"} backgroundColor="#000" />
            <Routes />
            <Toast />
          </Provider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </React.Suspense>
  );
}
