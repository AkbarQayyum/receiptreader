import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "native-base";
import tw from "twrnc";
import AddFriendModal from "../components/AddFriendModal";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";
import axiosInstance from "../../utils/axiosinstance";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "react-native-vector-icons";
const AddFriend = () => {
  const [open, setOpen] = useState(false);
  const [friend, setfriend] = useState([]);
  const isFocus = useIsFocused();
  const { user } = useSelector(getLoginProps);
  const getuserfriend = async () => {
    const res = await axiosInstance.post("/friend/get", { id: user?._id });
   
    setfriend(res.data);
  };

  useEffect(() => {
    getuserfriend();
  }, [isFocus]);

  const removeFriend = async (id) => {
   
    const value = await axiosInstance.post("/friend/removefriend", {
      userid: user?._id,
      friendid: id,
    });
    if (value?.data) {
      getuserfriend();
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`flex gap-2 p-2 h-full w-full`}>
      <View>
        <Button backgroundColor={"272829"} onPress={() => setOpen(true)}>
          Add Friend
        </Button>
        {open ? (
          <AddFriendModal
            open={open}
            setOpen={setOpen}
            getuserfriend={getuserfriend}
          />
        ) : null}
      </View>
      <View style={tw`flex gap-3`}>
        {friend?.map((f, i) => {
          return (
            <View
              key={i}
              style={tw`w-full flex-row p-2 border-2 border-gray-300 justify-between`}
            >
              <Text>{f?.username}</Text>
              <Pressable
                onPress={() => {
                  removeFriend(f?._id);
                }}
              >
                <AntDesign name={"delete"} size={25} color={"#272829"} />
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AddFriend;

const styles = StyleSheet.create({});
