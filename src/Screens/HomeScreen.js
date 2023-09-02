import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Button } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import axios from "axios";
import { Row, Table } from "react-native-table-component";
import ReceiptDetails from "./ReceiptDetails";
import CameraModal from "../components/CameraModal";
import { Camera, CameraType } from "expo-camera";
import * as Permissions from "expo-permissions";
import { useEffect } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
// fake test API "https://fakestoreapi.com/products/1"

// const API_URL = `http://www.cogsense.ai:8501/`;
const API_URL = `https://fakestoreapi.com/products/1`;
console.log(API_URL, " api call function");
const HomeScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [scanImage, setScanImage] = useState();
  const [open, setOpen] = useState(false);
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [opencamera, setOpenCamera] = useState(false);
  const [showdetails, setshowdetails] = useState(false);
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
    setOpen(false);
  };

  const handleRest = () => {
    setImage(null);
    setScanImage(null);
  };

  const uploadImage = async () => {
    setshowdetails(true);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setCameraPermission(status === "granted");
    })();
  }, []);
  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();

      setImage(photo?.uri);
      setOpenCamera(false);
      // You can now do something with the captured photo, like displaying it or uploading it.
    }
  };
  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {!showdetails && !opencamera ? (
        <View
          style={tw`flex relative items-center justify-center flex-1 gap-5`}
        >
          {image ? (
            <Image
              source={{ uri: image ? image : null }}
              style={{ width: 300, height: 400 }}
            />
          ) : null}

          <Button
            onPress={() => setOpen(true)}
            backgroundColor={"272829"}
            style={tw`w-[50]`}
          >
            NEW BILL
          </Button>

          {!image && (
            <Button
              onPress={() => {
                navigation.navigate("Join Bill");
              }}
              style={tw`w-[50]`}
              backgroundColor={"272829"}
            >
              PAYABLE BILL
            </Button>
          )}
          {!image && (
            <Button
              onPress={() => {
                navigation.navigate("AllReceipt");
              }}
              backgroundColor={"272829"}
              style={tw`w-[50]`}
            >
              SAVED BILL
            </Button>
          )}
          {image ? (
            <View style={tw`flex-row gap-2 items-center`}>
              <Button
                backgroundColor={"272829"}
                width={"40%"}
                onPress={() => uploadImage()}
              >
                Submit
              </Button>
              <Button
                backgroundColor={"#61677A"}
                width={"40%"}
                onPress={() => handleRest()}
              >
                Cancel
              </Button>
            </View>
          ) : null}
        </View>
      ) : showdetails ? (
        <ReceiptDetails
          setshowdetails={setshowdetails}
          navigation={navigation}
        />
      ) : null}

      {opencamera === true ? (
        <View style={tw`flex-1 w-full`}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            ref={(ref) => setCamera(ref)}
          >
            <View
              style={tw`border-2 border-gray-300 flex-1 w-full items-center justify-end p-2`}
            >
              <TouchableOpacity style={tw`p-2 bg-black`} onPress={takePicture}>
                <MaterialCommunityIcons
                  name={"google-lens"}
                  size={45}
                  color={"#fff"}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : null}

      {open ? (
        <CameraModal
          open={open}
          setOpenCamera={setOpenCamera}
          setOpen={setOpen}
          pickImage={pickImage}
        />
      ) : null}
    </>
  );
};

export default HomeScreen;
