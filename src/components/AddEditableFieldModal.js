import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Input, Modal } from "native-base";
import tw from "twrnc";
import { AntDesign, FontAwesome } from "react-native-vector-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddField } from "../../Redux/Slices/handleDummyData";
const AddEditableFieldModal = ({ open, setOpen, setitems, items }) => {
  const [value, setvalue] = useState({});

  const dispatch = useDispatch();
  const handleChange = (val, title) => {
    setvalue({ ...value, [title]: val });
  };
  const handleSave = () => {
   
    setitems({ ...items, [value?.title]: value?.value });
    handleClose();
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
        <Modal.Header>Add Items</Modal.Header>
        <Modal.Body>
          <View style={tw`w-full flex gap-2`}>
            <Input
              width={"100%"}
              borderRadius={10}
              borderBottomWidth={5}
              placeholder="Item Title"
              onChangeText={(e) => {
                handleChange(e, "title");
              }}
            />
            <Input
              width={"100%"}
              borderRadius={10}
              borderBottomWidth={5}
              placeholder="Price"
              onChangeText={(e) => {
                handleChange(e, "value");
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

export default AddEditableFieldModal;

const styles = StyleSheet.create({});
