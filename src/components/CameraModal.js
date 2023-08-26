import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal } from "native-base";
import tw from "twrnc";
import { AntDesign, FontAwesome } from "react-native-vector-icons";
const CameraModal = ({ open, setOpen, pickImage, setOpenCamera }) => {
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
        <Modal.Header>Choose Option</Modal.Header>
        <Modal.Body>
          <View style={tw`w-full flex-row items-center justify-evenly`}>
            <Pressable
              style={tw`p-2 border-2 border-gray-200`}
              onPress={() => {setOpen(false);setOpenCamera(true)}}
            >
              <AntDesign name={"camera"} size={45} color={"#61677A"} />
            </Pressable>
            <Pressable
              style={tw`p-2 border-2 border-gray-200`}
              onPress={pickImage}
            >
              <FontAwesome name={"photo"} size={45} color={"#61677A"} />
            </Pressable>
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default CameraModal;

const styles = StyleSheet.create({});
