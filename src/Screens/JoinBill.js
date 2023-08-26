import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from 'twrnc'
import { Button, Input } from "native-base";
const JoinBill = () => {
  return (
    <View style={tw`w-full items-center p-2 gap-4`}>
      <View style={tw`w-full flex-row justify-between gap-2 items-center`}>
        <Input  width={'70%'} placeholder="Enter Code" />
        <Button style={tw `w-[20]`}>Join</Button>
      </View>
    </View>
  );
};

export default JoinBill;

const styles = StyleSheet.create({});
