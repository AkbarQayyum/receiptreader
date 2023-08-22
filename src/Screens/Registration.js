import { View, Text, Pressable } from "react-native";

import React, { useState } from "react";
import tw from "twrnc";
import { Ionicons } from "react-native-vector-icons";
import { Button, Input } from "native-base";
import Loader from "../components/Loader/Loader";
import axiosInstance from "../../utils/axiosinstance";
const Registration = ({ navigation }) => {
  const [data, setdata] = useState({});
  const [loading, setloading] = useState(false);
  const handleChange = (text, title) => {
    console.log(text, title);
    setdata({ ...data, [title]: text });
  };
  const handleNavigate = () => {
    navigation.navigate("Login");
  };
  const handleSubmit = async () => {
    setloading(true);
    console.log(data);
    let res = await axiosInstance.post("/users/auth/register", data);
    console.log(res.data);
    if (res.data.isSuccess) {
    setloading(false)
      navigation.navigate("Login");
    }
    setloading(false);

  };
  return (
    <>
      <View style={tw`flex-1 items-center justify-center gap-2 p-4`}>
        <View style={tw`flex items-center`}>
          <Ionicons name={"receipt-outline"} size={100} color={"blue"} />
          <Text style={tw`font-bold text-xl text-gray-600`}>
            Receipt Reader
          </Text>
        </View>
        <View>
          <Text style={tw`font-bold`}>Username</Text>
          <Input
            width={"100%"}
            borderRadius={10}
            borderBottomWidth={5}
            placeholder="Username..."
            onChangeText={(e) => {
              handleChange(e, "username");
            }}
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
            onChangeText={(e) => {
              handleChange(e, "password");
            }}
          />
        </View>
        <View>
          <Text style={tw`font-bold`}>Email</Text>
          <Input
            width={"100%"}
            borderRadius={10}
            borderBottomWidth={5}
            placeholder="Email..."
            onChangeText={(e) => {
              handleChange(e, "email");
            }}
          />
        </View>
        <View>
          <Text style={tw`font-bold`}>Phone</Text>
          <Input
            width={"100%"}
            borderRadius={10}
            borderBottomWidth={5}
            placeholder="Phone Number..."
            onChangeText={(e) => {
              handleChange(e, "phone");
            }}
          />
        </View>
        <View style={tw`w-full`}>
          <Button style={tw`w-full`} onPress={handleSubmit}>
            Register
          </Button>
        </View>
        <View style={tw`w-full flex justify-end items-end`}>
          <Pressable onPress={handleNavigate}>
            <Text style={tw`font-bold italic `}>
              Already have an account. ?
            </Text>
          </Pressable>
        </View>
      </View>
      {
      loading?<Loader />:null
      }
    </>
  );
};

export default Registration;
