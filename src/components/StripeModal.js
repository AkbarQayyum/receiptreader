import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Modal } from "native-base";
import tw from "twrnc";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import axiosInstance from "../../utils/axiosinstance";
import { useSelector } from "react-redux";
import { getLoginProps } from "../../Redux/Slices/UserSessionSlice";

const StripeModal = ({ openpayment, setopenPayment, selected }) => {
  const [carddetails, setcarddetails] = useState(null);
  const { user } = useSelector(getLoginProps);
  const { confirmPayment, loading } = useConfirmPayment();

  const handleClose = () => {
    setopenPayment(false);
  };

  const fetchpaymentclientindentsecret = async () => {
    let res = await axiosInstance.post("/stripe/create-payment-intent");
    console.log(res.data);
    return res.data;
  };

  
  const billingDetails = {
    email: "akbarqayyum0@gmail.com",
  };

  const handlePayment = async () => {
    console.log(carddetails);
    if (!carddetails?.complete) {
      return Alert.alert("Please enter complete and valid card details");
    }

    try {
      const { clientsecret } = await fetchpaymentclientindentsecret();
      console.log(clientsecret);
      const { paymentIntent, error } = await confirmPayment(clientsecret, {
        type: "Card",
        paymentMethodType: "Card",
        billingDetails: billingDetails,
      });
      if (error) {
        alert(`payment confirmation error ${error.message}`);
        console.log(error)
      } else if (paymentIntent) {
        alert("payment successfull");
        console.log("payment intent", paymentIntent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={openpayment}
      onClose={() => handleClose()}
      //   initialFocusRef={initialRef}
      //   finalFocusRef={finalRef}
    >
      <Modal.Content style={{ width: "100%" }}>
        <Modal.CloseButton />
        <Modal.Header>Payments</Modal.Header>
        <Modal.Body>
          <View style={tw`w-full flex gap-2 `}>
            <Text style={tw`font-bold`}>
              Would you like to pay ${selected?.grandtotal} amount?{" "}
            </Text>
            <Text>Enter Your Card Details To Make Payments</Text>
            <CardField
              postalCodeEnabled={true}
              placeholders={{ number: "4242 4242 4242 4242" }}
              cardStyle={styles.card}
              style={styles.cardContainer}
              onCardChange={(detail) => setcarddetails(detail)}
            />
            <Button onPress={handlePayment} disabled={loading}>
              Pay
            </Button>
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default StripeModal;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 10,
    width: "100%",
  },
});
