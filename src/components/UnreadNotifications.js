import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { useState } from "react";
import { Pressable } from "react-native";
import ReadNotificationModal from "./ReadNotificationModal";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosinstance";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";
import { getnotifications } from "../../Redux/Slices/NotificationSlice";

const UnreadNotifications = ({ unreadcount, unread }) => {
  const [noti, setnoti] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpenNotification = async (notific) => {
   
    setnoti(notific);
    setOpen(true);
    let res = await axiosInstance.put("/notifications/update", {
      id: notific?._id,
    });
    if (res?.data) {
      // setOpen(false);
     
    }
  };
  return (
    <View style={tw`w-full min-h-[100]  flex gap-2 items-center p-2`}>
      <Text style={tw`w-full text-right`}>
        Unread Notifications: {unreadcount}
      </Text>
      <View style={tw`w-full h-full flex gap-2 p-1 `}>
        {unread?.map((data, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => {
                handleOpenNotification(data);
              }}
              style={tw`p-4 rouded bg-orange-100 flex-row items-start gap-5`}
            >
              <Text>{i + 1}</Text>
              <View>
                <Text style={tw` font-bold`}>{data?.text}</Text>
                <Text style={tw` py-1`}>{data?.time}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      {open ? (
        <ReadNotificationModal open={open} setOpen={setOpen} data={noti} />
      ) : null}
    </View>
  );
};

export default UnreadNotifications;
