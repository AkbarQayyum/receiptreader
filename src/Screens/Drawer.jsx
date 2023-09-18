import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign, FontAwesome5 } from "react-native-vector-icons";
import tw from "twrnc";
import {
    createDrawerNavigator,
    DrawerItemList,
} from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from './HomeScreen';
import Profile from "./Profile";
import AllReceipt from "./AllReceipt";
import { SimpleLineIcons } from '@expo/vector-icons'
import JoinBill from './JoinBill';
import AddFriend from './AddFriend';
import Notifications from './Notifications';

const Drawer = createDrawerNavigator();

const Drawers = () => {
    return (
      <>
        {/* <NavigationContainer> */}
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => {
            return (
              <SafeAreaView>
                <View
                  style={{
                    height: 200,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomColor: "#f4f4f4",
                    borderBottomWidth: 1,
                  }}
                >
                  <View style={tw`flex items-center`}>
                    <Ionicons
                      name={"receipt-outline"}
                      size={100}
                      color={"#272829"}
                    />
                    <Text style={tw`font-bold text-xl text-gray-600`}>
                      Receipt Reader
                    </Text>
                  </View>
                </View>
                <DrawerItemList {...props} />
              </SafeAreaView>
            );
          }}
          screenOptions={{
            drawerStyle: {
              backgroundColor: "#fff",
              width: 250,
            },
            headerStyle: {
              backgroundColor: "#272829",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            drawerLabelStyle: {
              color: "#111",
            },
          }}
        >
          <Drawer.Screen
            name="Home"
            options={{
              drawerLabel: "Home",
              title: "Home",
              drawerIcon: () => (
                <SimpleLineIcons name="home" size={20} color="#808080" />
              ),
            }}
            component={HomeScreen}
          />
          <Drawer.Screen
            name="Profile"
            options={{
              drawerLabel: "profile",
              title: "Profile",
              drawerIcon: () => (
                <AntDesign name="profile" size={20} color="#808080" />
              ),
            }}
            component={Profile}
          />
          <Drawer.Screen
            name="AllReceipt"
            options={{
              drawerLabel: "All Receipt",
              title: "AllReceipt",
              drawerIcon: () => (
                <Ionicons name="receipt" size={20} color="#808080" />
              ),
            }}
            component={AllReceipt}
          />
          <Drawer.Screen
            name="Join Bill"
            options={{
              drawerLabel: "Payable",
              title: "Payable",
              drawerIcon: () => (
                <Ionicons name="receipt-outline" size={20} color="#808080" />
              ),
            }}
            component={JoinBill}
          />

          <Drawer.Screen
            name="Add Friend"
            options={{
              drawerLabel: "Add Friend",
              title: "Add Friend",
              drawerIcon: () => (
                <FontAwesome5 name="user-friends" size={20} color="#808080" />
              ),
            }}
            component={AddFriend}
          />
          <Drawer.Screen
            name="Notifications"
            options={{
              drawerLabel: "Notifications",
              title: "Notifications",
              drawerIcon: () => (
                <AntDesign name="notification" size={20} color="#808080" />
              ),
            }}
            component={Notifications}
          />
        </Drawer.Navigator>
        {/* </NavigationContainer> */}
      </>
    );
}

export default Drawers