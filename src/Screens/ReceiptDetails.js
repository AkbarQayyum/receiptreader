import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, Input } from "native-base";
import { AntDesign, Ionicons } from "react-native-vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { getdummydata } from "../../Redux/Slices/handleDummyData";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../utils/axiosinstance";
import Loader from "../components/Loader/Loader";
import AddFieldValue from "../components/AddFieldModal";
import { useIsFocused } from "@react-navigation/native";
import TaxandTip from "./TaxandTip";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";
const ReceiptDetails = ({ setshowdetails, navigation }) => {
  const { data } = useSelector(getdummydata);
  const { user } = useSelector(getLoginProps);
  const [dummy, setdummy] = useState({});
  const [open, setOpen] = useState(false);
  const isFocus = useIsFocused();
  const [showtax, setshowtax] = useState(false);
  const [loading, setloading] = useState(false);
  console.log(data);
  const handleCancel = () => {
    setshowdetails(false);
  };

  useEffect(() => {
    setdummy(data);
    console.log(data);
  }, [data]);

  const handleSave = async (values) => {
    console.log(values);
    setloading(true);
    let obj = { ...values, items: dummy };
    const res = await axiosInstance.post("/users/auth/receipt", {
      items: JSON.stringify(obj),
      userid: user?._id,
    });
    console.log(res?.data);
    if (res.data?.isSuccess === true) {
      navigation.navigate("AllReceipt");
    }
    setloading(false);
  };

  const handleChange = (val, title) => {
    setdummy({ ...dummy, [title]: val });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={tw`p-3`}>
          <Pressable onPress={() => setshowtax((v) => !v)}>
            <Text style={tw`font-bold text-white text-lg`}>Tax & Tip</Text>
          </Pressable>
        </View>
      ),
    });
  }, [isFocus]);

  return (
    <>
      {!showtax ? (
        <ScrollView contentContainerStyle={tw`items-center p-2 gap-5`}>
          <View style={tw`flex-row justify-between items-center w-full px-2`}>
            <Text style={tw`font-bold text-xl`}>Receipt Details</Text>
            <Pressable
              style={tw`border-2 border-gray-300 px-2`}
              onPress={() => setOpen(true)}
            >
              <Ionicons name={"add"} size={35} color={"272829"} />
            </Pressable>
          </View>
          <View style={tw`border-2 w-full p-2 border-gray-300 flex gap-3`}>
            {Object?.keys(dummy)?.map((v, i) => {
              return (
                <View
                  style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
                >
                  <Text style={tw`font-bold italic`}>{v}</Text>
                  <Input
                    value={dummy[v]}
                    width={"50%"}
                    multiline
                    onChangeText={(e) => {
                      handleChange(e, v);
                    }}
                  />
                </View>
              );
            })}
          </View>
          {/* <View style={tw`flex-row justify-between items-center w-full px-2`}>
            <Button
              style={tw`px-5 w-[40] `}
              backgroundColor={"272829"}
              onPress={handleSave}
            >
              Save
            </Button>
            <Button
              style={tw`px-5 w-[40] `}
              backgroundColor={"#61677A"}
              onPress={handleCancel}
            >
              Cancel
            </Button>
          </View> */}
          {loading ? <Loader /> : null}
          {open ? <AddFieldValue open={open} setOpen={setOpen} /> : null}
        </ScrollView>
      ) : (
        <TaxandTip
          navigation={navigation}
          handleCancel={handleCancel}
          handleSave={handleSave}
          setshowtax={setshowtax}
          showtax={showtax}
        />
      )}
    </>
  );
};

export default ReceiptDetails;

const styles = StyleSheet.create({});
