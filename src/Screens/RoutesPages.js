import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import Login from "./Login";
import Registration from "./Registration";
import { useSelector } from "react-redux";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";
const Stack = createNativeStackNavigator();

const RoutesPages = () => {
  const { isLogin } = useSelector(getLoginProps);
  const [check, setcheck] = useState(false);
  useEffect(() => {
    setcheck(isLogin);
  }, [isLogin]);
  return (
    <>
      {/* <NavigationContainer> */}
      <Stack.Navigator initialRouteName={check ? "Home" : "Login"}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </>
  );
};

export default RoutesPages;

const styles = StyleSheet.create({});
