import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import Swiper from 'react-native-swiper';
import DemandModal from '../../Navigation/Tab1/DemandModal';
import { AuthContext } from '../../redux/ContextApi/UserAuthProvider';
import { BASE_URL } from '../../ReuseComponent/Env';

const data1 = [
  { imageSource: require('../../assets/aluminum.jpeg'), name: 'Aluminum' },
  { imageSource: require('../../assets/brass.jpeg'), name: 'Brass' },
  { imageSource: require('../../assets/copper.jpeg'), name: 'Copper' },
  { imageSource: require('../../assets/iron.jpeg'), name: 'Iron' },
  { imageSource: require('../../assets/lead.jpeg'), name: 'Lead' },
  { imageSource: require('../../assets/plastic.jpeg'), name: 'Glass' },
  { imageSource: require('../../assets/cardboard.jpeg'), name: 'Cardboard' },
];

const LogoSlider1 = ({ navigation }) => {
  const [state] = useContext(AuthContext);
  const { userIdApp } = state;

  const [isDemandModalVisible, setIsDemandModalVisible] = useState(false);
  const [demandData, setDemandData] = useState([]);
  const [dmd, setDmd] = useState({});

  const handleOnclick = () => {
    navigation.navigate('ProductCatgry');
  };

  const onDemandClose = () => {
    setIsDemandModalVisible(false);
  };

  useEffect(() => {
    const getDemandData = async () => {
      try {
        const url = `${BASE_URL}/requirement_api.php?action=select`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resData = await response.json();
        setDemandData(resData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getDemandData();
  }, [ userIdApp,isDemandModalVisible]);

  const handleDemandClick = (item) => {
    setDmd(item);
    setIsDemandModalVisible(true);
    console.log("item is =>", item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.order}>What would you like to sell?</Text>
      <FlatList
        data={data1}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.container1} onPress={handleOnclick}>
            <Image source={item.imageSource} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
            <Text style={{...styles.order,marginBottom:-5,}}>Requirements</Text>
      {demandData.length > 0 &&
      <>

      
        <Swiper
          autoplay={true}
          autoplayTimeout={1} // Adjusted for better UX
          style={styles.swiper}
          loop={true} // Optional: loop the swiper
          showsPagination={false} // Hides pagination dots
        >
          {demandData.length > 0 &&
            demandData.reverse().map((item, index) => (
              <View key={index} style={styles.swiperItem}>
                <Pressable onPress={() => handleDemandClick(item)} style={styles.demandItem}>

                  
                  <View style={{ display: 'flex', justifyContent:"center",flexDirection:"column" }}>
                    <View style={{ display: "flex", gap: 30,flexDirection:"row",alignItems:"center" }}>
                      <Text style={{fontSize:16,fontWeight:"400",fontFamily:'sans-sarif'}}>Name: </Text>
                        <Text style={{fontSize:14,fontWeight:"400", fontFamily:'sans-sarif'}}>{item.name}</Text>
                    
                    </View>
                    <View  style={{ display: "flex", gap: 30 ,flexDirection:"row",alignItems:"center"}}>
                      <Text style={{fontSize:16,fontWeight:"400",fontFamily:'sans-sarif'}}>Demand : </Text>
                      <Text style={{fontSize:14,fontWeight:"400",fontFamily:'sans-sarif'}}>{item.requirement}</Text>
                    </View>

                  </View>
                </Pressable>
              </View>
            ))}
        </Swiper>
      </>
      }

      <DemandModal
        item={dmd}
        Open={isDemandModalVisible}
        onClose={onDemandClose}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
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
    marginBottom: 20,
    marginTop: 20,
    fontWeight: '500',
  },
  swiper: {
    height: 65, // Adjust to your desired height
    marginTop: 10,
  },
  swiperItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding:5,
  },
  demandItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#e6f4ff',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    width: "100%",
    marginBottom: 10,
    borderRadius:8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    
  },
});

export default LogoSlider1;
