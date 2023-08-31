import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Modal } from "native-base";
import tw from "twrnc";
import { Input, Button } from "native-base";
import { Ionicons } from "react-native-vector-icons";
import { useState } from "react";
import axiosInstance from "../../utils/axiosinstance";
import Loader from "./Loader/Loader";
import { useSelector } from "react-redux";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";

const AddFriendModal = ({ open, setOpen, getuserfriend }) => {
  const [data, setdata] = useState([]);
  const [name, setname] = useState("");
  const { user } = useSelector(getLoginProps);
  console.log(user);
  const [loading, setloading] = useState(false);
  const searchfriend = async () => {
    setloading(true);
    const res = await axiosInstance.post("/friend/search", { name: name });
    console.log(res);
    setdata(res?.data);
    setloading(false);
  };

  const addFriends = async (id) => {
    console.log(id);
    setloading(true);
    const res = await axiosInstance.post("/friend/add", {
      userid: user?._id,
      friendid: id,
    });
    console.log(res);
    setloading(false);
    getuserfriend();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => handleClose()}
        //   initialFocusRef={initialRef}
        //   finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add Friend</Modal.Header>
          <Modal.Body style={{ maxHeight: 500 }}>
            <ScrollView contentContainerStyle={tw`w-full flex gap-5 p-2`}>
              <View style={tw`w-full flex gap-2 `}>
                <Input
                  placeholder="Search Friend By Name..."
                  onChangeText={(e) => setname(e)}
                />
                <Button onPress={searchfriend}> Search</Button>
              </View>
              {data?.length > 0 ? (
                <View style={tw`w-full border-2 border-gray-300 p-2 gap-2`}>
                  {data?.map((d, i) => {
                    return (
                      <View
                        key={i}
                        style={tw`flex-row items-center justify-between`}
                      >
                        <View>
                          <Text style={tw`font-bold italic`}>{d?.name}</Text>
                        </View>
                        <View>
                          <Button size={"sm"} onPress={() => addFriends(d.id)}>
                            Add Friend
                          </Button>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : null}
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {loading ? <Loader /> : null}
    </>
  );
};

export default AddFriendModal;

const styles = StyleSheet.create({});
