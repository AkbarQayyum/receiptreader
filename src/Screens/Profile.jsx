import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { Ionicons } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginProps,
  getUpdatedUserDetails,
  setIsLogout,
} from "../../Redux/Slices/UserSessionSlice";
import { Button } from "native-base";
import { useState } from "react";
import AddAccountModal from "../components/AddAccountModal";
import axiosInstance from "../../utils/axiosinstance";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

const Profile = ({ navigation }) => {
  const { user } = useSelector(getLoginProps);
  const [open, setopen] = useState(false);
  const [userval, setuserval] = useState({});

  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    dispatch(getUpdatedUserDetails({ id: user?._id }));
  }, [isFocus]);
  useEffect(() => {
    setuserval(user);
  }, [user]);

  const handleLogout = () => {
    dispatch(setIsLogout());
    //   navigation.navigate('Login')
  };

  const handleRemovaAccount = async () => {
    const res = await axiosInstance.delete(`/stripe/delete/${user?._id}`);
    console.log(res.data);
    if (res.data) {
      Toast.show({
        type: "success",
        text1: "Account Keys Removed Successfully",
      });
      dispatch(getUpdatedUserDetails({ id: user?._id }));
    }
  };

  return (
    <View style={tw`w-full items-center p-5 gap-5`}>
      <Text style={tw`text-xl font-bold`}>Profile</Text>
      <Ionicons name={"person-circle-outline"} size={105} />
      <View style={tw`w-full p-2 border-2 border-gray-300 flex gap-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-bold text-lg italic text-gray-500`}>
            Username
          </Text>
          <Text>{userval?.username}</Text>
        </View>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-bold text-lg italic text-gray-500`}>
            Password
          </Text>
          <Text>********</Text>
        </View>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-bold text-lg italic text-gray-500`}>Email</Text>
          <Text>{userval?.email}</Text>
        </View>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-bold text-lg italic text-gray-500`}>Phone</Text>
          <Text>{userval?.phone}</Text>
        </View>
      </View>
      <View style={tw`flex w-full justify-between items-center gap-2`}>
        {!userval?.isAccountAttatched ? (
          <Button onPress={() => setopen(true)}>Add Your Stripe Account</Button>
        ) : (
          <View style={tw`flex w-full justify-between items-center gap-2`}>
            <Text>Your Stripe Account is Attached</Text>
            <Button onPress={() => handleRemovaAccount()}>
              Remove My Account
            </Button>
          </View>
        )}
        <Button
          style={tw`w-full`}
          backgroundColor={"#61677A"}
          onPress={handleLogout}
        >
          Logout
        </Button>
      </View>
      {open ? <AddAccountModal open={open} setOpen={setopen} /> : null}
    </View>
  );
};

export default Profile;
