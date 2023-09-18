import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AlertDialog, Button } from "native-base";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";
import { getnotifications } from "../../Redux/Slices/NotificationSlice";

const ReadNotificationModal = ({ data, open, setOpen }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(getLoginProps);

  const handleClose = () => {
    setOpen(false);
    dispatch(getnotifications({ id: user?._id }));
  };

  const cancelRef = React.useRef(null);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={open}
      onClose={handleClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />

        <AlertDialog.Header>Notification</AlertDialog.Header>
        <AlertDialog.Body>
          <Text style={tw`pt-2 pb-3`}>{data?.text}</Text>
          <Text>{data?.time}</Text>
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ReadNotificationModal;

const styles = StyleSheet.create({});
