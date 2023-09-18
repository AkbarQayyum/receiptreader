import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Ionicons } from "react-native-vector-icons";
import { Button, Input } from "native-base";
import Loader from "../components/Loader/Loader";
import axiosInstance from "../../utils/axiosinstance";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

const Registration = ({ navigation }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const userNameRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,18}$/;
  const passwordRegEx =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneNumberRegEx =
    /^[\+0]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  const [data, setdata] = useState({});
  const [loading, setloading] = useState(false);
  const handleChange = (text, title) => {
  
    setdata({ ...data, [title]: text });
  };
  const handleNavigate = () => {
    navigation.navigate("Login");
  };
  const handleSubmits = async () => {
    setloading(true);
    
    let res = await axiosInstance.post("/users/auth/register", data);
   
    if (res.data.isSuccess) {
      setloading(false);
      Toast.show({
        type: "success",
        text1: "User Register Successfully",
      });
      navigation.navigate("Login");
    } else {
      Toast.show({
        type: "error",
        text1: "Username Already exist.",
      });
      setloading(false);
    }
      setloading(false);

  };
  return (
    <>
      <View style={tw`flex-1 items-center justify-center gap-2 p-4`}>
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
              required: "Username is Required",
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
              required: "password is required",
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
        <View>
          <Text style={tw`font-bold`}>Email</Text>
          <Controller
            control={control}
            rules={{
              required: "Email is Required",
              pattern: {
                value: emailRegEx,
                message: "Please enter valid email address",
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  width={"100%"}
                  borderRadius={10}
                  borderBottomWidth={5}
                  placeholder="Email..."
                  onChangeText={(e) => {
                    field.onChange(e);
                    handleChange(e, "email");
                  }}
                />

                {errors.email && (
                  <Text style={tw`text-red-500 text-sm`}>
                    {errors.email.message}
                  </Text>
                )}
              </>
            )}
            name="email"
          />
        </View>
        <View>
          <Text style={tw`font-bold`}>Phone</Text>
          <Controller
            control={control}
            rules={{
              required: "Phone number is Required",
              pattern: {
                value: phoneNumberRegEx,
                message: "Please Enter valid Phone Number",
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  width={"100%"}
                  borderRadius={10}
                  borderBottomWidth={5}
                  placeholder="Phone Number..."
                  onChangeText={(e) => {
                    field.onChange(e);
                    handleChange(e, "phone");
                  }}
                />
                {errors.phonenumber && (
                  <Text style={tw`text-red-500 text-sm`}>
                    {errors.phonenumber.message}
                  </Text>
                )}
              </>
            )}
            name="phonenumber"
          />
        </View>
        <View style={tw`w-full`}>
          <Button
            style={tw`w-full`}
            backgroundColor={"272829"}
            onPress={handleSubmit(handleSubmits)}
          >
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
      {loading ? <Loader /> : null}
    </>
  );
};

export default Registration;
