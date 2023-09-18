import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Button, Input } from "native-base";
import tw from "twrnc";
import { useState } from "react";
import AddEditableFieldModal from "../components/AddEditableFieldModal";
import axiosInstance from "../../utils/axiosinstance";
import Loader from "../components/Loader/Loader";
import Toast from "react-native-toast-message";

const EditReceipt = ({ selected, setshowedit, navigation }) => {
  const [values, setvalues] = useState(selected);
  const [items, setitems] = useState({ ...selected?.items, ak: "0" });
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const handleValueChange = (value, title) => {
    console.log(value, title);
    setvalues({ ...values, [title]: value });
  };
  const handleItemsChange = (value, title) => {
    console.log(value, title);
    setitems({ ...items, [title]: value });
  };
  console.log(selected);

  const handleSave = async () => {
    setloading(true);
    let obj = { ...values, items: items };
    delete obj._id;

    let res = await axiosInstance.post("/users/auth/updatereceipt", {
      id: values?._id,
      items: JSON.stringify(obj),
    });
    if (res.data) {
      setloading(false);
      Toast.show({
        type: "success",
        text1: "Receipt Updated Successfully",
      });
      setshowedit(false);
      navigation.navigate("Home");
    }
    setloading(false);
    console.log(res);
  };

  useEffect(() => {
    let sum = 0;
    Object.keys(items)?.map((d) => {
      if (!isNaN(items[d])) {
        sum = sum + (parseFloat(items[d]) || 0);
      }
    });
    console.log(sum);
    setvalues({
      ...values,
      ["subtotal"]: (
        (parseFloat(values.tax) || 0) +
        (parseFloat(values.discount) || 0) +
        (parseFloat(values.tip) || 0) +
        (parseFloat(values.includedtip) || 0) +
        sum
      ).toString(),
      ["grandtotal"]: (
        (parseFloat(values.tax) || 0) +
        (parseFloat(values.discount) || 0) +
        (parseFloat(values.tip) || 0) +
        (parseFloat(values.includedtip) || 0) +
        sum
      ).toString(),
    });
  }, [items, values?.tax, values?.discount, values?.tip, values?.includedtip]);

  return (
    <>
      <ScrollView contentContainerStyle={tw`p-2`}>
        <View style={tw`py-2 w-full flex-row justify-between`}>
          <Text style={tw`font-bold text-xl`}>Edit Receipt</Text>
          <Button backgroundColor={"#272829"} onPress={() => setOpen(true)}>
            Add Field
          </Button>
        </View>
        <View style={tw`flex gap-2`}>
          {Object.keys(values)?.map((d, i) => {
            if (d !== "items" && d !== "_id") {
              return (
                <View key={i} style={tw`flex-row justify-between w-full`}>
                  <Text style={tw`font-bold`}>{d}</Text>
                  <Input
                    value={values[d]}
                    onChangeText={(v) => handleValueChange(v, d)}
                    width={"50%"}
                    isDisabled={
                      // d == "includedtip" ||
                      // d == "tip" ||
                      // d == "discount" ||
                      // d == "tax" ||
                      d == "subtotal" || d == "grandtotal" || d == "date"
                        ? true
                        : false
                    }
                  />
                </View>
              );
            }
          })}
        </View>
        <View>
          <Text style={tw`py-2 font-bold text-xl italic`}>Items</Text>
        </View>
        <View style={tw`flex gap-2 py-4`}>
          {Object.keys(items)?.map((d, i) => {
            if (d !== "items" && d !== "_id") {
              return (
                <View key={i} style={tw`flex-row justify-between w-full`}>
                  <Text style={tw`font-bold`}>{d}</Text>
                  <Input
                    value={items[d]}
                    width={"50%"}
                    onChangeText={(v) => handleItemsChange(v, d)}
                  />
                </View>
              );
            }
          })}
        </View>
        <View style={tw`flex gap-2`}>
          <Button backgroundColor={"272829"} onPress={handleSave}>
            Save
          </Button>
          <Button
            backgroundColor={"#272829"}
            onPress={() => setshowedit(false)}
          >
            Cancel
          </Button>
        </View>
        {open ? (
          <AddEditableFieldModal
            open={open}
            setOpen={setOpen}
            items={items}
            setitems={setitems}
          />
        ) : null}
      </ScrollView>
      {loading ? <Loader /> : null}
    </>
  );
};

export default EditReceipt;
