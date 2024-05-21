import React, { useEffect, useId, useState, useLayoutEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getApiResponse } from '../Tab3/functions';
import { AuthContext } from '../../redux/ContextApi/UserAuthProvider';
// import { Stack2ParamList } from '../../App';
// import { setAddress } from '../../redux/actions/sAddressAction';


const T2Screen2 = ({ navigation }) => {
  // const navigation = useNavigation<NavigationProp<Stack2ParamList>>();
  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password } = state;

  const [userDataLOCAL_STORAGE, setLocalUserData] = useState<{ [key: string]: any } | null>(null);
  const [userId, setUserId] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  
  const [checkedAddressId, setCheckedAddressId] = useState<string>('');
  const [selectedAddressDetails, setSelectedAddressDetails] = useState<any>({});

  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    fetchApiData(userIdApp)
  }, [userIdApp])

  const fetchUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('UserCred');
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setLocalUserData(parsedData);
        extractId(parsedData);
      } else {
        console.log('No data found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const extractId = (data: { [key: string]: any } | null) => {
    if (data && data['0']) {
      const id = data['0'].id;
      setUserId(id);
      // fetchApiData(id);
    } else {
      console.log('ID not found in the parsed data');
    }
  };

  const fetchApiData = async (id: string) => {
    const url = 'https://shreddersbay.com/API/address_api.php?action=AddrByUserId&user_id=' + userIdApp;
    try {
           
      let response = await getApiResponse(url);
      console.log("check response:-", response)
      setData(response);
      setSelectedCountry(response.length > 0 ? response[0].country_name : '');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const scrapDetails = useSelector((state: any) => state.myscrap.scrapDetails);
  const chosenDateTime = useSelector((state: any) => state.myscrap.chosenDateTime);

  const apiUrl = 'https://shreddersbay.com/API/orders_api.php?action=insert';



  const continueWithChoosenDate = async () => {
    console.log("this is for testing again--->", scrapDetails, chosenDateTime, selectedAddressDetails);
    console.log("my first log is for submit:-", userIdApp);
    console.log(scrapDetails);
    const scrrapdelails = [scrapDetails]
    
    try {
      if (scrrapdelails && scrrapdelails.length > 0 && chosenDateTime && selectedAddressDetails) {
        // Use array indexing to get the first item
        const scrapDetails = scrrapdelails[0];
        console.log("for testing :-",scrapDetails);
        
  
        const weight: string = scrapDetails.weight; // Get the weight string from the first item
      const prod_id: string = scrapDetails.prod_id;
      const price: string = scrapDetails.price;
      const filename: string = scrapDetails.filename;
      const add_id: string = selectedAddressDetails.addr_id;
      const booking_date: string = scrapDetails.filename;



      console.log("weight:-" + weight, "pro_id-", +prod_id, "price-" + filename, "add_id-" + add_id, 'booking_date-' + booking_date);

      const formData = new FormData();
      formData.append('user_id', userIdApp);
      formData.append('approx_weight', weight);
      formData.append('prod_id', prod_id);
      formData.append('booking_date', booking_date);
      formData.append('schedule_date', chosenDateTime);
      formData.append('approx_price', price);
      formData.append('filename', filename);
      formData.append('addr_id', add_id);

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
          // navigation.navigate('Tab1', { screen: 'T2Screen2' });
          console.log('Data inserted successfully!');
          navigation.navigate('Tab1', { screen: 'T2Screen2' });
        } else {
          // Insertion failed
          console.error('Failed to insert data');
        }
      } catch (error) {
        console.error('Error occurred while inserting data:', error);
      }

      } else {
        console.log('Data missing...');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  
  
  
  const deleteAdd = async (address) => {
    // need to call a delete api for delete api's
    const url = "https://shreddersbay.com/API/address_api.php?action=delete";
    const formData = new FormData();
    // setADDEDITModalAddress(address);
    try {
        formData.append("addr_id", address.addr_id);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data', // Specify the content type as FormData
                // You can add other headers here if needed
            },
            body: formData, // Pass the FormData object as the body
        });
        if (response.ok) {
            Alert.alert("Address Deleted SuccessFully")
        }
    } catch (error) {

    }
}
  // const deleteAdd = async (address: string) => {
  //   try {
  //     const id = address;
  //     const response = await fetch(
  //       `https://shreddersbay.com/API/address_api.php?action=delete&addr_id=${id}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     console.log(`thsi is address:-${address}`)
  //     if (response.ok) {
  //       console.log("Item deleted successfully");
  //       // console.log("Address delete response:", response);
  //     } else {
  //       // Handle the error or failed deletion response
  //       console.error("Failed to delete item:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };

  /////////////////////////////////////////////////////////////////////////////////////////////////


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
      // dispatch(setAddress(addressDetails));



    }
  };
  const dispatch = useDispatch();
  // const address = useSelector((state: any) => state.address.address);

  const [refreshing, setRefreshing] = useState(false);
  // const onRefresh = React.useCallback(async () => {
  //   setRefreshing(true);
  //   try {
  //     await fetchUserData();
  //   } catch (error) {
  //     console.error('Error while refreshing data:', error);
  //   } finally {
  //     setRefreshing(false);
  //   }
  // }, []);

  const onRefresh = () => {
    fetchUserData();
    fetchApiData(userIdApp);
  }

  return (
    <View style={{flex: 1}} >

      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#0000ff']}
          tintColor="#0000ff"
        />
      }>

        <View>

          <View style={styles.container}>
            <View style={styles.bottomButton1}>
              <TouchableOpacity
                onPress={() => navigation.navigate('T2Screen3')}
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
          {/* Display fetched data in card-like format */}
          {data.map((address: any) => (
            <TouchableOpacity
              key={address.addr_id}
              onPress={() => handleonCheckboxaddress(address.addr_id, address)}
            >

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                padding: 5,
              }}>


                <View style=
                  {{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:"space-evenly"


                  }}
                >
                  {/* <View
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
                  </View> */}
                  <View key={address.addr_id} style={styles.card}>
                    <Text style={styles.addtext}>Address: {address.address}</Text>
                    <Text style={styles.addtext}>City: {address.city_name}</Text>
                    <Text style={styles.addtext}>State: {address.state_name}</Text>
                    <Text style={styles.addtext}>Country: {address.country_name}</Text>
                    {/* Add other address details as needed */}
                  </View>

                  <View style={{...styles.Delete,marginLeft:30}}>
                    <MaterialIcons name="delete-outline"
                    onPress={()=>deleteAdd(address)}
                    style=
                    {{
                      fontSize: 30,
                      paddingRight: 10,
                      color: 'red'
                      }}/>
                    {/* <FontAwesome name="edit"
                    style=
                    {{
                      fontSize: 30,
                      color: 'green'
                      }}
                      /> */}
                  </View>


                </View>
              </View>

            </TouchableOpacity>
          ))}
        </View>


      </ScrollView>
      {/* ... (bottomButton code remains the same) */}
<View style={styles.bottomView1}>

{/* 
        <TouchableOpacity
          onPress={continueWithChoosenDate}
          style={styles.touchableOpacityStyle1}>
          <Text style={styles.textStyle1}

          >Deliver Here</Text>
        </TouchableOpacity> */}

</View>
    </View>
  );
};


const styles = StyleSheet.create({
  

  addtext:{
    fontSize: 16,
  },

  Delete: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableOpacityStyle1: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: 500,

    // Other styles
  },
  textStyle1: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'blue',
    textAlign: 'center',
    padding: 18,
    borderWidth: 1,
    borderColor: 'blue',
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
    backgroundColor: 'transparent',
    padding: 15,
    width: '65%',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    
  },
  // bottomButton: {
  //   backgroundColor: 'skyblue', // Adjust as needed
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   marginHorizontal: 0,
  //   marginBottom: 0,
  //   borderRadius: 5,
  // },
  bottomView1: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'transparent',
   
  


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
    marginTop: 0,
    padding: 8,
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

export default T2Screen2;
