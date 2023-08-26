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
const AllReceipt = () => {
  const [allreceipts, setallreceipts] = useState([]);
  const [loading, setloading] = useState(false);
  const isFocus = useIsFocused();
  useEffect(() => {
    setloading(true);
    console.log("sd");
    getData();
  }, [isFocus]);

  const getData = () => {
    axiosInstance.get("/users/auth/receipt").then((res) => {
      console.log(res.data);
      setloading(false);
      setallreceipts(res.data);
    });
  };

  const handleDelete = async (id) => {
    const res = await axiosInstance.delete(`/users/auth/receipt/${id}`);
    await getData();
  };

  return (
    <ScrollView contentContainerStyle={tw`items-center p-4 w-full gap-2`}>
      {allreceipts?.length < 1 ? (
        <Text>No Save Receipt</Text>
      ) : (
        allreceipts?.map((t, i) => {
          return (
            <View
              key={i}
              style={tw`border-2 border-gray-300 flex-row justify-between w-full items-center p-1`}
            >
              <View>
                <Text>{t?.NAME}</Text>
                <Text>{t?.INVOICE_RECEIPT_ID}</Text>
              </View>
              <View style={tw`flex-row gap-2 items-center`}>
                <Text>{t?.INVOICE_RECEIPT_DATE}</Text>
                <Pressable
                  onPress={() => {
                    handleDelete(t?._id);
                  }}
                >
                  <AntDesign name={"delete"} size={25} color={"red"} />
                </Pressable>
              </View>
            </View>
          );
        })
      )}
      {loading ? <Loader /> : null}
    </ScrollView>
  );
};

export default AllReceipt;

const styles = StyleSheet.create({});
