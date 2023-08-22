import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Screens/HomeScreen";
import Login from "./src/Screens/Login";
import Registration from "./src/Screens/Registration";
import { useSelector } from "react-redux";
import { getLoginProps } from "./Redux/Slices/UserSessionSlice";
const Stack = createNativeStackNavigator();
// import { createDrawerNavigator } from "@react-navigation/drawer";
// const Drawer = createDrawerNavigator();
const Routes = () => {
  const { isLogin } = useSelector(getLoginProps);
  const [check, setcheck] = useState(false);
  useEffect(() => {
    setcheck(isLogin);
  }, [isLogin]);
  return (
    <NavigationContainer fallback={"loading..."}>
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
      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
