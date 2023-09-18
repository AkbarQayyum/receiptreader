import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import { MaterialCommunityIcons, AntDesign } from "react-native-vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addapidata } from "../../Redux/Slices/handleDummyData";
import Loader from "../components/Loader/Loader";
import Toast from "react-native-toast-message";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";
import { getnotifications } from "../../Redux/Slices/NotificationSlice";

// fake test API "https://fakestoreapi.com/products/1"

// const API_URL = `http://www.cogsense.ai:8501/`;
const API_URL = `https://fakestoreapi.com/products/1`;

const HomeScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [scanImage, setScanImage] = useState();
  const [open, setOpen] = useState(false);
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [opencamera, setOpenCamera] = useState(false);
  const [loading, setloading] = useState(false);
  const { user } = useSelector(getLoginProps);
  const [showdetails, setshowdetails] = useState(false);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <View style={tw`p-3`}></View>,
    });
  }, [isFocus]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 6],
      quality: 1,
      // base64: true,
    });
    let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;

    setImage(result.assets[0]);
    setOpen(false);
  };

  const handleRest = () => {
    setImage(null);
    setScanImage(null);
  };

  const uploadImage = async () => {
    setloading(true);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to JSON
      },
    };
    const formdata = await new FormData();
    await formdata.append("file", {
      uri: image?.uri,
      name: image?.uri?.split("ImagePicker/")[1],
      type: "image/png",
      fileName: "image1",
    });

    // await axios
    //   .post("http://3.131.184.34/UploadImage", formdata, config)
    //   .then(async (res) => {
    //     let value = res?.data?.info?.split("'")[1];
    //     console.log(res.data);
    //     console.log(value);
    //     await axios
    //       .post(`http://3.131.184.34/ReceiptAnalysis?filename=${value}`)
    //       .then((resu) => {
    //         setloading(false);

    //         setshowdetails(true);
    //         dispatch(addapidata(resu?.data?.data));
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         Toast.show({
    //           type: "error",
    //           text1:
    //             "something went wrong in image uploading receipt file name",
    //         });

    //         setloading(false);
    //         setshowdetails(true);
    //       });
    //   })
    //   .catch((err) => {
    //     Toast.show({
    //       type: "error",
    //       text1: "something went wrong",
    //     });
    //     return setloading(false);
    //   });

    await fetch("https://receipt.cogsense.ai/UploadImage", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        let value = data?.info?.split("'")[1];
        axios
          .post(`https://receipt.cogsense.ai/ReceiptAnalysis?filename=${value}`)
          .then((resu) => {
            setloading(false);

            setshowdetails(true);
            dispatch(addapidata(resu?.data?.data));
          })
          .catch((err) => {
            Toast.show({
              type: "error",
              text1:
                "something went wrong in image uploading receipt file name",
            });

            setloading(false);
            setshowdetails(true);
          });
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "something went wrong ",
        });

        setloading(false);
        return setshowdetails(true);
      });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setCameraPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={tw`pr-4 relative`}
          onPress={() => navigation.navigate("Notifications")}
        >
          <AntDesign name={"notification"} color={"white"} size={25} />
          <View
            style={tw`h-[2] w-[2] rounded-full absolute bg-red-500 `}
          ></View>
        </Pressable>
      ),
    });
    dispatch(getnotifications({ id: user?._id }));
  }, [isFocus]);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();

      setImage(photo);
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
              source={{ uri: image ? image?.uri : null }}
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
          setOpenCamera={setOpenCamera}
          setImage={setImage}
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
              style={tw` flex-1 w-full items-center justify-end p-2 relative`}
            >
              <TouchableOpacity style={tw`p-2 bg-black`} onPress={takePicture}>
                <MaterialCommunityIcons
                  name={"google-lens"}
                  size={45}
                  color={"#fff"}
                />
              </TouchableOpacity>
              <Pressable
                style={tw`absolute top-2 right-1`}
                onPress={() => setOpenCamera(false)}
              >
                <AntDesign name={"close"} color={"white"} size={40} />
              </Pressable>
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
      {loading ? <Loader /> : null}
    </>
  );
};

export default HomeScreen;
