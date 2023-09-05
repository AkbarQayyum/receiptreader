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
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
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

  // doing validating the text feild

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  // writing RegEx for input feilds

  const handleLogin = async (data) => {
    console.log(data);

    setloading(true);

    let res = await axiosInstance.post("/users/auth/login/", data);
    console.log(res.data);
    if (res.data.isSuccess) {
      setloading(false);
      Toast.show({
        type: "success",
        text1: "User Login Successfully",
      });
      navigation.navigate("Home");
      dispatch(setIsLogin(res?.data?.user));
    } else {
      Toast.show({
        type: "error",
        text1: "Username or password does not match",
      });
      setloading(false);
    }
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
          <Ionicons name={"receipt-outline"} size={100} color={"272829"} />
          <Text style={tw`font-bold text-xl text-gray-600`}>
            Receipt Reader
          </Text>
        </View>
        <View>
          <Text style={tw`font-bold`}>Username</Text>
          <Controller
            control={control}
            rules={{
              required: "UserName is Required",
            }}
            render={({ field }) => (
              <>
                <Input
                  width={"100%"}
                  borderRadius={10}
                  borderBottomWidth={5}
                  placeholder="Username..."
                  onChangeText={(e) => {
                    field.onChange(e);
                    handleChange(e, "username");
                  }}
                />
                {errors.username && (
                  <Text style={tw`text-red-500 text-sm`}>
                    {errors.username.message}
                  </Text>
                )}
              </>
            )}
            name="username"
          />
        </View>
        <View>
          <Text style={tw`font-bold`}>Password</Text>
          <Controller
            control={control}
            rules={{
              required: "Password is Required",
            }}
            render={({ field }) => (
              <>
                <Input
                  width={"100%"}
                  borderRadius={10}
                  borderBottomWidth={5}
                  secureTextEntry
                  placeholder="Password..."
                  onChangeText={(e) => {
                    field.onChange(e);
                    handleChange(e, "password");
                  }}
                />

                {errors.password && (
                  <Text style={tw`text-red-500 text-sm`}>
                    {errors.password.message}
                  </Text>
                )}
              </>
            )}
            name="password"
          />
        </View>
        <View style={tw`w-full`}>
          <Button
            style={tw`w-full `}
            backgroundColor={"272829"}
            onPress={handleSubmit(handleLogin)}
          >
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
