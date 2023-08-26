import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { Ionicons } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getLoginProps, setIsLogout } from "../../Redux/Slices/UserSessionSlice";
import { Button } from "native-base";
const Profile = ({navigation}) => {
  const { user } = useSelector(getLoginProps);
  const dispatch = useDispatch()
  console.log(user);
  const handleLogout = ()=>{
  dispatch(setIsLogout());
//   navigation.navigate('Login')
  }
  return (
    <View style={tw`w-full items-center p-5 gap-5`}>
      <Text style={tw`text-xl font-bold`}>Profile</Text>
      <Ionicons name={"person-circle-outline"} size={105} />
      <View style={tw`w-full p-2 border-2 border-gray-300 flex gap-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-bold text-lg italic text-gray-500`}>
            Username
          </Text>
          <Text>{user?.username}</Text>
        </View>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-bold text-lg italic text-gray-500`}>
            Password
          </Text>
          <Text>********</Text>
        </View>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-bold text-lg italic text-gray-500`}>Email</Text>
          <Text>{user?.email}</Text>
        </View>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-bold text-lg italic text-gray-500`}>Phone</Text>
          <Text>{user?.phone}</Text>
        </View>
      </View>
      <View style={tw`flex-row w-full justify-between items-center`}>
       
        <Button style={tw`w-full`} backgroundColor={'#61677A'} onPress={handleLogout}>
          Logout
        </Button>
      </View>
    </View>
  );
};

export default Profile;
