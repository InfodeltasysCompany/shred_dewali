import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SendMsg = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{text}</Text>
      {/* <Text style={styles.message}>hello</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    backgroundColor: "#007BFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },
  message: {
    color: "#fff",
  },
});

export default SendMsg;
