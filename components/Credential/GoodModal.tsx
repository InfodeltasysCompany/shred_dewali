
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal,TextInput, } from "react-native";


const CloseIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.closeButton}>
    <Image
      source={require("../../assets/closeImage.jpg")}
      style={{ width: 50, height: 50,padding:10 }}
    />
  </TouchableOpacity>
);

const GoodModal = ({ closeModal,visible,comp }) => {
  return (
    <Modal animationType="none" visible={visible}>
      <View style={{ flex: 1 }}>
        <CloseIcon onPress={closeModal} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {comp}
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
});

export default GoodModal;

