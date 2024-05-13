import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, Platform } from "react-native";

const CloseIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.closeButton}>
    <Image
      source={require("../../assets/closeImage.jpg")}
      style={{ width: 50, height: 50, padding: 10 }}
    />
  </TouchableOpacity>
);

const ModalLikeComponent = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={visible} />
      <View style={styles.overlay}>
        {visible && (
          <View style={styles.modalContent}>
            <CloseIcon onPress={toggleVisibility} />
            <Text>This is a modal-like component</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={toggleVisibility} style={styles.triggerButton}>
        <Text>Open Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 40 : 10,
    right: 10,
  },
  triggerButton: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    zIndex: 2,
  },
});

export default ModalLikeComponent;
