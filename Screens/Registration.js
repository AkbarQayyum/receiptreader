import { View, Text, Pressable } from "react-native";

import React from "react";
import tw from "twrnc";
import { Ionicons } from "react-native-vector-icons";
import { Button, Input } from "native-base";
const Registration = ({ navigation }) => {
  const handleNavigate = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={tw`flex-1 items-center justify-center gap-2 p-4`}>
      <View style={tw`flex items-center`}>
        <Ionicons name={"receipt-outline"} size={100} color={"blue"} />
        <Text style={tw`font-bold text-xl text-gray-600`}>Receipt Reader</Text>
      </View>
      <View>
        <Text style={tw`font-bold`}>Username</Text>
        <Input
          width={"100%"}
          borderRadius={10}
          borderBottomWidth={5}
          placeholder="Username..."
        />
      </View>
      <View>
        <Text style={tw`font-bold`}>Password</Text>
        <Input
          width={"100%"}
          borderRadius={10}
          borderBottomWidth={5}
          secureTextEntry
          placeholder="Password..."
        />
      </View>
      <View>
        <Text style={tw`font-bold`}>Email</Text>
        <Input
          width={"100%"}
          borderRadius={10}
          borderBottomWidth={5}
        
          placeholder="Email..."
        />
      </View>
      <View>
        <Text style={tw`font-bold`}>Phone</Text>
        <Input
          width={"100%"}
          borderRadius={10}
          borderBottomWidth={5}
        
          placeholder="Phone Number..."
        />
      </View>
      <View style={tw`w-full`}>
        <Button style={tw`w-full`}>Register</Button>
      </View>
      <View style={tw`w-full flex justify-end items-end`}>
        <Pressable onPress={handleNavigate}>
          <Text style={tw`font-bold italic `}>Already have an account. ?</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Registration;
