import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../components/Loader/Loader";
import { ScrollView } from "react-native-gesture-handler";
import axiosInstance from "../../utils/axiosinstance";
import { AntDesign } from "react-native-vector-icons";
import { Button, Pressable } from "native-base";
import { useSelector } from "react-redux";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";
import ViewPayableBills from "../components/ViewPayableBill";
import StripeModal from "../components/StripeModal";
const JoinBill = () => {
  const [allreceipts, setallreceipts] = useState([]);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openpayment, setopenPayment] = useState(false);
  const { user } = useSelector(getLoginProps);
  const [selected, setselected] = useState({});
  const isFocus = useIsFocused();
  useEffect(() => {
    setloading(true);

    getData();
  }, [isFocus]);

  const getData = async () => {
    let d = await axiosInstance.post("/users/auth/payable", { id: user?._id });

    let val = d?.data?.map((data) => {
      return JSON.parse(data);
    });

    setallreceipts(val);
    setloading(false);
  };

  const handleDelete = async (va) => {
    const res = await axiosInstance.post(`/friend/removereceipt`, {
      userid: user?._id,
      receipt: JSON.stringify(va),
    });
    await getData();
  };

  return (
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
                    handleDelete(t);
                  }}
                >
                  <AntDesign name={"delete"} size={25} color={"#272829"} />
                </Pressable>
                <View>
                  <Button
                    backgroundColor={"#272829"}
                    onPress={() => {
                      setselected(t);
                      setopenPayment(true);
                    }}
                  >
                    Pay
                  </Button>
                </View>
              </View>
            </Pressable>
          );
        })
      )}
      {loading ? <Loader /> : null}
      {open ? (
        <ViewPayableBills open={open} setOpen={setOpen} selected={selected} />
      ) : null}
      {openpayment ? (
        <StripeModal
          openpayment={openpayment}
          setopenPayment={setopenPayment}
          selected={selected}
        />
      ) : null}
    </ScrollView>
  );
};

export default JoinBill;

const styles = StyleSheet.create({});
