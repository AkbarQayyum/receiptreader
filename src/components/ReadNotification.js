import { View, Text, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import { AntDesign } from "react-native-vector-icons";
import axiosInstance from "../../utils/axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";
import { getnotifications } from "../../Redux/Slices/NotificationSlice";
const ReadNotification = ({ read, readcount }) => {
  const { user } = useSelector(getLoginProps);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {

    let res = await axiosInstance.delete(`/notifications/delete/${id}`);

    if (res.data) {
      dispatch(getnotifications({ id: user?._id }));
    }
  };

  return (
    <View style={tw`w-full min-h-[100]  flex gap-2 items-center p-2`}>
      <Text style={tw`w-full text-right`}>Read Notifications: {readcount}</Text>
      <View style={tw`w-full h-full flex gap-2 p-1 `}>
        {read?.map((data, i) => {
          return (
            <View
              style={tw`flex-row justify-between items-center  bg-gray-200 px-2 `}
            >
              <View
                key={i}
                style={tw`p-2 rouded flex-row w-[70] items-start gap-5`}
              >
                <Text>{i + 1}</Text>
                <View>
                  <Text style={tw` font-bold`}>{data?.text}</Text>
                  <Text style={tw` py-1`}>{data?.time}</Text>
                </View>
              </View>
              <Pressable onPress={() => handleDelete(data?._id)}>
                <AntDesign name={"delete"} color={"#272829"} size={25} />
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ReadNotification;
