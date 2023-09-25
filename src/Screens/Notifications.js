import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import UnreadNotifications from "../components/UnreadNotifications";
import { useSelector } from "react-redux";
import { getNotificationData } from "../../Redux/Slices/NotificationSlice";

const Notifications = () => {
  const {  data } =
    useSelector(getNotificationData);
  console.log(data);
  return (
    <ScrollView>
      <View style={tw`h-full w-full flex-col gap-5 py-4 px-2`}>

        
          <UnreadNotifications  data={data} />
      
      </View>
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
