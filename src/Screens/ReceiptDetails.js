import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, Input } from "native-base";
import { AntDesign, Ionicons } from "react-native-vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  getdummydata,
  handleReset,
  updatedata,
} from "../../Redux/Slices/handleDummyData";
import { useEffect } from "react";
import { useState } from "react";
import Toast from "react-native-toast-message";
import axiosInstance from "../../utils/axiosinstance";
import Loader from "../components/Loader/Loader";
import AddFieldValue from "../components/AddFieldModal";
import { useIsFocused } from "@react-navigation/native";
import TaxandTip from "./TaxandTip";
import {
  getFriendList,
  getLoginProps,
} from "../../Redux/Slices/UserSessionSlice";
import axios, { all } from "axios";
import SaveAndShareModal from "../components/SaveAndShareModal";
const ReceiptDetails = ({
  setshowdetails,
  navigation,
  setOpenCamera,
  setImage,
}) => {
  const { data, newlyaddfield } = useSelector(getdummydata);
  const { user, friends } = useSelector(getLoginProps);
  const [dummy, setdummy] = useState({});
  const [newfields, setnewfields] = useState({});
  const [open, setOpen] = useState(false);
  const isFocus = useIsFocused();

  const [showtax, setshowtax] = useState(false);
  const [loading, setloading] = useState(false);
  const [selectfriend, setselectfriend] = useState(false);
  const [selectedfriendsid, setseletedfriendsid] = useState([]);
  const [itemsvalues, setitemsvalue] = useState({});
  const [dt, setdt] = useState({});
  const [selected, setseleted] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendList({ id: user?._id }));
  }, [isFocus]);

  const handleCancel = () => {
    setshowdetails(false);
    setOpenCamera(false);
    setImage(null);
    dispatch(handleReset());
  };

  useEffect(() => {
    setdummy(data);
  }, [data]);
  useEffect(() => {
    setnewfields(newlyaddfield);
  }, [newlyaddfield]);
  useEffect(() => {
    let sum = 0;
    Object.keys(newfields).map((d) => {
      if (!isNaN(newfields[d])) {
        sum = sum + +newfields[d];
      }
    });
    let obj = JSON.parse(JSON.stringify(data));
    console.log(obj);
    obj = {
      ...obj,
      SUBTOTAL: (+data.SUBTOTAL + sum).toString(),
      TOTAL: (+data.TOTAL + sum).toString(),
    };
    setdummy(obj);
  }, [newfields]);

  const handleSave = async (values) => {
    setloading(true);
    let obj = { ...values, items: { ...dummy, ...newfields } };

    const res = await axiosInstance.post("/users/auth/receipt", {
      items: JSON.stringify({ ...obj }),
      userid: user?._id,
    });

    if (res.data?.isSuccess === true) {
      Toast.show({
        type: "success",
        text1: "Receipt Saved Successfully",
      });
      // navigation.navigate("AllReceipt");
      handleCancel();
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
      setloading(false);
    }
  };

  const handleSaveAndShare = (val) => {
    setloading(true);
    const allreq = val?.map((u) => {
      return axiosInstance.post("/friend/addreceipt", {
        receipt: JSON.stringify(u?.data),
        userid: u?.userid,
      });
    });
    axios
      .all(allreq)
      .then((data) => {
        setloading(false);
        Toast.show({
          type: "success",
          text1: "Receipt Saved Successfully",
        });

        handleCancel();

        navigation.navigate("Join Bill");
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "something went wrong",
        });
        setloading(false);
      });
  };

  const handleChange = (val, title) => {
    setdummy({ ...dummy, [title]: val });
  };

  const handleSelectFriend = (values, dat) => {
    setitemsvalue(values);
    setdt(dat);

    setseleted({
      ...values,
      name: "Receipt",
      date: new Date().toDateString(),
      items: { ...dat, ...newfields },
    });
    setselectfriend(true);
  };

  const handleNewFieldChange = (val, title) => {
    setnewfields({ ...newfields, [title]: val });
  };

  return (
    <>
      {!showtax ? (
        <ScrollView contentContainerStyle={tw`items-center p-2 gap-5`}>
          <View style={tw`w-full  flex-row justify-end`}>
            <Pressable onPress={() => setshowtax((v) => !v)}>
              <Text style={tw`font-bold italic text-[4]`}>Tax & Tip ?</Text>
            </Pressable>
          </View>
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
                    isDisabled={
                      v === "SUBTOTAL" || v === "TOTAL" || v === "TAX"
                    }
                    onChangeText={(e) => {
                      handleChange(e, v);
                    }}
                  />
                </View>
              );
            })}
          </View>

          <View style={tw`border-2 w-full p-2 border-gray-300 flex gap-3`}>
            {Object?.keys(newfields)?.map((v, i) => {
              return (
                <View
                  style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
                >
                  <Text style={tw`font-bold italic`}>{v}</Text>
                  <Input
                    value={newfields[v]}
                    width={"50%"}
                    multiline
                    isDisabled={v === "SUBTOTAL" || v === "TOTAL"}
                    onChangeText={(e) => {
                      handleNewFieldChange(e, v);
                    }}
                  />
                </View>
              );
            })}
          </View>

          <View style={tw`flex-row justify-between items-center w-full px-2`}>
            <Button
              style={tw`px-5 w-full `}
              backgroundColor={"#61677A"}
              onPress={handleCancel}
            >
              Cancel
            </Button>
          </View>
          {loading ? <Loader /> : null}
          {open ? <AddFieldValue open={open} setOpen={setOpen} /> : null}
        </ScrollView>
      ) : (
        <TaxandTip
          navigation={navigation}
          handleCancel={handleCancel}
          handleSave={handleSave}
          setshowtax={setshowtax}
          dummy={dummy}
          showtax={showtax}
          handleSaveAndShare={handleSaveAndShare}
          handleSelectFriend={handleSelectFriend}
        />
      )}
      {selectfriend ? (
        <SaveAndShareModal
          openfriendselect={selectfriend}
          setopenfriendselect={setselectfriend}
          handleShare={handleSaveAndShare}
          selected={selected}
          newfields={newfields}
        />
      ) : null}
    </>
  );
};

export default ReceiptDetails;

const styles = StyleSheet.create({});
