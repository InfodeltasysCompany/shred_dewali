
import React, { useContext, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AuthContext } from "../../../redux/ContextApi/UserAuthProvider";
import { generatePriceDetails } from "../../../utils/Functions";

const MakeOffer = () => {
  const [state, , , , GChatstate, setGChatstate] = useContext(AuthContext);

  // Set initial states
  const [customOffer, setCustomOffer] = useState("");
  const [labelState, setLabelState] = useState("Very Good Offer");
  const [labelColorState, setLabelColorState] = useState("green");
  const [price, setPrice] = useState("100");

  const offerData = generatePriceDetails(100);

  // Handle sending the offer
  const handleSendOffer = () => {
    const offerAmount = customOffer || price;
    console.log("Offer submitted:", offerAmount);
    // Handle API submission logic here
  };

  // Update feedback based on price input
  const handlePriceChange = (text) => {
    const inputPrice = parseFloat(text) || 0; // Ensure numeric value
    setPrice(text);
    setCustomOffer("");

    if (inputPrice >= offerData[0].price) {
      setLabelState("Very Good Offer");
      setLabelColorState("green");
    } else if (inputPrice < offerData[offerData.length - 1].price) {
      setLabelState("Price Not Accepted");
      setLabelColorState("red");
    } else {
      setLabelState("Good Offer");
      setLabelColorState("orange");
    }
  };

  return (
    <View style={styles.container}>
      {/* Preset Offer Buttons */}
      <View style={styles.offerListView}>
        <FlatList
          data={offerData}
          horizontal
          showsHorizontalScrollIndicator={false} // Disable horizontal scrollbar
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.offerButton,
                item.price >= 1000
                  ? styles.greenOfferButton
                  : styles.redOfferButton,
              ]}
              onPress={() => {
                setCustomOffer("");
                setLabelState(item.label);
                setPrice(item.price.toString());
                setLabelColorState(item.color || "green");
              }}
            >
              <Text style={styles.offerText}>₹ {item.price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Custom Offer Input */}
      <TextInput
        style={styles.customOfferInput}
        keyboardType="numeric"
        value={price}
        onChangeText={handlePriceChange}
        placeholder="Enter Offer Price"
      />

      {/* Offer Feedback and Send Button */}
      <View style={styles.feedbackContainer}>
        <Text
          style={[
            styles.feedbackText,
            { backgroundColor: labelColorState },
          ]}
        >
          {labelState}
        </Text>

        <TouchableOpacity
          style={[
            styles.sendButton,
            labelColorState === "red"
              ? { backgroundColor: "#ddd" }
              : { backgroundColor: "#007bff" },
          ]}
          onPress={labelColorState === "red" ? null : handleSendOffer}
          disabled={labelColorState === "red"}
        >
          <Text
            style={[
              styles.sendButtonText,
              labelColorState === "red"
                ? { color: "gray" }
                : { color: "white" },
            ]}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MakeOffer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  offerListView: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  offerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  greenOfferButton: {
    borderColor: "#28A700",
    backgroundColor: "black",
  },
  redOfferButton: {
    backgroundColor: "#ddd",
    borderColor: "#28A700",
  },
  offerText: {
    fontSize: 16,
    color: "#007bff",
  },
  customOfferInput: {
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 36,
    marginBottom: 20,
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: "#80bdff",
  },
  feedbackContainer: {
    flexDirection: "row",
    padding:15,
  },
  feedbackText: {
    textAlign: "center",
    color: "white",
    fontSize: 22,
    marginBottom: 20,
    height: 80,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    padding: 8,
    fontWeight: "800",
  },
  sendButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: "35%",
    marginLeft: 10,
  },
  sendButtonText: {
    fontSize: 26,
    fontWeight: "900",
  },
});
