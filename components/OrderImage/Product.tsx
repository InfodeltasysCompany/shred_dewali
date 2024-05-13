

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
import { View, ScrollView, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const Product = ({ item, handlebuypress, getusers }) => {
  const scrollViewRef = useRef<ScrollView>(null);
    const [active, setActive] = useState(0);

  const imgurl = "https://shreddersbay.com/API/uploads/";

  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setActive(slide);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = (active + 1) % (item.filename ? item.filename.split(",").length : 1);
      scrollViewRef.current.scrollTo({ x: nextSlide * width, animated: true });
    }, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(timer); // Clean up the interval when the component unmounts
    };
  }, [active, item.filename]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        style={styles.scrollView}
        // scrollEventThrottle={16}
      >
        {item.filename && item.filename.split(",").map((imageUrl, index) => (
          <Image key={index} style={{ height: 200, width }} source={{ uri: imgurl + imageUrl }} />
        ))}
       
      </ScrollView>

      
      <View style={styles.pagination}>
        {item.filename && item.filename.split(",").map((_, index) => (
          <Text key={index} style={[styles.paginationDot, index === active && styles.paginationDotActive]}>&bull;</Text>
        ))}
      </View>


      <View >
        <View >
          <Text style={styles.detail}>PRODUCT DETAIL</Text>
          <Text style={styles.text}>Booking_ID: {item.booking_id}</Text>
          <Text style={styles.text}>Product_Name: {item.p_name}</Text>
          <Text style={styles.text}>Approx Price: {item.price}</Text>
          <Text style={styles.text}>Booking_Date: {item.booking_date}</Text>
          <Text style={styles.text}>Schedule Date: {item.schedule_date}</Text>
          <Text style={styles.text}>Weight: {item.weight}</Text>
        </View>
        <View >
          <Text style={styles.detail}>CUSTOMER DETAIL</Text>
          <Text style={styles.text}>Name: {item.name}</Text>
          <Text style={styles.text}>Mobile: {item.mobile}</Text>
          <Text style={styles.text}>Area: {item.area}</Text>
          <Text style={styles.text}>Address: {item.address}</Text>
          <Text style={styles.text}>Landmark: {item.landmark}</Text>
          <Text style={styles.text}>Pincode: {item.pin_code}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlebuypress} style={styles.button}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getusers} style={styles.button}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 40,
    alignItems: 'center',
  },
  scrollView: {
    height: 200,
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
    paddingBottom:30,
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
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 20,
    color: '#cccc00',
    borderBottomWidth: 0.7,
    marginBottom: 5,
  },
  text: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#cccc00',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});


