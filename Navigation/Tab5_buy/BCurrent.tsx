// // // import { View, Text, TouchableOpacity,StyleSheet ,ScrollView, RefreshControl} from 'react-native'
// // // import React, { useEffect, useState } from 'react'
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // // import { ScrollView } from 'react-native-gesture-handler';

// // // const BCurrent = () => {
// // //      const [userId,setUserId]=useState(null)
// // //      const [currentdata,setcurrentdata]=useState([]);
// // //      const [refreshing, setRefreshing] = useState(false)

// // //      useEffect(() => {
// // //       mImp();
// // //      }, [userId]);

// // //      const mImp =()=>{
// // //           fetchData();
// // //        if(userId !== null){
// // //           getcurrent();
// // //        }
// // //      }
// // //      const fetchData = async () => {
// // //           try {
// // //             const storedData = await AsyncStorage.getItem('UserCred');
    
// // //             if (storedData !== null) {
// // //               const userDataObject = JSON.parse(storedData);
// // //               // setUserDataLocalStorage(userDataObject);
    
// // //               // Check if the '0' key exists and 'id' field is present in the object
// // //               if (userDataObject && userDataObject['0'] && userDataObject['0'].id) {
// // //                 const userId = userDataObject['0'].id;
// // //                 setUserId(userId)
// // //                 // Now, userId contains the value of the 'id' field from userDataLOCAL_STORAGE
// // //                 // console.log('in mathod User ID:', userId);
// // //               } else {
// // //                 console.log('No user data or ID found.');
// // //               }
// // //             } else {
// // //               console.log('No data found');
// // //             }
// // //           } catch (error) {
// // //             console.error('Error retrieving data:', error);
// // //           }
    
// // //         };

// // //      const getcurrent = async () => {
// // //           try {
// // //             const formData = new FormData();
// // //             formData.append('user_id', userId);
        
// // //             const response = await fetch('https://shreddersbay.com/API/orders_api.php?action=select_current', {
// // //               method: 'POST',
// // //               body: formData,
// // //               // Add headers if required, such as content-type or authorization
// // //             });
        
// // //             if (response.ok) {
// // //               const responseData = await response.json();
// // //               // Assuming responseData is an array, set it to your state or variable
// // //               const jsonArray: any[] = responseData;
// // //               setcurrentdata(jsonArray)
// // //               console.log('JSON Array:', jsonArray);
// // //               // Set the JSON array to your state or process it accordingly
// // //             } else {
// // //               console.error('Failed to fetch data:', response.status);
// // //             }
// // //           } catch (error) {
// // //             console.error('Error fetching data:', error);
// // //           }
// // //         };
        
// // //         const handleCardClick = (item: any) => {
// // //           // Handle click on card, for example, navigate to a new screen or perform an action
// // //           console.log('Clicked item:', item);
// // //         };
// // //         const onRefresh = () => {
// // //           mImp();
// // //         }
        
// // //   return (
// // // //     <View>
// // // //       <Text>BCurrent</Text>
// // // //       {/* <Text>{JSON.stringify(currentdata)}</Text> */}
// // // //       <View style={styles.container}>
// // // //       {currentdata.map((item, index) => (
          
// // // //         <TouchableOpacity
// // // //           key={index}
// // // //           style={styles.card}
// // // //           onPress={() => handleCardClick(item)}
// // // //         >
// // // //           <Text style={styles.cardText}>{item.booking_id}</Text>
// // // //           {/* Display other data from 'item' */}
// // // //         </TouchableOpacity>
       
// // // //       ))}
// // // //     </View>



// // // //     </View>
// // // <ScrollView 
// // //  refreshControl={
// // //      <RefreshControl
// // //        refreshing={refreshing}
// // //        onRefresh={onRefresh}
// // //        colors={['#0000ff']}
// // //        tintColor="#0000ff"
// // //      />}
// // //  >
// // // <View>
// // //   <Text>BCurrent</Text>
// // //   {/* <Text>{JSON.stringify(currentdata)}</Text> */}
// // //   <View style={styles.container}>
// // //     {currentdata.map((item, index) => (
// // //       <TouchableOpacity
// // //         key={index}
// // //         style={styles.card}
// // //         onPress={() => handleCardClick(item)}
// // //       >
// // //         <Text style={styles.cardText}>{item.address}</Text>
// // //         {/* Display other data from 'item' */}
// // //       </TouchableOpacity>
// // //     ))}
// // //   </View>
// // // </View>
// // // </ScrollView>
// // //   )
// // // }
// // // const styles = StyleSheet.create({
// // //      container: {
// // //        flex: 1,
// // //        alignItems: 'center',
// // //        justifyContent: 'center',
// // //        padding: 20,
// // //      },
// // //      card: {
// // //        backgroundColor: '#fff',
// // //        borderRadius: 8,
// // //        padding: 20,
// // //        marginVertical: 10,
// // //        elevation: 4,
// // //        width: '90%',
// // //        shadowColor: '#000',
// // //        shadowOffset: {
// // //          width: 0,
// // //          height: 2,
// // //        },
// // //        shadowOpacity: 0.25,
// // //        shadowRadius: 3.84,
// // //      },
// // //      cardText: {
// // //        fontSize: 18,
// // //        fontWeight: 'bold',
// // //        marginBottom: 10,
// // //      },
// // //      // Add styles for other card data as needed
// // //    });
   

// // // export default BCurrent


// // import { View, Text, TouchableOpacity,StyleSheet ,ScrollView, RefreshControl} from 'react-native'
// // import React, { useEffect, useState } from 'react'
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import { ScrollView } from 'react-native-gesture-handler';

// // const BCurrent = () => {
// //      const [userId,setUserId]=useState(null)
// //      const [currentdata,setcurrentdata]=useState([]);
// //      const [refreshing, setRefreshing] = useState(false)

// //      useEffect(() => {
// //       mImp();
// //      }, [userId]);

// //      const mImp =()=>{
// //           fetchData();
// //        if(userId !== null){
// //           getcurrent();
// //        }
// //      }
// //      const fetchData = async () => {
// //           try {
// //             const storedData = await AsyncStorage.getItem('UserCred');
    
// //             if (storedData !== null) {
// //               const userDataObject = JSON.parse(storedData);
// //               // setUserDataLocalStorage(userDataObject);
    
// //               // Check if the '0' key exists and 'id' field is present in the object
// //               if (userDataObject && userDataObject['0'] && userDataObject['0'].id) {
// //                 const userId = userDataObject['0'].id;
// //                 setUserId(userId)
// //                 // Now, userId contains the value of the 'id' field from userDataLOCAL_STORAGE
// //                 // console.log('in mathod User ID:', userId);
// //               } else {
// //                 console.log('No user data or ID found.');
// //               }
// //             } else {
// //               console.log('No data found');
// //             }
// //           } catch (error) {
// //             console.error('Error retrieving data:', error);
// //           }
    
// //         };

// //      const getcurrent = async () =>
// //       {
// //           try {
// //             const formData = new FormData();
// //             formData.append('user_id', userId);
        
// //             const response = await fetch('https://shreddersbay.com/API/orders_api.php?action=select_current', {
// //               method: 'POST',
// //               body: formData,
// //               // Add headers if required, such as content-type or authorization
// //             });
        
// //             if (response.ok) {
// //               const responseData = await response.json();
// //               // Assuming responseData is an array, set it to your state or variable
// //               const jsonArray: any[] = responseData;
// //               setcurrentdata(jsonArray)
// //               console.log('JSON Array:', jsonArray);
// //               // Set the JSON array to your state or process it accordingly
// //             } else {
// //               console.error('Failed to fetch data:', response.status);
// //             }
// //           } catch (error) {
// //             console.error('Error fetching data:', error);
// //           }
// //       };
        
// //         const handleCardClick = (item: any) => {
// //           // Handle click on card, for example, navigate to a new screen or perform an action
// //           console.log('Clicked item:', item);
// //         };
// //         const onRefresh = () => {
// //           mImp();
// //         }
        
// //   return (
// // //     <View>
// // //       <Text>BCurrent</Text>
// // //       {/* <Text>{JSON.stringify(currentdata)}</Text> */}
// // //       <View style={styles.container}>
// // //       {currentdata.map((item, index) => (
          
// // //         <TouchableOpacity
// // //           key={index}
// // //           style={styles.card}
// // //           onPress={() => handleCardClick(item)}
// // //         >
// // //           <Text style={styles.cardText}>{item.booking_id}</Text>
// // //           {/* Display other data from 'item' */}
// // //         </TouchableOpacity>
       
// // //       ))}
// // //     </View>



// // //     </View>
// // <ScrollView 
// //  refreshControl={
// //      <RefreshControl
// //        refreshing={refreshing}
// //        onRefresh={onRefresh}
// //        colors={['#0000ff']}
// //        tintColor="#0000ff"
// //      />}
// //  >
// // <View>
 
// //   {/* <Text>{JSON.stringify(currentdata)}</Text> */}
// //   <View style={styles.container}>
// //     {currentdata.map((item, index) => (
// //       <TouchableOpacity
// //         key={index}
// //         style={styles.card}
// //         onPress={() => handleCardClick(item)}
// //       >
// //         <Text style={styles.cardText}>Booking Id:  {item.booking_id}</Text>
// //         <Text style={styles.cardText1}>{item.p_name}</Text>
// //         <Text style={styles.cardText2}>Weight: {item.weight}</Text>
// //         <Text style={styles.cardText2}>Approx_price: Rs {item.approx_price}</Text>
// //         <Text style={styles.cardText2}>Booking_date: {item.booking_date}</Text>
// //         <Text style={styles.cardText2}>Schedule Date: {item.schedule_date}</Text>
// //         {/* Display other data from 'item' */}
// //       </TouchableOpacity>
// //     ))}
// //   </View>
// // </View>
// // </ScrollView>
// //   )
// // }
// // const styles = StyleSheet.create({
// //      container: {
// //        flex: 1,
// //        alignItems: 'center',
// //        justifyContent: 'center',
// //        padding: 8,
// //      },
// //      card: {
// //        backgroundColor: '#fff',
// //        borderRadius: 8,
// //        padding: 15,
// //        marginVertical: 6,
// //        elevation: 4,
// //        width: '100%',
// //        shadowColor: '#000',
// //        shadowOffset: {
// //          width: 0,
// //          height: 2,
// //        },
// //        shadowOpacity: 0.25,
// //        shadowRadius: 3.84,
// //      },
// //      cardText: {
// //        fontSize: 20,
// //        fontWeight: '800',
// //        marginBottom: 2,
// //        color: 'brown'
// //      },

// //      cardText1:{
// //        fontSize: 20,
// //        fontWeight: '600',
// //        marginBottom: 2,
// //        color: 'black'
// //      },

// //      cardText2:{
// //       fontSize: 14,
// //       fontWeight: '600',
// //       marginBottom: 2,
// //       color: 'gray'
// //      },
// //      // Add styles for other card data as needed
// //    });
   

// // export default BCurrent











// // import { View, Text, TouchableOpacity,StyleSheet ,ScrollView, RefreshControl} from 'react-native'
// // import React, { useEffect, useState } from 'react'
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import { ScrollView } from 'react-native-gesture-handler';

// // const BCurrent = () => {
// //      const [userId,setUserId]=useState(null)
// //      const [currentdata,setcurrentdata]=useState([]);
// //      const [refreshing, setRefreshing] = useState(false)

// //      useEffect(() => {
// //       mImp();
// //      }, [userId]);

// //      const mImp =()=>{
// //           fetchData();
// //        if(userId !== null){
// //           getcurrent();
// //        }
// //      }
// //      const fetchData = async () => {
// //           try {
// //             const storedData = await AsyncStorage.getItem('UserCred');
    
// //             if (storedData !== null) {
// //               const userDataObject = JSON.parse(storedData);
// //               // setUserDataLocalStorage(userDataObject);
    
// //               // Check if the '0' key exists and 'id' field is present in the object
// //               if (userDataObject && userDataObject['0'] && userDataObject['0'].id) {
// //                 const userId = userDataObject['0'].id;
// //                 setUserId(userId)
// //                 // Now, userId contains the value of the 'id' field from userDataLOCAL_STORAGE
// //                 // console.log('in mathod User ID:', userId);
// //               } else {
// //                 console.log('No user data or ID found.');
// //               }
// //             } else {
// //               console.log('No data found');
// //             }
// //           } catch (error) {
// //             console.error('Error retrieving data:', error);
// //           }
    
// //         };

// //      const getcurrent = async () =>
// //       {
// //           try {
// //             const formData = new FormData();
// //             formData.append('user_id', userId);
        
// //             const response = await fetch('https://shreddersbay.com/API/orders_api.php?action=select_current', {
// //               method: 'POST',
// //               body: formData,
// //               // Add headers if required, such as content-type or authorization
// //             });
        
// //             if (response.ok) {
// //               const responseData = await response.json();
// //               // Assuming responseData is an array, set it to your state or variable
// //               const jsonArray: any[] = responseData;
// //               setcurrentdata(jsonArray)
// //               console.log('JSON Array:', jsonArray);
// //               // Set the JSON array to your state or process it accordingly
// //             } else {
// //               console.error('Failed to fetch data:', response.status);
// //             }
// //           } catch (error) {
// //             console.error('Error fetching data:', error);
// //           }
// //       };
        
// //         const handleCardClick = (item: any) => {
// //           // Handle click on card, for example, navigate to a new screen or perform an action
// //           console.log('Clicked item:', item);
// //         };
// //         const onRefresh = () => {
// //           mImp();
// //         }
        
// //   return (
// // <ScrollView 
// //  refreshControl={
// //      <RefreshControl
// //        refreshing={refreshing}
// //        onRefresh={onRefresh}
// //        colors={['#0000ff']}
// //        tintColor="#0000ff"
// //      />}
// //  >
// // <View>
 
// //   {/* <Text>{JSON.stringify(currentdata)}</Text> */}
// //   <View style={styles.container}>
// //     {currentdata.map((item, index) => (
// //       <TouchableOpacity
// //         key={index}
// //         style={styles.card}
// //         onPress={() => handleCardClick(item)}
// //       >
// //         <Text style={styles.cardText}>Booking Id:  {item.booking_id}</Text>
// //         <Text style={styles.cardText1}>{item.p_name}</Text>
// //         <Text style={styles.cardText2}>Weight: {item.weight}</Text>
// //         <Text style={styles.cardText2}>Approx_price: Rs {item.approx_price}</Text>
// //         <Text style={styles.cardText2}>Booking_date: {item.booking_date}</Text>
// //         <Text style={styles.cardText2}>Schedule Date: {item.schedule_date}</Text>
// //         {/* Display other data from 'item' */}
// //       </TouchableOpacity>
// //     ))}
// //   </View>
// // </View>
// // </ScrollView>
// //   )
// // }
// // const styles = StyleSheet.create({
// //      container: {
// //        flex: 1,
// //        alignItems: 'center',
// //        justifyContent: 'center',
// //        padding: 8,
// //      },
// //      card: {
// //        backgroundColor: '#fff',
// //        borderRadius: 8,
// //        padding: 15,
// //        marginVertical: 6,
// //        elevation: 4,
// //        width: '100%',
// //        shadowColor: '#000',
// //        shadowOffset: {
// //          width: 0,
// //          height: 2,
// //        },
// //        shadowOpacity: 0.25,
// //        shadowRadius: 3.84,
// //      },
// //      cardText: {
// //        fontSize: 20,
// //        fontWeight: '800',
// //        marginBottom: 2,
// //        color: 'brown'
// //      },

// //      cardText1:{
// //        fontSize: 20,
// //        fontWeight: '600',
// //        marginBottom: 2,
// //        color: 'black'
// //      },

// //      cardText2:{
// //       fontSize: 14,
// //       fontWeight: '600',
// //       marginBottom: 2,
// //       color: 'gray'
// //      },
// //      // Add styles for other card data as needed
// //    });
   

// // export default BCurrent




// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Button, Alert } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons';
// // import { ScrollView } from 'react-native-gesture-handler';

// const BCurrent = ({navigation}) => {
//   const [userId, setUserId] = useState(null)
//   const [currentdata, setcurrentdata] = useState([]);
//   const [refreshing, setRefreshing] = useState(false)

//   useEffect(() => {
//     mImp();
//   }, [userId]);

//   const mImp = () => {
//     fetchData();
//     if (userId !== null) {
//       getcurrent();
//     }
//   }
//   const fetchData = async () => {
//     try {
//       const storedData = await AsyncStorage.getItem('UserCred');

//       if (storedData !== null) {
//         const userDataObject = JSON.parse(storedData);
//         // setUserDataLocalStorage(userDataObject);

//         // Check if the '0' key exists and 'id' field is present in the object
//         if (userDataObject && userDataObject['0'] && userDataObject['0'].id) {
//           const userId = userDataObject['0'].id;
//           setUserId(userId)
//           // Now, userId contains the value of the 'id' field from userDataLOCAL_STORAGE
//           // console.log('in mathod User ID:', userId);
//         } else {
//           console.log('No user data or ID found.');
//         }
//       } else {
//         console.log('No data found');
//       }
//     } catch (error) {
//       console.error('Error retrieving data:', error);
//     }

//   };

//   const getcurrent = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('user_id', userId);

//       const response = await fetch('https://shreddersbay.com/API/orders_api.php?action=select_current', {
//         method: 'POST',
//         body: formData,
//         // Add headers if required, such as content-type or authorization
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         // Assuming responseData is an array, set it to your state or variable
//         const jsonArray: any[] = responseData;
//         setcurrentdata(jsonArray)
//         console.log('JSON Array:', jsonArray);
//         // Set the JSON array to your state or process it accordingly
//       } else {
//         console.error('Failed to fetch data:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   const [isChoose, setIsChoose] = useState(false);

//   const handleCardClick = (item: any) => {
//     setIsChoose(!isChoose)
//     // Handle click on card, for example, navigate to a new screen or perform an action
//     console.log('Clicked item:', item);
//     showCustomAlert(item)

//   }
//   const showCustomAlert = (item) => {
//     Alert.alert(
//       'Confirmation',
//       'Do you want to Buy Complete?',
//       [
//         {
//           text: 'No',
//           onPress: () => {
//             // Do something when "No" is pressed
//             console.log('User pressed No');
//             setIsChoose(false)
//           },
//           style: 'cancel',
//         },
//         {
//           text: 'Yes',
//           onPress: () => {
//             // Do something when "Yes" is pressed
//             console.log('User pressed Yes');
//             handleChoose(item)
            
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };
//   const onRefresh = () => {
//     mImp();
//   }
//   const [responseData, setResponseData] = useState<string>('');

//   const handleChoose= async (item)=>{
//     try {
//       const apiUrl = 'https://shreddersbay.com/API/orders_api.php?action=complete'; // Replace with your actual API endpoint

//       // const requestBody = {
//       //   booking_id: item.booking_id,
//       //   user_id: item.id,
//       //   // Add other data as needed
//       // };
//       const formData = new FormData()
//       formData.append('booking_id',item.booking_id);
//       formData.append('user_id',userId)
      


//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           // Add any necessary headers here
//         },
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         setResponseData(JSON.stringify(data));
//         console.log(responseData);
//         navigation.navigate('BCompleted')


        
        
//       } else {
//         // Handle error cases
//         console.error('Error:', response.status, response.statusText);
//       }
//     } catch (error) {
//       // Handle network errors or other exceptions
//       console.error('Error:', error);
//     }
//   }

//   return (

//     <ScrollView
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={['#0000ff']}
//           tintColor="#0000ff"
//         />}
//     >
//       <View>

//         {/* <Text>{JSON.stringify(currentdata)}</Text> */}
//         <View style={{ ...styles.container, flexDirection: 'row' }}>
//           {currentdata.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.card}
//               onPress={() => handleCardClick(item)}
//             >

//               <View style={{flex:1,flexDirection:"row"}}>
//                 <View>
//                 <Text style={styles.cardText}>Booking Id:  {item.booking_id}</Text>
//                 <Text style={styles.cardText1}>{item.p_name}</Text>
//                 <Text style={styles.cardText2}>Weight: {item.weight}</Text>
//                 <Text style={styles.cardText2}>Approx_price: Rs {item.approx_price}</Text>
//                 <Text style={styles.cardText2}>Booking_date: {item.booking_date}</Text>
//                 <Text style={styles.cardText2}>Schedule Date: {item.schedule_date}</Text>
//                 {/* Display other data from 'item' */}
//                 </View>
               

//                 <View>
//                   {(isChoose === true) ? (
//                     <Ionicons name="checkmark-circle" style={{ fontSize: 40, color: 'brown' }} />
//                   ) : <></>}
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </ScrollView>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 8,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 15,
//     marginVertical: 6,
//     elevation: 4,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   cardText: {
//     fontSize: 20,
//     fontWeight: '800',
//     marginBottom: 2,
//     color: 'brown'
//   },

//   cardText1: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 2,
//     color: 'black'
//   },

//   cardText2: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 2,
//     color: 'gray'
//   },
//   // Add styles for other card data as needed
// });


// export default BCurrent





import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
// import { ScrollView } from 'react-native-gesture-handler';

const BCurrent = ({navigation}) => {
  const [userId, setUserId] = useState(null)
  const [currentdata, setcurrentdata] = useState([]);
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    mImp();
  }, [userId]);

  const mImp = () => {
    fetchData();
    if (userId !== null) {
      getcurrent();
    }
  }
  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('UserCred');

      if (storedData !== null) {
        const userDataObject = JSON.parse(storedData);
        // setUserDataLocalStorage(userDataObject);

        // Check if the '0' key exists and 'id' field is present in the object
        if (userDataObject && userDataObject['0'] && userDataObject['0'].id) {
          const userId = userDataObject['0'].id;
          setUserId(userId)
          // Now, userId contains the value of the 'id' field from userDataLOCAL_STORAGE
          // console.log('in mathod User ID:', userId);
        } else {
          console.log('No user data or ID found.');
        }
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }

  };

  const getcurrent = async () => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);

      const response = await fetch('https://shreddersbay.com/API/orders_api.php?action=select_current', {
        method: 'POST',
        body: formData,
        // Add headers if required, such as content-type or authorization
      });

      if (response.ok) {
        const responseData = await response.json();
        // Assuming responseData is an array, set it to your state or variable
        const jsonArray: any[] = responseData;
        setcurrentdata(jsonArray)
        console.log('JSON Array:', jsonArray);
        // Set the JSON array to your state or process it accordingly
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [isChoose, setIsChoose] = useState(false);
  // const [currentdata, setCurrentData] = useState([]); // Your data state

  
  // const handleCardClick = (item: any) => {
    // setIsChoose(!isChoose)
    // // Handle click on card, for example, navigate to a new screen or perform an action
    // console.log('Clicked item:', item);
    // showCustomAlert(item)

  // }
  const showCustomAlert = (item) => {
    Alert.alert(
      'Confirmation',
      'Do you want to Buy Complete?',
      [
        {
          text: 'No',
          onPress: () => {
            // Do something when "No" is pressed
            console.log('User pressed No');
            setSelectedCard(null)
            
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Do something when "Yes" is pressed
            console.log('User pressed Yes');
            handleChoose(item)
            
          },
        },
      ],
      { cancelable: false }
    );
  };
  const onRefresh = () => {
    mImp();
  }
  const [responseData, setResponseData] = useState<string>('');

  const handleChoose= async (item)=>{
    try {
      const apiUrl = 'https://shreddersbay.com/API/orders_api.php?action=complete'; // Replace with your actual API endpoint

      // const requestBody = {
      //   booking_id: item.booking_id,
      //   user_id: item.id,
      //   // Add other data as needed
      // };
      const formData = new FormData()
      formData.append('booking_id',item.booking_id);
      formData.append('user_id',userId)
      


      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any necessary headers here
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setResponseData(JSON.stringify(data));
        console.log(responseData);
        navigation.navigate('BCompleted')


        
        
      } else {
        // Handle error cases
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (item) => {
    if (selectedCard === item.booking_id) {
      setSelectedCard(null); // Unselect the card if it's already selected
    } else {
      setSelectedCard(item.booking_id); // Select the clicked card
    }
    showCustomAlert(item)
  };

  return (

    <ScrollView
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={['#0000ff']}
      tintColor="#0000ff"
    />
  }
>
  <View>
    <View style={{ ...styles.container, flexDirection: 'column' }}>
    {currentdata.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, selectedCard === item.booking_id && styles.selectedCard]}
          onPress={() => handleCardClick(item)}
        >
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={styles.cardText}>Booking Id: {item.booking_id}</Text>
              <Text style={styles.cardText1}>{item.p_name}</Text>
              <Text style={styles.cardText2}>Weight: {item.weight}</Text>
              <Text style={styles.cardText2}>Approx_price: Rs {item.approx_price}</Text>
              <Text style={styles.cardText2}>Booking_date: {item.booking_date}</Text>
              <Text style={styles.cardText2}>Schedule Date: {item.schedule_date}</Text>
              {/* Display other data from 'item' */}
            </View>

            <View>
              {selectedCard === item.booking_id && (
                <Ionicons name="checkmark-circle" style={{ fontSize: 40, color: 'brown' }} />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
</ScrollView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 6,
    elevation: 4,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
    color: 'brown'
  },

  cardText1: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
    color: 'black'
  },

  cardText2: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    color: 'gray'
  },
  card0: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between', // Align checkmark to the right
  },
  selectedCard: {
    backgroundColor: '#e0e0e0', // Highlight selected card
  },
  cardText0: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardText11: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardText22: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  // Add styles for other card data as needed
});


export default BCurrent