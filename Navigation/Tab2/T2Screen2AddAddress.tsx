import React, { useEffect, useId, useState, useLayoutEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { setAddress } from '../../redux/actions/sAddressAction';
import { AuthContext } from '../../redux/ContextApi/UserAuthProvider';


const T2Screen2AddAddress = ({ navigation }) => {
   
  
  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp,f_email, f_mobile, f_id, f_name, f_password  } = state;

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: '', // Hide the tab bar for this screen
    });
  }, [navigation]);
  
  const [userDataLOCAL_STORAGE, setLocalUserData] = useState<{ [key: string]: any } | null>(null);
  const [userId, setUserId] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    // fetchUserData();
        fetchApiData(userIdApp);

  }, []);
  useEffect(() => {
    fetchApiData(userIdApp)
  }, [userIdApp])

  // const fetchUserData = async () => {
  //   try {
  //     const storedData = await AsyncStorage.getItem('UserCred');
  //     if (storedData !== null) {
  //       const parsedData = JSON.parse(storedData);
  //       setLocalUserData(parsedData);
  //       extractId(parsedData);
  //     } else {
  //       console.log('No data found in AsyncStorage');
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving data:', error);
  //   }
  // };

  // const extractId = (data: { [key: string]: any } | null) => {
  //   if (data && data['0']) {
  //     const id = data['0'].id;
  //     setUserId(id);
  //     // fetchApiData(id);
  //   } else {
  //     console.log('ID not found in the parsed data');
  //   }
  // };

  const fetchApiData = async (id: string) => {
    const url = 'https://shreddersbay.com/API/address_api.php?action=AddrByUserId&user_id=' + userIdApp;
    try {
      // const url = `https://shreddersbay.com/API/address_api.php?action=AddrByUserId&user_id=1999`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log("All address result:-", result)
      console.log("check address response:-",response)
      setData(result);
      setSelectedCountry(result.length > 0 ? result[0].country_name : '');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      // await fetchUserData();
    } catch (error) {
      console.error('Error while refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);
  const sellFormData = useSelector((state: any) => state.sellFormData.formData);
  const weight1 = useSelector((state: any) => state.weight);
  const image1 = useSelector((state: any) => state.image);
  const { currentDateTime, formattedDateTime } = useSelector((state: any) => state.datetime);
  const address = useSelector((state: any) => state.address.address);
  const apiUrl = 'https://shreddersbay.com/API/orders_api.php?action=insert';



  const continueWithChoosenDate = async () => {
    console.log("my first log is for submit:-", userIdApp);
    console.log(sellFormData);

    // Extract values from sellFormData
    const prodId = sellFormData.prod_id;
    const price = sellFormData.price;
    const weight = sellFormData.weight;

    // To get the name object
    let name = '';
    sellFormData._parts.forEach(part => {
      if (part[0] === "file") {
        name = part[1].name;
      }
    });
    // console.warn(name);
    console.log(name);
    
    
    const fileObject = sellFormData.file;
    // const name = sellFormData.file ? sellFormData.file.name : undefined;
    const addrId = address.addr_id;
    const formData = new FormData();
    formData.append('user_id', userIdApp);
    formData.append('approx_weight', weight);
    formData.append('prod_id', prodId);
    formData.append('booking_date', currentDateTime.toString());
    formData.append('schedule_date', formattedDateTime.toString());
    formData.append('approx_price', price);
    formData.append('filename', name);
    formData.append('addr_id', addrId);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        // Insertion successfuld
        navigation.navigate('Tab1', { screen: 'T2Screen2AddAddress' });
        console.log('Data inserted successfully!');
      } else {
        // Insertion failed
        console.error('Failed to insert data');
      }
    } catch (error) {
      console.error('Error occurred while inserting data:', error);
    }
  };

 

  //////////////////////////////////////////////////

  const [checkedAddressId, setCheckedAddressId] = useState<string>('');
  const [selectedAddressDetails, setSelectedAddressDetails] = useState<any>({});

  const handleonCheckboxaddress = (addressId: string, addressDetails: any) => {

    if (checkedAddressId === addressId) {
      // Uncheck the checkbox if it's already checked
      setCheckedAddressId('');
      setSelectedAddressDetails({});
    } else {
      // Check the clicked checkbox and uncheck the previously checked checkbox
      setCheckedAddressId(addressId);
      setSelectedAddressDetails(addressDetails);
      console.log(addressDetails);
      console.log(userIdApp);
      dispatch(setAddress(addressDetails));



    }
  };
  const dispatch = useDispatch();
  // const address = useSelector((state: any) => state.address.address);



  return (
    <View>
      {/* <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#9Bd35A', '#689F38']}
          tintColor="#689F38"
        /> */}
         <View style={styles.container}>
            <View style={styles.bottomButton1}>
              <TouchableOpacity
                onPress={() => navigation.navigate('T2Screen3AddAddress2')}
                style={styles.touchableOpacityStyle}
              >
                <View style={styles.rowContainer}>
                  <View style={styles.addaddress}>
                    <FontAwesome name="plus" style={styles.icon} />
                  </View>
                  <Text style={styles.textStyle}>Add a New Address</Text>
                </View>
              </TouchableOpacity>
            </View>
    </View>
        <ScrollView>
      
        <View>

       
          {/* Display fetched data in card-like format */}
          
          {data &&
  data
    .slice() // Create a shallow copy of the array to avoid mutating the original data
    .reverse() // Reverse the order of the array
    .map((address: any) => (
      <TouchableOpacity
        key={address.addr_id}
        onPress={() => handleonCheckboxaddress(address.addr_id, address)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: 'black',
            }}
          >
            {checkedAddressId === address.addr_id && (
              <View
                style={{
                  height: 22,
                  width: 22,
                  borderRadius: 13,
                  backgroundColor: 'black',
                  padding: 0,
                  margin: 2,
                }}
              />
            )}
          </View>
          <View key={address.addr_id} style={styles.card}>
            <Text>Address: {address.address}</Text>
            <Text>City: {address.city_name}</Text>
            <Text>State: {address.state_name}</Text>
            <Text>Country: {address.country_name}</Text>
            <Text>{JSON.stringify(address)}</Text>
            <Text></Text>
            {/* <Text>pincode:{address.pincode}</Text> */}
            {/* Add other address details as needed */}
          </View>
        </View>
      </TouchableOpacity>
    ))}


        </View>
      </ScrollView>
      {/* ... (bottomButton code remains the same) */}
      <View style={styles.bottomView1}>
        
      
          <TouchableOpacity 
           onPress={continueWithChoosenDate}
           style={styles.touchableOpacityStyle1}
          >

            <Text  style={styles.textStyle1}>
                Deliver Here  <FontAwesome style={{fontSize: 20}} name ="long-arrow-right" />
            
            </Text>

           
         
          </TouchableOpacity>
       
      </View>
    </View>
  );
};


const styles = StyleSheet.create({

 

  touchableOpacityStyle1: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 500,
   
    // Other styles
  },
  textStyle1: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'black',
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    // Other styles
  },

  cardContainer: {
    marginTop: 20, // Adjust the margin as per your requirement
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 17,
    width: '100%',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  bottomButton: {
   
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 0,
    marginBottom: 0,
    borderRadius: 5,
    
  },
  bottomView1: {
    position: 'absolute',
    width: '100%',
    top: 530,
    bottom: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  
  },

  container: {
    flex: 1,
    // Other styles
  },
  bottomButton1: {
    // backgroundColor: 'pink',
    // color: 'black',
  },
  touchableOpacityStyle: {
    // Other styles
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 5,
    padding: 12,
    borderRadius:6,
  },
  addaddress: {
    marginRight: 10,
  },
  icon: {
    fontSize: 20,
    color: 'blue',
  },
  textStyle: {
    fontSize: 20,
    color: 'blue',
  },
});

export default T2Screen2AddAddress;
