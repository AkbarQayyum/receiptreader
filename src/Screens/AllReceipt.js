import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../components/Loader/Loader";
import { ScrollView } from "react-native-gesture-handler";
import axiosInstance from "../../utils/axiosinstance";
import { AntDesign } from "react-native-vector-icons";
import axios from "axios";
import { Pressable } from "native-base";
import ReceiptDetailModal from "../components/ReceiptDetailModal";
import { useSelector } from "react-redux";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";
import EditReceipt from "./EditReceipt";
const AllReceipt = ({ navigation }) => {
  const [allreceipts, setallreceipts] = useState([]);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useSelector(getLoginProps);
  const [selected, setselected] = useState({});
  const [showedit, setshowedit] = useState(false);
  const isFocus = useIsFocused();
  useEffect(() => {
    setloading(true);
    getData();
  }, [isFocus]);

  const getData = () => {
    axiosInstance.get(`/users/auth/receipt/${user?._id}`).then((res) => {
      setloading(false);
      const val = res.data?.map((d) => {
        return { ...JSON.parse(d.items), _id: d?._id };
      });

      setallreceipts(val);
    });
  };

  const handleDelete = async (id) => {
    const res = await axiosInstance.delete(`/users/auth/receipt/${id}`);
    await getData();
  };

  return (
    <>
      {!showedit ? (
        <ScrollView contentContainerStyle={tw`items-center p-4 w-full gap-2`}>
          {allreceipts?.length < 1 ? (
            <Text>No Save Receipt</Text>
          ) : (
            allreceipts?.map((t, i) => {
              return (
                <Pressable
                  onPress={() => {
                    setselected(t);
                    setOpen(true);
                  }}
                  key={i}
                  style={tw`border-2 border-gray-300 flex-row justify-between w-full items-center p-1`}
                >
                  <View>
                    <Text>{t?.name}</Text>
                  </View>
                  <View style={tw`flex-row gap-2 items-center`}>
                    <Text>{t?.date}</Text>
                    <Pressable
                      onPress={() => {
                        handleDelete(t?._id);
                      }}
                    >
                      <AntDesign name={"delete"} size={25} color={"#272829"} />
                    </Pressable>
                  </View>
                </Pressable>
              );
            })
          )}
          {loading ? <Loader /> : null}
          {open ? (
            <ReceiptDetailModal
              open={open}
              setOpen={setOpen}
              selected={selected}
              handleDelete={handleDelete}
              navigation={navigation}
              setshowedit={setshowedit}
            />
          ) : null}
        </ScrollView>
      ) : (
        <EditReceipt
          selected={selected}
          setshowedit={setshowedit}
          navigation={navigation}
        />
      )}
    </>
  );
};

export default AllReceipt;

const styles = StyleSheet.create({});
