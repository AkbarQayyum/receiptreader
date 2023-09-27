import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Input, Modal } from "native-base";
import tw from "twrnc";
import { AntDesign, FontAwesome } from "react-native-vector-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddField } from "../../Redux/Slices/handleDummyData";
import axiosInstance from "../../utils/axiosinstance";
import {
  getLoginProps,
  getUpdatedUserDetails,
} from "../../Redux/Slices/UserSessionSlice";

import Toast from "react-native-toast-message";

const AddAccountModal = ({ open, setOpen }) => {
  const [value, setvalue] = useState({});
  const { user } = useSelector(getLoginProps);

  const dispatch = useDispatch();
  const handleChange = (val, title) => {
    setvalue({ ...value, [title]: val });
  };
  const handleSave = async () => {
    console.log(value);
    const res = await axiosInstance.post("/stripe/addaccount", {
      ...value,
      userid: user?._id,
    });
    if (res.data) {
      Toast.show({
        type: "success",
        text1: "Keys Added to your account",
      });
      dispatch(getUpdatedUserDetails({ id: user?._id }));
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      isOpen={open}
      onClose={() => handleClose()}
      //   initialFocusRef={initialRef}
      //   finalFocusRef={finalRef}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add Stripe Account</Modal.Header>
        <Modal.Body>
          <View style={tw`w-full flex gap-2`}>
            <Input
              width={"100%"}
              borderRadius={10}
              borderBottomWidth={5}
              placeholder="Enter Your Secret Key"
              onChangeText={(e) => {
                handleChange(e, "secret");
              }}
            />
            <Input
              width={"100%"}
              borderRadius={10}
              borderBottomWidth={5}
              placeholder="Enter Your Public key"
              onChangeText={(e) => {
                handleChange(e, "public");
              }}
            />
            <View style={tw`flex-row justify-end gap-2 items-center`}>
              <Button
                style={tw`w-[20]`}
                backgroundColor={"#61677A"}
                onPress={handleClose}
              >
                Cancel
              </Button>
              <Button
                style={tw`w-[20]`}
                backgroundColor={"#272829"}
                onPress={handleSave}
              >
                Save
              </Button>
            </View>
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default AddAccountModal;

const styles = StyleSheet.create({});
