
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal,TextInput, } from "react-native";




const ProductPreviewAndPost = ({ closeModal,visible }) => {
  return (
    <Modal animationType="none" visible={visible}>
      <View style={{ flex: 1 }}>
      <AntDesign name="close" size={35} color={"gray"} onPress={closeModal} style={{ ...styles.closeIcon, left: 10, top: 10 }} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>this is really good bro...</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    // top: 10,
    right: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  resendButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  resendText: {
    color: "white",
    fontSize: 16,
  },
  autoFillButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  autoFillText: {
    color: "white",
    fontSize: 16,
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    // right: 15,
  },
});

export default ProductPreviewAndPost;

