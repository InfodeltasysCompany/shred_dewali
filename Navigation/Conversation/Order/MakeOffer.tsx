import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MakeOffer = () => {
  return (
    <View style={styles.container}>
      <Text>MakeOffer</Text>
    </View>
  );
};

export default MakeOffer;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the entire screen space
    backgroundColor: 'green',
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
  },
});
