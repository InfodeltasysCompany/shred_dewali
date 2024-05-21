import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const data1 = [
  { imageSource: require('../../assets/aluminum.jpeg'), name: 'Aluminum' },
  { imageSource: require('../../assets/brass.jpeg'), name: 'Brass' },
  { imageSource: require('../../assets/copper.jpeg'), name: 'Copper' },
  { imageSource: require('../../assets/iron.jpeg'), name: 'Iron' },
  { imageSource: require('../../assets/lead.jpeg'), name: 'Lead' },
  { imageSource: require('../../assets/plastic.jpeg'), name: 'Glass' },
  { imageSource: require('../../assets/cardboard.jpeg'), name: 'Cardboard' },
];

const LogoSlider = ({navigation}) => {
  const handleOnclick=()=>{

    navigation.navigate("Scrap Item",{screen:"T3Screen"})
  }
 // Accessing the current screen name
 
  return (
    <View>
    <Text style={styles.order}>What would you like to sell?</Text>
    <FlatList
        data={data1}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.container1} onPress={handleOnclick}>
            <Image source={item.imageSource} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    width: 110,
    height: 110,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
   alignSelf: 'center',
  },
  order: {

    fontSize: 20,
    color: '#00457E',
    // fontFamily: 'sans-sarif',
    marginBottom: 20,
    marginTop: 20,
    fontWeight: "500",


  },
});

export default LogoSlider;