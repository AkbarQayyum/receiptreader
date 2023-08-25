import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Button } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import axios from "axios";
import { Row, Table } from "react-native-table-component";

// fake test API "https://fakestoreapi.com/products/1"

// const API_URL = `http://www.cogsense.ai:8501/`;
const API_URL = `https://fakestoreapi.com/products/1`;
console.log(API_URL, " api call function");
const HomeScreen = () => {
  const [image, setImage] = useState(null);
  const [scanImage, setScanImage] = useState();
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
    setScanImage(null);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    console.log(formData, " form data mila");
    formData.append("file", image);

    console.log("API_URL", API_URL);
    // console.log("FORM_DATA", formData);

    try {
      const response = await axios.get(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data, " data");
      setScanImage(response);
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log("Request Headers:", error.config.headers);
      console.log("Request Data:", error.config.data);
      console.log("Response Data:", error.response.data);
    }
  };

  return (
    <>
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
            <Button
              backgroundColor={"success.700"}
              onPress={() => uploadImage()}
            >
              Submit
            </Button>
            <Button backgroundColor={"error.600"} onPress={() => handleRest()}>
              Cancel
            </Button>
          </View>
        ) : null}
        {scanImage && (
          <View>
            <Text>Scan Results:</Text>
            {/* Display the scan results in a table form */}
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={["ID", "Title", "Price"]}
                style={tw`border border-gray-300`}
                textStyle={tw`p-2 text-center`}
              />
              {Array.isArray(scanImage.data) ? (
                scanImage.data.map((product) => (
                  <Row
                    key={product.id}
                    data={[product.id, product.title, `${product.price}`]}
                    style={tw`border border-gray-300`}
                    textStyle={tw`p-2 text-center`}
                  />
                ))
              ) : (
                <View>
                  <Text>data is not in the expected way</Text>
                </View>
              )}
            </Table>
          </View>
        )}
      </View>
    </>
  );
};

export default HomeScreen;
