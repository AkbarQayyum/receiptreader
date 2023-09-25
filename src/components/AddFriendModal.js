import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Modal, Select } from "native-base";
import tw from "twrnc";
import { Input, Button } from "native-base";
import { Ionicons } from "react-native-vector-icons";
import { useState } from "react";
import axiosInstance from "../../utils/axiosinstance";
import Loader from "./Loader/Loader";
import { useSelector } from "react-redux";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";
import Toast from "react-native-toast-message";

const AddFriendModal = ({ open, setOpen, getuserfriend, friend }) => {
  const [data, setdata] = useState([]);
  const [name, setname] = useState("");
  const [searchby, setsearchby] = useState("");
  const { user } = useSelector(getLoginProps);

  const [loading, setloading] = useState(false);
  const searchfriend = async () => {
    setloading(true);
    const res = await axiosInstance.post("/friend/search", {
      name: name,
      searchby: searchby,
    });

    setdata(res?.data);
    if (res?.data?.length < 1) {
      Toast.show({
        type: "success",
        text1: "User not found",
      });
    }
    setloading(false);
  };

  const addFriends = async (id) => {
    console.log("friend id", id);

    let found = false;
    friend?.find((d) => {
      if (d?._id === id) {
        found = true;
      }
    });
    if (found) {
      return Alert.alert("Friend already exist in your friend list");
    } else if (!found) {
      setloading(true);
      const res = await axiosInstance.post("/friend/add", {
        userid: user?._id,
        friendid: id,
      });
      setloading(false);
      getuserfriend();
      handleClose();
    }
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
                  placeholder="Search Friend..."
                  onChangeText={(e) => setname(e)}
                />
                <Select
                  placeholder="Search BY..."
                  value={searchby}
                  onValueChange={(e) => setsearchby(e)}
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <Ionicons name="checkmark" size="5" />,
                  }}
                >
                  <Select.Item label="Name" value="name">
                    Name
                  </Select.Item>
                  <Select.Item label="Email" value="email">
                    Email
                  </Select.Item>
                  <Select.Item label="Phone" value="phone">
                    Phone
                  </Select.Item>
                </Select>
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
