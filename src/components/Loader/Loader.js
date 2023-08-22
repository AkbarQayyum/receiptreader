import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

import { useRef } from "react";
import tw from "twrnc";
const Loader = () => {
  const animation = useRef(null);
  return (
    <View
      style={tw`h-full w-full  absolute top-0 items-center justify-center bg-[rgba(250,250,250,0.5)]`}
    >
      {/* <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 400,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../../assets/load.json")}
      /> */}
    </View>
  );
};

export default Loader;
