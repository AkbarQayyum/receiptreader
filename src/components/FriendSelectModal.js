import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Modal } from "native-base";
import tw from "twrnc";
import { AntDesign, FontAwesome } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriendList,
  getLoginProps,
} from "../../Redux/Slices/UserSessionSlice";
import { useState } from "react";
import CheckBox from "react-native-check-box";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
const FriendSelectModal = ({
  openfriendselect,
  setopenfriendselect,
  handleShare,
  setselectedfriend,
  selectedfriend,
}) => {
  const { user, friends } = useSelector(getLoginProps);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
// console.log('aasas',friends)
  useEffect(() => {
    dispatch(getFriendList({ id: user?._id }));
  }, [isFocus]);

  const handleClose = () => {
    setopenfriendselect(false);
  };

  const handleSelect = (val) => {
    if (selectedfriend?.includes(val)) {
      let values = selectedfriend?.filter((f) => f !== val);

      setselectedfriend(values);
    } else {
      let values = [...selectedfriend, val];

      setselectedfriend(values);
    }
  };

  return (
    <Modal
      isOpen={openfriendselect}
      onClose={() => handleClose()}
      //   initialFocusRef={initialRef}
      //   finalFocusRef={finalRef}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Choose Friends</Modal.Header>
        <Modal.Body>
          <View style={tw`w-full flex gap-2 `}>
            {friends?.map((f, i) => {
              return (
                <View key={i} style={tw`flex-row justify-between`}>
                  <Text>{f?.username}</Text>
                  <CheckBox
                    onClick={() => {
                      handleSelect(f?._id);
                    }}
                    isChecked={selectedfriend?.includes(f?._id) ? true : false}
                  />
                </View>
              );
            })}
          </View>
          <View style={tw`pt-2`}>
            <Button backgroundColor={"#61677A"} onPress={handleShare}>
              Share
            </Button>
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default FriendSelectModal;

const styles = StyleSheet.create({});
