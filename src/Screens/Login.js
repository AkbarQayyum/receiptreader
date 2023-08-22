import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { Ionicons } from "react-native-vector-icons";
import { Button, Input } from "native-base";
import Loader from "../components/Loader/Loader";
import axiosInstance from "../../utils/axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { getLoginProps, setIsLogin } from "../../Redux/Slices/UserSessionSlice";
import { useIsFocused } from "@react-navigation/native";
const Login = ({ navigation }) => {
  const [data, setdata] = useState({});
  const { isLogin } = useSelector(getLoginProps);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setloading] = useState(false);
  const handleChange = (text, title) => {
    console.log(text, title);
    setdata({ ...data, [title]: text });
  };
  const handleNavigate = () => {
    navigation.navigate("Registration");
  };
  const handleLogin = async () => {
    // navigation.navigate('Home')
    setloading(true);

    console.log(data);
    let res = await axiosInstance.post("/users/auth/login/", data);
    console.log(res.data);
    if (res.data.isSuccess) {
      setloading(false);
      navigation.navigate("Home");
      dispatch(setIsLogin(res?.data?.user));
    }
    setloading(false);
  };
  useEffect(() => {
    if (isLogin) {
      navigation.navigate("Home");
    }
  }, [isFocused]);
  return (
    <>
      <View style={tw`flex-1 items-center justify-center gap-5 p-4`}>
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
        <View style={tw`w-full`}>
          <Button style={tw`w-full`} onPress={handleLogin}>
            Login
          </Button>
        </View>
        <View style={tw`w-full flex justify-end items-end`}>
          <Pressable onPress={handleNavigate}>
            <Text style={tw`font-bold italic `}>Don't have an account. ?</Text>
          </Pressable>
        </View>
      </View>
      {loading ? <Loader /> : null}
    </>
  );
};

export default Login;
