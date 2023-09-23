import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Input, Modal } from "native-base";
import tw from "twrnc";
import { AntDesign, FontAwesome } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriendList,
  getLoginProps,
} from "../../Redux/Slices/UserSessionSlice";
import { useState } from "react";
import CheckBox from "react-native-check-box";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
const SaveAndShareModal = ({
  openfriendselect,
  setopenfriendselect,
  handleShare,

  selected,
}) => {
  const { user, friends } = useSelector(getLoginProps);
  const [friendlist, setfriendlist] = useState([]);
  const [selectedusers, setselectedusers] = useState([]);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  useEffect(() => {
    dispatch(getFriendList({ id: user?._id }));
  }, [isFocus]);

  useEffect(() => {
    const obj = friends?.map((f) => {
      return {
        _id: f?._id,
        username: f?.username,
        contribution: "",
        selected: false,
      };
    });
    setfriendlist([
      ...obj,
      {
        _id: user?._id,
        username: `${user?.username} (ME)`,
        contribution: "50",
        selected: true,
      },
    ]);
  }, [friends]);

  const handleClose = () => {
    setopenfriendselect(false);
  };

  const handleShareval = () => {
    let arr = [];
    let values = friendlist?.filter((f) => {
      if (f.selected === true) {
        return f;
      }
    });
    values?.map((d) => {
      let items = { ...selected.items };

      let others = { ...selected };
      delete others.items;

      Object.keys(items).map((i) => {
        if (!isNaN(items[i])) {
          items = {
            ...items,
            [i]: (
              parseFloat(items[i]) *
              (parseInt(d?.contribution) / 100)
            ).toFixed(2),
          };
        }
      });
      Object.keys(others).map((i) => {
        if (!isNaN(others[i]) && i !== "_id") {
          others = {
            ...others,
            [i]: (
              parseFloat(others[i]) *
              (parseInt(d?.contribution) / 100)
            ).toFixed(4),
          };
        }
      });
      arr.push({ data: { ...others, items: { ...items } }, userid: d?._id });
    });
    handleShare(arr);
  };

  return (
    <Modal
      isOpen={openfriendselect}
      onClose={() => handleClose()}
      //   initialFocusRef={initialRef}
      //   finalFocusRef={finalRef}
    >
      <Modal.Content style={tw`w-[90]`}>
        <Modal.CloseButton />
        <Modal.Header>Choose Friends</Modal.Header>
        <Modal.Body>
          <View style={tw`w-full flex gap-2`}>
            {friendlist?.map((f, i) => {
              return (
                <View key={i} style={tw`flex-row justify-between items-center`}>
                  <View style={tw`flex-row`}>
                    <CheckBox
                      disabled={
                        f.selected === false && f?.contribution?.length < 1
                      }
                      onClick={(e) => {
                        if (f?.contribution?.length < 1) {
                          return alert("please enter contribution amount!!");
                        } else {
                          let sum = 0;
                          friendlist?.map((f) => {
                            if (!isNaN(f.contribution)) {
                              sum = sum + +f.contribution;
                            }
                          });
                          if (sum > 100) {
                            return alert(
                              "sum of contribution can not be greater then 100"
                            );
                          }

                          let obj = JSON.parse(JSON.stringify(friendlist));
                          obj[i].selected = !obj[i]?.selected;

                          setfriendlist(obj);
                        }
                      }}
                      isChecked={f?.selected}
                    />
                    <Text>{f?.username}</Text>
                  </View>
                  <Input
                    width={"40%"}
                    placeholder="% Contribution"
                    value={f?.contribution}
                    onChangeText={(e) => {
                      if (isNaN(e) || +e > 100) {
                        return Alert.alert(
                          "Please enter valid Amount between 1-99"
                        );
                      } else {
                        let obj = JSON.parse(JSON.stringify(friendlist));
                        obj[i].contribution = e;

                        setfriendlist(obj);
                      }
                    }}
                  />
                </View>
              );
            })}
          </View>
          <View style={tw`pt-2`}>
            <Button backgroundColor={"#61677A"} onPress={handleShareval}>
              Share
            </Button>
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default SaveAndShareModal;

const styles = StyleSheet.create({});
