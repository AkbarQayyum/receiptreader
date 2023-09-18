import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Button } from "native-base";
import ReadNotification from "../components/ReadNotification";
import UnreadNotifications from "../components/UnreadNotifications";
import { useSelector } from "react-redux";
import { getNotificationData } from "../../Redux/Slices/NotificationSlice";

const Notifications = () => {
  const [active, setactive] = useState("tab1");
  const { read, unread, readcount, unreadcount } =
    useSelector(getNotificationData);
  return (
    <ScrollView>
      <View style={tw`h-full w-full flex-col gap-5 py-4 px-2`}>
        <View style={tw` flex-row justify-between items-center  gap-5`}>
          <View style={tw`w-[45]`}>
            <Button
              style={active === "tab1" ? tw`bg-orange-200` : tw`bg-white`}
              onPress={() => setactive("tab1")}
            >
              <Text style={tw`font-bold`}>Unread</Text>
            </Button>
          </View>
          <View style={tw`w-[45]`}>
            <Button
              style={active === "tab2" ? tw`bg-orange-200` : tw`bg-white`}
              onPress={() => setactive("tab2")}
            >
              <Text style={tw`font-bold`}>Read</Text>
            </Button>
          </View>
        </View>
        {active === "tab1" ? (
          <UnreadNotifications unread={unread} unreadcount={unreadcount} />
        ) : (
          <ReadNotification read={read} readcount={readcount} />
        )}
      </View>
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
