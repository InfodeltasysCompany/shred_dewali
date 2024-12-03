import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RecieveMsg = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{text}</Text>
      {/* <Text style={styles.message}>hello</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5E5",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },
  message: {
    color: "#000",
  },
});

export default RecieveMsg;
