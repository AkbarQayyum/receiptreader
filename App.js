import "react-native-gesture-handler";
import { NativeBaseProvider, StatusBar } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./Routes";
import React from "react";

export default function App() {
  return (
    <React.Suspense fallback={"loading..."}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <StatusBar barStyle={"default"} backgroundColor="#000" />
          <Routes />
        </NativeBaseProvider>
      </SafeAreaProvider>
    </React.Suspense>
  );
}
