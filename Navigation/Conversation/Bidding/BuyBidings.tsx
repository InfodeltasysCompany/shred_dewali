import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const BuyBidings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BuyBidings</Text>
    </View>
  );
};

export default BuyBidings;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures it takes all the available space
    justifyContent: 'center', // Vertically centers content
    alignItems: 'center', // Horizontally centers content
    padding: 20, // Optional padding for spacing around
  },
  text: {
    fontSize: 20, // Adjusts font size for visibility
    color: '#333', // Text color
  },
});