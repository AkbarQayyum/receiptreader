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
import { AntDesign } from "react-native-vector-icons";
const UnreadNotifications = ({  data }) => {
  const [noti, setnoti] = useState({});
  const [open, setOpen] = useState(false);
  const { user } = useSelector(getLoginProps);
  const dispatch = useDispatch();
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

  const handleDelete = async (id) => {
    let res = await axiosInstance.delete(`/notifications/delete/${id}`);

    if (res.data) {
      dispatch(getnotifications({ id: user?._id }));
    }
  };
  return (
    <View style={tw`w-full min-h-[100]  flex gap-2 items-center p-2`}>
      
      <View style={tw`w-full h-full flex gap-2 p-1 `}>
        {data?.map((d, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => {
                handleOpenNotification(d);
              }}
              style={tw`p-4 rouded ${
                d?.isRead === false ? `bg-orange-100` : `bg-white`
              } flex-row items-start gap-5`}
            >
              <Text>{i + 1}</Text>
              <View>
                <Text style={tw`font-bold`}>{d?.text}</Text>
                <View style={tw`flex-row justify-between items-center `}>
                  <Text style={tw`py-1`}>{d?.time}</Text>
                  {d?.isRead ? (
                    <Pressable
                      style={tw`px-2 bg-gray-100 py-1`}
                      onPress={() => handleDelete(d?._id)}
                    >
                      <AntDesign name={"delete"} size={25} color={"#272727"} />
                    </Pressable>
                  ) : null}
                </View>
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
