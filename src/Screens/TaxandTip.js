import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import tw from "twrnc";
import { AntDesign, Ionicons } from "react-native-vector-icons";
import { Button, Input } from "native-base";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getdummydata } from "../../Redux/Slices/handleDummyData";

const TaxandTip = ({
  navigation,
  setshowtax,
  showtax,
  handleCancel,
  handleSave,
  handleSaveAndShare,

  handleSelectFriend,
}) => {
  const [calc, setcalc] = useState();
  const [subt, setsubt] = useState("0");
  const [gtotal, setgtotal] = useState("0");
  const { data } = useSelector(getdummydata);
  const isFocus = useIsFocused();
  const [taxvalue, settaxvalue] = useState({
    includedtip: "0",
    tip: "0",
    discount: "0",
    tax: data["TAX"] || "0",
  });

  const handleChange = (val, title) => {
    settaxvalue({ ...taxvalue, [title]: val });
  };

  useEffect(() => {
    let sum = 0;
    Object.keys(taxvalue)?.map((d) => {
      sum = sum + parseFloat(taxvalue[d]);
    });

    setgtotal((sum + parseFloat(subt)).toString());
  }, [taxvalue]);
  useEffect(() => {
    console.log(data);
    let sum = 0;
    Object.keys(data)?.map((d) => {
      sum = sum + parseFloat(data[d]);
    });
    setsubt(data["SUBTOTAL"]?.toString() || sum?.toString());
    setgtotal(data["TOTAL"] || sum?.toString());
  }, [isFocus, data]);
  return (
    <ScrollView contentContainerStyle={tw`items-center p-2 gap-5`}>
      <View style={tw`flex-row justify-between items-center w-full px-2`}>
        <Text style={tw`font-bold text-xl`}>Tax & Tips</Text>
        <Pressable onPress={() => setshowtax(false)}>
          <Ionicons name={"arrow-back"} size={25} />
        </Pressable>
      </View>
      <View style={tw`border-2 w-full p-2 border-gray-300 flex gap-3`}>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Subtotal</Text>
          <Input
            value={subt}
            width={"50%"}
            multiline
            type="number"
            isDisabled
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>included Tip</Text>
          <Input
            value={taxvalue?.includedtip}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "includedtip");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Tip</Text>
          <Input
            value={taxvalue?.tip}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "tip");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Discounts</Text>
          <Input
            value={taxvalue?.discount}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "discount");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Tax</Text>
          <Input
            value={taxvalue?.tax}
            width={"50%"}
            multiline
            onChangeText={(e) => {
              handleChange(e, "tax");
            }}
          />
        </View>
        <View
          style={tw`w-full border-2 border-gray-300 p-1 flex-row justify-between items-start`}
        >
          <Text style={tw`font-bold italic`}>Grand Total</Text>
          <Input
            value={gtotal}
            width={"50%"}
            multiline
            isDisabled
            // onChangeText={(e) => {
            //   handleChange(e, v);
            // }}
          />
        </View>
      </View>
      <View
        style={tw`flex-row justify-between items-center gap-3 w-full px-2 flex-wrap`}
      >
        <Button
          style={tw`px-5 w-[45] `}
          backgroundColor={"272829"}
          onPress={() => {
            handleSave({
              ...taxvalue,
              subtotal: subt,
              grandtotal: gtotal,
              date: new Date().toDateString(),
              name: "Receipt",
            });
          }}
        >
          Save
        </Button>
        <Button
          style={tw`px-5 w-[45] `}
          backgroundColor={"272829"}
          onPress={() => {
            handleSelectFriend(
              {
                ...taxvalue,
                subtotal: subt,
                grandtotal: gtotal,
              },
              data
            );
          }}
        >
          Save & Share
        </Button>
        <Button
          style={tw`px-5 w-full `}
          backgroundColor={"#61677A"}
          onPress={() => {
            setsubt("0");
            setgtotal("0");
            settaxvalue({
              includedtip: "0",
              tip: "0",
              discount: "0",
              tax: "0",
            });
            handleCancel();
          }}
        >
          Cancel
        </Button>
      </View>
    </ScrollView>
  );
};

export default TaxandTip;
