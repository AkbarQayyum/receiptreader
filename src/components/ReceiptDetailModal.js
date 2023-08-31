import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal } from "native-base";
import tw from "twrnc";
import { AntDesign, FontAwesome } from "react-native-vector-icons";
const ReceiptDetailModal = ({ open, setOpen, selected }) => {
  console.log(selected.items);
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
      <Modal.Content style={{ maxHeight: 600 }}>
        <Modal.CloseButton />
        <Modal.Header>Receipt Details</Modal.Header>
        <Modal.Body>
          <ScrollView contentContainerStyle={tw`w-full flex gap-2`}>
            {Object.keys(selected)?.map((d, i) => {
              if (d !== "items" && d !== "_id") {
                return (
                  <View
                    style={tw`w-full flex-row justify-between items-center px-1`}
                  >
                    <Text>{d}</Text>
                    <Text>{selected[d]}</Text>
                  </View>
                );
              }
            })}
            <Text style={tw`font-bold italic text-lg`}>Items</Text>
            <ScrollView contentContainerStyle={tw`w-full flex gap-2`}>
              {Object.keys(selected?.items)?.map((d, i) => {
                if (d !== "items" && d !== "_id") {
                  return (
                    <View
                      style={tw`w-full flex-row justify-between items-center px-1`}
                    >
                      <Text>{d}</Text>
                      <Text>{selected?.items[d]}</Text>
                    </View>
                  );
                }
              })}
            </ScrollView>
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ReceiptDetailModal;

const styles = StyleSheet.create({});
