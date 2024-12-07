import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SendMsg = ({ item }) => {
  console.log(item);
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{item?.content}</Text>
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
