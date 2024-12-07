import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RecieveMsg = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{item.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5E5",
    padding: 10,
    marginVertical: 5,
    // borderRadius: 10,
    borderTopRightRadius:15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    maxWidth: "80%",
  },
  message: {
    color: "#000",
  },
});

export default RecieveMsg;
