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
  const userNameRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,18}$/;
  const passwordRegEx =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const handleLogin = async (data) => {
    console.log(data);

    setloading(true);

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
          <Controller
            control={control}
            rules={{
              required: "UserName is Required",
              pattern: {
                value: userNameRegEx,
                message:
                  "Please enter One Uppercase one Lowercase letter and one number min length 5 and max length 18",
              },
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
              pattern: {
                value: passwordRegEx,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long",
              },
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
          <Button style={tw`w-full`} onPress={handleSubmit(handleLogin)}>
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
