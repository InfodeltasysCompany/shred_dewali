
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, Text, TouchableOpacity, TouchableHighlight, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Ionicons from '@expo/vector-icons/build/Ionicons';
const { width } = Dimensions.get('window');
import ImageSlider from 'react-native-image-slider';
import { useFocusEffect } from '@react-navigation/native';






const Product = ({ item, handlebuypress, getusers }) => {
  
  const imgurl = "https://shreddersbay.com/API/uploads/";

  
  const [images, setImages] = useState([]);

  useEffect(() => {
    // console.log("itemmmm:=>",item);
    if (item && item.filename) {
      const imageUrls = item.filename.split(",").map(filename => imgurl + filename.trim());
      setImages(imageUrls);
    }
  }, [item, imgurl]);

 
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'PRODUCT' },
    { key: 'second', title: 'CUSTOMER' },
  ]);
  
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }} // Indicator color
      style={{ backgroundColor: '#00457E' }} // Tab bar background color
      labelStyle={{ color: 'white' }} // Text color
    />
  );
  
  return (
    <View style={styles.container}>
      

      <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 10 }}>
      <ImageSlider
        loopBothSides
        autoPlayWithInterval={2000}
        images={images}
        customSlide={({ index, item, style, width }) => (
          <View key={index} style={[style]}>
            <Image source={{ uri: item }} style={{ width: "100%", height: 300 }} />
          </View>
        )}
        customButtons={(position, move) => (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {images.map((image, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  underlayColor="#ccc"
                  onPress={() => move(index)}
                  style={{ margin: 5, padding: 5, borderRadius: 5, backgroundColor: position === index ? '#3399ff' : '#ccc' }}
                >
                  <Text style={{ color: position === index ? '#fff' : '#000' }}>
                    {index + 1}
                  </Text>
                </TouchableHighlight>
              );
            })}
          </View>
        )}
      />
    </View>

   
   
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'first':
              return <FirstRoute item={item} />;
            case 'second':
              return <SecondRoute item={item} />;
            default:
              return null;
          }
       }}
  onIndexChange={setIndex}
  initialLayout={{ width: layout.width }}
  style={{ width: 350, height: "40%", backgroundColor: '#FFFFFF' }}
/>

   
      
     

      
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity onPress={handlebuypress} style={styles.buttonbuy}>
          <Text style={styles.buttonTextBuy}>Buy</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={getusers} style={styles.buttonchat}>
           
          <Text style={styles.buttonTextChat}>Chat</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

//////////////////////////////////////////////////////////////////
const FirstRoute = ({item}) =>{
  return(
    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 10 }}>
    <Text style={styles.detail}>PRODUCT DETAIL</Text>

    <View style={styles.row}>
      <Text style={styles.text}>Booking_ID </Text>
     
      <Text style={styles.text1}>{item.booking_id||item.auction_id}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.text}>Product_Name</Text>
      
      <Text style={styles.text1}>{item.p_name}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.text}>Approx Price</Text>
     
      <Text style={styles.text1}>{item.approx_price||item.total_price}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.text}>Booking_Date</Text>
    
      <Text style={styles.text1}>{item.booking_date}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.text}>Schedule Date</Text>
     
      <Text style={styles.text1}>{item.schedule_date}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.text}>Weight</Text>
      
      <Text style={styles.text1}>{item.weight}</Text>
    </View>

  </View>
  
  )
};
const SecondRoute = ({item}) => {
  return(
<View style={{ flex: 1, backgroundColor: '#fffff', padding: 10 }}>
  <View>
    <Text style={styles.detail}>CUSTOMER DETAIL</Text>
    <View style={styles.row}>
      <Text style={styles.text}>Name:</Text>
      <Text style={styles.text1}>{item.name}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.text}>Mobile:</Text>
      <Text style={styles.text1}>{item.mobile}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.text}>Area:</Text>
      <Text style={styles.text1}>{item.area}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.text}>Address:</Text>
      <Text style={styles.text1}>{item.address}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.text}>Landmark:</Text>
      <Text style={styles.text1}>{item.landmark}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.text}>Pincode:</Text>
      <Text style={styles.text1}>{item.pin_code}</Text>
    </View>
  </View>
</View>

)};
///////////////////////////////////////////////////////////////////



export default Product;

const styles = StyleSheet.create({

  buttonSelected:{

  },
  container: {
    // flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },



  scrollView: {
    height: 2,
    // marginBottom: 10,
  },


  pagination: {
    flexDirection: 'row',
    // marginBottom: 10,
  },
  paginationDot: {
    color: '#888',
    margin: 3,
    fontSize: 40,   
  },

  paginationDotActive: {
    color: '#000',
  },


  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },


  detailsSection: {
    flex: 1,
    marginRight: 5,
    marginLeft:5,
  },
  detail: {
    alignSelf: 'flex-start',
    fontWeight: '700',
    fontSize: 20,
    color: '#00457E',
    borderBottomWidth: 0.7,
    borderBottomColor:'#00457E',
    marginBottom: 20,
  },
  text: {
    color: '#00457E',
    fontWeight: '500',
    fontSize: 16,
    flex: 1,
    
  },
  tabBar: {
    backgroundColor: '#00457E', // Tab bar background color
  },
  indicator: {
    backgroundColor: 'white', // Indicator color
  },
  label: {
    color: 'white', // Text color
  },

  separator:{
paddingHorizontal: 5,
  },

  text1: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    flex: 1,
  
  },

  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderTopColor: "gray",
    borderTopWidth: 2,
  },
  buttonbuy: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#00457E',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    alignItems: 'center',
  },

  buttonchat: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "darkgray",
    alignItems: 'center',
  },

  buttonTextChat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00457E',
  },

  buttonTextBuy: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    elevation: 40,
   
  },

  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },


});


