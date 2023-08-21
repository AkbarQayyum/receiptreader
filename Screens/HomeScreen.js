import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Button } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

const HomeScreen = () => {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 6],
      quality: 1,
      base64: true,
    });
    let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;

    setImage(base64Img);
  };

  const handleRest = () => {
    setImage(null);
  };

  return (
    <View style={tw`flex items-center justify-center flex-1 gap-5`}>
      {image ? (
        <Image
          source={{ uri: image ? image : null }}
          style={{ width: 300, height: 400 }}
        />
      ) : null}
      <Button onPress={() => pickImage()}>Select Image</Button>
      {image ? (
        <View style={tw`flex-row gap-10 items-center`}>
          <Button backgroundColor={"success.700"} onPress={() => handleRest()}>
            Submit
          </Button>
          <Button backgroundColor={"error.600"} onPress={() => handleRest()}>
            Cancel
          </Button>
        </View>
      ) : null}
    </View>
  );
};

export default HomeScreen;
