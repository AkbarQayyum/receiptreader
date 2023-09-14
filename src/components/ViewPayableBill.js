import {  ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal } from "native-base";
import tw from "twrnc";


const ViewPayableBills = ({ open, setOpen, selected }) => {
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
      <Modal.Content style={{ maxHeight: 500, width: "100%" }}>
        <Modal.CloseButton />
        <Modal.Header>Receipt Details</Modal.Header>
        <Modal.Body>
          <ScrollView contentContainerStyle={tw`w-full flex gap-2`}>
            {Object.keys(selected)?.map((d, i) => {
              if (d !== "items" && d !== "_id") {
                return (
                  <View
                    style={tw`w-full flex-row justify-between items-center px-1`}
                    key={i}
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
                      key={i}
                      style={tw`w-full flex-row justify-between items-start px-1 gap-3`}
                    >
                      <Text style={tw`overflow-hidden  text-ellipsis`}>
                        {d}
                      </Text>
                      <Text
                        style={tw`overflow-hidden  text-ellipsis text-right`}
                      >
                        {selected?.items[d]}
                      </Text>
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

export default ViewPayableBills;

const styles = StyleSheet.create({});
