import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Modal } from "native-base";
import tw from "twrnc";
import { AntDesign, FontAwesome } from "react-native-vector-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";
import FriendSelectModal from "./FriendSelectModal";
import Loader from "./Loader/Loader";
import Toast from "react-native-toast-message";
import axiosInstance from "../../utils/axiosinstance";
import axios from "axios";

const ReceiptDetailModal = ({
  open,
  setOpen,
  selected,
  navigation,
  handleDelete,
  setshowedit,
}) => {
  const [openfriendselect, setopenfriendselect] = useState(false);
  const [loading, setloading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleShare = (val) => {
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
        setopenfriendselect(false);
        handleDelete(selected?._id);
        navigation.navigate("Join Bill");
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "something went wrong",
        });
        setloading(false);
        return setopenfriendselect(false);
      });
    setloading(false);
  };

  return (
    <Modal
      isOpen={open}
      onClose={() => handleClose()}

      //   initialFocusRef={initialRef}
      //   finalFocusRef={finalRef}
    >
      <Modal.Content style={{ maxHeight: 500, width: "100%" }}>
        <Modal.CloseButton />
        <Modal.Header>Receipt Details</Modal.Header>
        <Modal.Body>
          <ScrollView contentContainerStyle={tw`w-full flex gap-2`}>
            <View></View>
            {Object.keys(selected)?.map((d, i) => {
              if (d !== "items" && d !== "_id") {
                return (
                  <View
                    style={tw`w-full flex-row justify-between items-center px-1`}
                  >
                    <Text>{d}</Text>
                    <Text>{selected[d]}</Text>
                  </View>
                );
              }
            })}
            <Text style={tw`font-bold italic text-lg`}>Items</Text>
            <ScrollView contentContainerStyle={tw`w-full flex gap-2`}>
              {Object.keys(selected?.items)?.map((d, i) => {
                if (d !== "items" && d !== "_id") {
                  return (
                    <View
                      style={tw`w-full flex-row justify-between items-start px-1 gap-3`}
                    >
                      <Text style={tw`overflow-hidden  text-ellipsis`}>
                        {d}
                      </Text>
                      <Text
                        style={tw`overflow-hidden  text-ellipsis text-right`}
                      >
                        {selected?.items[d]}
                      </Text>
                    </View>
                  );
                }
              })}
            </ScrollView>

            <Button
              onPress={() => setshowedit(true)}
              backgroundColor={"#272829"}
            >
              <AntDesign name={"edit"} size={25} color={"white"} />
            </Button>
            <Button
              onPress={() => setopenfriendselect(true)}
              backgroundColor={"272829"}
            >
              Share
            </Button>
          </ScrollView>
          {openfriendselect ? (
            <FriendSelectModal
              openfriendselect={openfriendselect}
              setopenfriendselect={setopenfriendselect}
              handleShare={handleShare}
              selected={selected}
            />
          ) : null}
          {loading ? <Loader /> : null}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ReceiptDetailModal;

const styles = StyleSheet.create({});
