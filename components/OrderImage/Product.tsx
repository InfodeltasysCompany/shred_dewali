

// import React, { useState ,useRef, useEffect} from 'react';
// import { View, ScrollView,StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';

// const { width } = Dimensions.get('window');

// const Product = ({ item, handlebuypress, getusers }) => {
//   const scrollViewRef = useRef<ScrollView>(null);
//     const [active, setActive] = useState(0);


//   const imgurl = "https://shreddersbay.com/API/uploads/";
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleScroll = (event) => {
//     const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
//     setActive(slide);
//   };
  
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const nextSlide = (active + 1) % item.filename && item.filename.split(",").length;
//       scrollViewRef.current.scrollTo({ x: nextSlide * width, animated: true });
//     }, 1000); // Change image every 3 seconds

//     return () => {
//       clearInterval(timer); // Clean up the interval when the component unmounts
//     };
//   }, [active, item.filename && item.filename.split(",").length]);
  

//   return (
//     <View style={styles.container}>
//       <ScrollView  ref={scrollViewRef}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={handleScroll}
//         style={styles.scrollView}
//         scrollEventThrottle={16}>
//         {item.filename && item.filename.split(",").map((imageUrl, index) => (
//           <Image key={index} style={{ height: 200, width: 350 }} source={{ uri: imgurl + imageUrl }} />
//         ))}
//       </ScrollView>
     
//        {/* <View style={styles.indicatorContainer}>
//         {item.filename && item.filename.split(",").map((_, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.indicator,
//               { backgroundColor: index === currentIndex ? '#007AFF' : '#C4C4C4' },
//             ]}
//             onPress={() => scrollToIndex(index)}
//           />
//         ))}
//       </View> */}
//       <View style={styles.pagination}>
//         {item.filename && item.filename.split(",").map((_, index) => (
//           <Text key={index} style={[styles.paginationDot, index === active && styles.paginationDotActive]}>&bull;</Text>
//         ))}
//       </View>
//       <View>
//         <Text style={styles.detail}>PRODUCT DETAIL</Text>
//         <Text style={styles.text}>Booking_ID: {item.booking_id}</Text>
//         <Text style={styles.text}>Product_Name: {item.p_name}</Text>
//         <Text style={styles.text}>Approx Price: {item.price}</Text>
//         <Text style={styles.text}>Booking_Date: {item.booking_date}</Text>
//         <Text style={styles.text}>Schedule Date: {item.schedule_date}</Text>
//         <Text style={styles.text}>Weight: {item.weight}</Text>
//       </View>
//       <View>
//         <Text style={styles.detail}>CUSTOMER DETAIL</Text>
//         <Text style={styles.text}>Name: {item.name}</Text>
//         <Text style={styles.text}>Mobile: {item.mobile}</Text>
//         <Text style={styles.text}>Area: {item.area}</Text>
//         <Text style={styles.text}>Address: {item.address}</Text>
//         <Text style={styles.text}>Landmark: {item.landmark}</Text>
//         <Text style={styles.text}>Pincode: {item.pin_code}</Text>
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={handlebuypress} style={styles.button}>
//           <Text style={styles.buttonText}>Buy</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={getusers} style={styles.button}>
//           <Text style={styles.buttonText}>Chat</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Product;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 50,
//     alignItems: 'center',
//   },
//   paginationDot: {
//     color: '#888',
//     margin: 3,
//     fontSize: 30,
//   },
//   paginationDotActive: {
//     color: '#000',
//   },
//   indicatorContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   pagination: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 10,
//     alignSelf: 'center',
//   },
//   indicator: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   detail: {
//     alignSelf: 'center',
//     fontWeight: '700',
//     fontSize: 20,
//     color: '#cccc00',
//     borderBottomWidth: 0.7,
//     marginBottom: 5,
//   },
//   text: {
//     color: 'black',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   button: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginHorizontal: 10,
//     backgroundColor: '#cccc00',
//     borderRadius: 20,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });




import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Ionicons from '@expo/vector-icons/build/Ionicons';
const { width } = Dimensions.get('window');
import ImageSlider from 'react-native-image-slider';
import { useFocusEffect } from '@react-navigation/native';






const Product = ({ item, handlebuypress, getusers }) => {
  const scrollViewRef = useRef<ScrollView>(null);
    const [active, setActive] = useState(0);

  const imgurl = "https://shreddersbay.com/API/uploads/";

  // const handleScroll = (event) => {
  //   const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
  //   setActive(slide);
  // };

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (item && item.filename) {
      const imageUrls = item.filename.split(",").map(filename => imgurl + filename.trim());
      setImages(imageUrls);
    }
  }, [item]);

// const [sliderImages, setsliderImages] = useState([])


  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const nextSlide = (active + 1) % (item.filename ? item.filename.split(",").length : 1);
  //     scrollViewRef.current.scrollTo({ x: nextSlide * width, animated: true });
  //   }, 3000); // Change image every 3 seconds

  //   return () => {
  //     clearInterval(timer); // Clean up the interval when the component unmounts
  //   };
  // }, [active, item.filename]);


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);
  

  return (
    <View style={styles.container}>
      {/* <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        style={styles.scrollView}
        // scrollEventThrottle={16}
      > */}

        {/* {
        item.filename && item.filename.split(",").map((imageUrl, index) => (
          <Image key={index} style={{ height: 200, width: 250 }} source={{ uri: imgurl + imageUrl }} />
        ))
        } */}
  
      {/* </ScrollView> */}

      <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 10 }}>
      <ImageSlider
        loopBothSides
        autoPlayWithInterval={2000}
        images={images}
        customSlide={({ index, item, style, width }) => (
          <View key={index} style={[style]}>
            <Image source={{ uri: item }} style={{ width: 500, height: 300 }} />
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
  style={{ width: 350, height: "40%" }}
/>

   
      
      {/* <View style={styles.pagination}>
        {item.filename && item.filename.split(",").map((_, index) => (
          <Text key={index} style={[styles.paginationDot, index === active && styles.paginationDotActive]}>&bull;</Text>
        ))}
      </View> */}

      
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
     
      <Text style={styles.text1}>{item.booking_id}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.text}>Product_Name</Text>
      
      <Text style={styles.text1}>{item.prod_id}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.text}>Approx Price</Text>
     
      <Text style={styles.text1}>{item.price}</Text>
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
    color: '#3399ff',
    borderBottomWidth: 0.7,
    borderBottomColor: '#3399ff',
    marginBottom: 20,
  },
  text: {
    color: '#3399ff',
    fontWeight: '500',
    fontSize: 16,
    flex: 1,
    
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
    backgroundColor: '#3399ff',
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
    color: '#3399ff',
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


