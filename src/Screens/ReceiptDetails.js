import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button, Input } from "native-base";
import { AntDesign } from "react-native-vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { getdummydata } from "../../Redux/Slices/handleDummyData";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../utils/axiosinstance";
import Loader from "../components/Loader/Loader";
const ReceiptDetails = ({ setshowdetails, navigation }) => {
  const { data } = useSelector(getdummydata);
  const [dummy, setdummy] = useState({});
  const [loading, setloading] = useState(false);
  console.log(data);
  const handleCancel = () => {
    setshowdetails(false);
  };

  useEffect(() => {
    setdummy(data);
  }, [data]);

  const handleSave = async () => {
    setloading(true);
    const res = await axiosInstance.post("/users/auth/receipt", dummy);
    console.log(res?.data);
    if (res.data?.isSuccess === true) {
      navigation.navigate("AllReceipt");
    }
    setloading(false);
  };

  const handleChange = (val, title) => {
    setdummy({ ...dummy, [title]: val });
  };

  return (
    <ScrollView contentContainerStyle={tw`items-center p-2 gap-5`}>
      <View style={tw`flex-row justify-between items-center w-full px-2`}>
        <Text style={tw`font-bold text-xl`}>Receipt Details</Text>
      </View>
      <View style={tw`border-2 w-full p-2 border-gray-300 flex gap-3`}>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Address</Text>
          <Input
            value={dummy?.ADDRESS}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "ADDRESS");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Street</Text>
          <Input
            value={dummy?.STREET}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "STREET");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>City</Text>
          <Input
            value={dummy?.CITY}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "CITY");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Zip-Code</Text>
          <Input
            value={dummy?.ZIP_CODE}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "ZIP_CODE");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Name</Text>
          <Input
            value={dummy?.NAME}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "NAME");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Address Block</Text>
          <Input
            value={dummy?.ADDRESS_BLOCK}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "ADDRESS_BLOCK");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Receipt Date</Text>
          <Input
            value={dummy?.INVOICE_RECEIPT_DATE}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "INVOICE_RECEIPT_DATE");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Receipt ID</Text>
          <Input
            value={dummy?.INVOICE_RECEIPT_ID}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "INVOICE_RECEIPT_ID");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Vendor Address</Text>
          <Input
            value={dummy?.VENDOR_ADDRESS}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "VENDOR_ADDRESS");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Vendor Name</Text>
          <Input
            value={dummy?.VENDOR_NAME}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "VENDOR_NAME");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Vendor Phone</Text>
          <Input
            value={dummy?.VENDOR_PHONE}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "VENDOR_PHONE");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Vendor URL</Text>
          <Input
            value={dummy?.VENDOR_URL}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "VENDOR_URL");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Others</Text>
          <Input
            value={dummy?.OTHER}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "OTHER");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Items</Text>
          <Input
            value={dummy?.ITEM}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "ITEM");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Expense Row</Text>
          <Input
            value={dummy?.EXPENSE_ROW}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "EXPENSE_ROW");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Price</Text>
          <Input
            value={dummy?.PRICE}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "PRICE");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Tax</Text>
          <Input
            value={dummy?.TAX}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "TAX");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Subtotal</Text>
          <Input
            value={dummy?.SUBTOTAL}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "SUBTOTAL");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Total</Text>
          <Input
            value={dummy?.TOTAL}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "TOTAL");
            }}
          />
        </View>
      </View>
      <View style={tw`flex-row justify-between items-center w-full px-2`}>
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
      </View>
      {loading ? <Loader /> : null}
    </ScrollView>
  );
};

export default ReceiptDetails;

const styles = StyleSheet.create({});
