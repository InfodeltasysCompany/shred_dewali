
import { Alert, Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import {
  MaterialIcons
} from '@expo/vector-icons';
import { getCurrentLocation } from "../../../Navigation/Tab3/functions"
import { BASE_URL } from '../../../ReuseComponent/Env';
// import { setAddress } from '../../../redux/actions/sAddressAction';

const EditAddress = ({ visible, onClose, item }) => {

  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password } = state;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [userDataLOCAL_STORAGE, setUserDataLocalStorage] = useState(null);
  const [iscountrydrpdwnenabled, setIscountrydrpdwnenabled] = useState(false);
  const [isstatedrpdwnenabled, setIsstatedrpdwnenabled] = useState(false);
  const [iscitydrpdwnenabled, setIscitydrpdwnenabled] = useState(false);
  const [isaddressplacedrpdwnenabled, setIsaddressplacedrpdwnenabled] = useState(false);
  const [iscountrydrpdwnfilled, setIscountrydrpdwnfilled] = useState(false);
  const [isstatedrpdwnfilled, setIsstatedrpdwnfilled] = useState(false);
  const [iscitydrpdwnfilled, setIscitydrpdwnfilled] = useState(false);
  const [isaddressdrpdwnfilled, setIsaddressdrpdwnfilled] = useState(false);
  const [ishousenofiled, setIshousenofiled] = useState(false);
  const [islandmarkfilled, setIslandmarkfilled] = useState(false);
  const [ispincodefilled, setIspincodefilled] = useState(false);


  const [houseno, setHouseno] = useState("")
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedAreaId, setSelectedAreaId] = useState('');
  const [address, setaddress] = useState<any>('');
  const [landmark, setlandmark] = useState<any>('');
  const [pincode, setpincode] = useState<any>('');
  const [currentAddress, setCurrentAddress] = useState<{ postalCode?: string, street?: string, streetNumber?: string, district?: string, name?: string, subregion?: string, region?: string }>({}); // Define type for currentAddress

 
  useEffect(() => {
    console.log("this is item address",item)
    if (item) {
    //   setHouseno(item.house_no);
      setSelectedCountryId(item.country_id);
      setSelectedStateId(item.state_id);
      setSelectedCityId(item.city_id);
      setSelectedAreaId(item.area_id);
      setaddress(item.address);
      setlandmark(item.landmark);
      setpincode(item.pincode);
    }
  }, [item]);
  // Fetch countries data
  useEffect(() => {
    fetchCountries();
    console.log("item=>",item)
  }, [])
  
  useEffect(() => {
    // Toggle country dropdown
    setIscountrydrpdwnenabled(selectedCountryId === '');
  
    // Toggle state dropdown
    setIsstatedrpdwnenabled(selectedStateId === '' && selectedCountryId !== '');
  
    // Toggle city dropdown
    setIscitydrpdwnenabled(selectedCityId === '' && selectedStateId !== '');
  
    // Toggle area dropdown
    setIsaddressplacedrpdwnenabled(selectedAreaId === '' && selectedCityId !== '');
  
  }, [selectedCountryId, selectedStateId, selectedCityId, selectedAreaId]);
  

  const errortoggling = () => {
    if (selectedCountryId == "") {
      setIscountrydrpdwnfilled(true)
    } else {
      setIscountrydrpdwnfilled(false)
    }
    if (selectedStateId == "") {
      setIsstatedrpdwnfilled(true);
    } else {
      setIsstatedrpdwnfilled(false)
    }
    if (selectedCityId == "") {
      setIscitydrpdwnfilled(true)
    } else { setIscitydrpdwnfilled(false) }
    if (selectedAreaId == "") {
      setIsaddressdrpdwnfilled(true)
    } else { setIsaddressdrpdwnfilled(false) }
    if (houseno == "") {
      setIshousenofiled(true)
    } else {
      setIshousenofiled(false)
    }
    if (pincode == "") {
      setIspincodefilled(true)
    } else {
      setIspincodefilled(false)
    }
    if (landmark == "") {
      setIslandmarkfilled(true)
    } else { setIslandmarkfilled(false) }

  }
  const callreset=()=>{
    setHouseno("");
    setSelectedAreaId("");
    setSelectedCityId("");
    setSelectedCountryId("");
    setSelectedStateId("");
    setaddress('');
    setlandmark('')
    setpincode('');
    
      }

  const fetchCurrentLocation = async () => {
    const mylocation = await getCurrentLocation();
    console.log("my location==>",mylocation)
    setCurrentAddress(mylocation);
  }
  const onChangepincode = (text) => {
    setpincode(text)
    setIspincodefilled(false);
  }
  const onChangeaddress = (text) => {
    setaddress(text)
  }
  const onChangelandmark = (text) => {
    setlandmark(text)
    setIslandmarkfilled(false);
  }
  const onChangehouseno = (text) => {
    setHouseno(text)
    setIshousenofiled(false);
  }
  useEffect(() => {
    if(currentAddress.postalCode){
      setpincode(currentAddress.postalCode);
    }
    
    if (currentAddress.street && currentAddress.streetNumber) {
      setlandmark(currentAddress.street + ', ' + currentAddress.streetNumber);
    }
    if (currentAddress.district && currentAddress.name && currentAddress.street && currentAddress.district && currentAddress.subregion && currentAddress.region) {
      setaddress(currentAddress.district + ', ' + currentAddress.name + ', ' + currentAddress.street + ', ' + currentAddress.subregion + ', ' + currentAddress.region);

    }
    console.log("address=>  ", address)
  }, [currentAddress])

  const fetchCountries = async () => {
    try {
      const url = `${BASE_URL}/API/country_api.php?action=select`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  // Fetch states based on the selected country
  const fetchStates = async (countryId) => {
    try {
      const url = `${BASE_URL}/state_api.php?action=select&country_id=${countryId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  // Fetch cities based on the selected state
  const fetchCities = async (stateId) => {
    console.log("stateId=>", stateId);
    try {
      const url = `${BASE_URL}/city_api.php?action=select&state_id=${stateId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  // Fetch areas based on the selected city
  const fetchAreas = async (cityId) => {
    try {
      const url = `${BASE_URL}/area_api.php?action=select&city_id=${cityId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAreas(data);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

  // Handle country selection
  const handleCountrySelection = (itemValue) => {
    setSelectedCountryId(itemValue);
    setIscountrydrpdwnfilled(false)
    setSelectedStateId('');
    setSelectedCityId('');
    setSelectedAreaId('');

    if (itemValue !== '') {
      fetchStates(itemValue);
    }
  };

  // Handle state selection
  const handleStateSelection = (itemValue) => {
    setSelectedStateId(itemValue);
    setIsstatedrpdwnfilled(false);
    setSelectedCityId('');
    setSelectedAreaId('');

    if (itemValue !== '') {
      fetchCities(itemValue);
    }
  };

  // Handle city selection
  const handleCitySelection = (itemValue) => {
    setSelectedCityId(itemValue);
    setIscitydrpdwnfilled(false)
    setSelectedAreaId('');

    if (itemValue !== '') {
      fetchAreas(itemValue);
    }
  };

  // Handle area selection
  const handleAreaSelection = (itemValue) => {
    setSelectedAreaId(itemValue);
    setIsaddressdrpdwnfilled(false);
  };


  const [alertShown, setAlertShown] = useState(false);

  const displayAlert = () => {
    const message = 'Please enter all required fields:\nCountry, State, City, Area, Address,\nLandmark, Pincode';
    Alert.alert('Error', message);
  };
  const handleSaveAddressbtn = () => {
    // errortoggling();
    console.log("selectedAreaId"+selectedAreaId+"selectedStateId"+selectedStateId+"selectedcityid"+selectedCityId+"selectedareaid"+selectedAreaId+"address"+address+"landmark"+landmark+"pincode"+pincode+"useidapp"+userIdApp);
    if(selectedAreaId && selectedStateId && selectedCityId && selectedAreaId && address && landmark && pincode && userIdApp){


       // Prepare form data
    const formData = new FormData();
    formData.append('country_id', selectedCountryId);
    formData.append('state_id', selectedStateId);
    formData.append('city_id', selectedCityId);
    formData.append('area_id', selectedAreaId);
    formData.append('address', `${houseno},${address}`);
    formData.append('landmark', landmark);
    formData.append('pincode', pincode);
    formData.append('user_id', userIdApp);


   



    // Make the POST request
    fetch(`${BASE_URL}/address_api.php?action=insert`, {
      method: 'POST',
      body: formData,
      headers: {
        // Add any necessary headers here (e.g., for authorization)
        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        // 'Content-Type': 'multipart/form-data', // This header is automatically set for FormData
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data if needed
      console.log('Success:', data);
      // Optionally, show an alert or perform any action after a successful request
      Alert.alert('Success', 'Data submitted successfully', [
        {
          text: 'OK',
          onPress: () => {
            onClose();
            callreset();
          },
          

      
        },
      ]);
    })    
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
      
      // Show an alert or perform any action in case of an error
      // Alert.alert('Error', 'There was an error submitting the data');
    
    });
   
    }
    else
    // setAlertShown(!alertShown);
    // if (!alertShown) {
    //   displayAlert(); // Display the full message alert
    //   setAlertShown(false); // Set the flag to true to indicate the alert has been shown
    // }
    errortoggling();

  }
  ////////////////////////////////////////////////////////////

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          {/* <Text>{currentAddress ? JSON.stringify(currentAddress) : ''}</Text> */}

          <TouchableOpacity onPress={onClose}>
            <View>
              <AntDesign name='arrowleft' size={25} color={"white"} />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerText}>Update ADDRESS</Text>
        </View>
        <View style={styles.mainContainer}>
          {/* <Text>{currentAddress ? JSON.stringify(currentAddress) : ''}</Text> */}
          <View style={{ marginTop: 10, }}>
            {iscountrydrpdwnfilled && <Text style={{ color: "red" }}> * Required</Text>}

            <View
              style=
              {{

                justifyContent: 'center',
                borderWidth: 1,
                padding: 0,
                borderColor: 'lightgray',
                borderRadius: 10,

              }}
            >
              {/* Country Picker */}
              <Picker
                selectedValue={selectedCountryId}
                style={{ height: 50, width: 270 }}
                itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 5 }}
                onValueChange={(itemValue) => handleCountrySelection(itemValue)}
                enabled={iscountrydrpdwnenabled}

              >

                <Picker.Item label="Select Country" value=""
                />
                {countries.map((country) => (
                  <Picker.Item key={country.country_id} label={country.country_name} value={country.country_id} />
                ))}

              </Picker>
            </View>
          </View>


          <View style={{ marginTop: 20, }}>

            {isstatedrpdwnfilled && <Text style={{ color: "red" }}> * Required</Text>}
            <View style=
              {{

                justifyContent: 'center',
                borderWidth: 1,
                padding: 0,
                borderColor: 'lightgray',
                borderRadius: 10,

              }}>
              {/* State Picker */}
              <Picker
                selectedValue={selectedStateId}
                style={{ height: 50, width: 270 }}
                itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
                onValueChange={(itemValue) => handleStateSelection(itemValue)}
                enabled={isstatedrpdwnenabled}


              >
                <Picker.Item label="Select State" value="" />
                {states.map((state) => (
                  <Picker.Item key={state.state_id} label={state.state_name} value={state.state_id} />
                ))}
              </Picker>

            </View>
          </View>

          <View style={{ marginTop: 20 }}>

            {iscitydrpdwnfilled && <Text style={{ color: "red" }}> * Required</Text>}
            <View style=
              {{

                justifyContent: 'center',
                borderWidth: 1,
                padding: 0,
                borderColor: 'lightgray',
                borderRadius: 10,

              }}>

              {/* <Text>State</Text> */}

              {/* City Picker */}
              <Picker
                selectedValue={selectedCityId}
                style={{ height: 50, width: 270 }}
                itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
                onValueChange={(itemValue) => handleCitySelection(itemValue)}
                enabled={iscitydrpdwnenabled}

              >
                <Picker.Item label="Select City" value="" />
                {cities.map((city) => (
                  <Picker.Item key={city.city_id} label={city.city_name} value={city.city_id} />
                ))}
              </Picker>
            </View>
          </View>






          <View style={{ flex: 1, marginTop: 15, }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                {ishousenofiled && <Text style={{ color: 'red' }}>* Required</Text>}

                <TextInput
                  label="House No, Building Name"
                  mode='outlined'
                  value={houseno}
                  onChangeText={(text) => onChangehouseno(text)}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  label="Road Name, Area, Colony"
                  mode='outlined'
                  value={address}
                  onChangeText={(text) => onChangeaddress(text)}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ flex: 1, marginRight: 5 }}>
{ispincodefilled&&<Text style={{ color: 'red' }}>* Required</Text>}
                
                <TextInput
                  label="Pincode"
                  mode='outlined'
                  value={pincode}
                  keyboardType={"number-pad"}
                  onChangeText={(text) => onChangepincode(text)}

                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                {islandmarkfilled && <Text style={{ color: "red" }}>* Required</Text>}
                
                <TextInput
                  label="Landmark"
                  mode='outlined'
                  value={landmark}
                  onChangeText={(text) => onChangelandmark(text)}
                  
                />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              {isaddressdrpdwnfilled && <Text style={{ color: "red" }}>* Required</Text>
              }
              <View style=
                {{

                  justifyContent: 'center',
                  borderWidth: 1,
                  padding: 0,
                  borderColor: 'lightgray',
                  borderRadius: 10,

                }}>
                <Picker
                  selectedValue={selectedAreaId}
                  style={{ height: 50, width: 270 }}
                  itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
                  onValueChange={(itemValue) => handleAreaSelection(itemValue)}
                  enabled={isaddressplacedrpdwnenabled}

                >
                  <Picker.Item label="Type of address" value="" />
                  {areas.map((area) => (
                    <Picker.Item key={area.area_id} label={area.area_name} value={area.area_id} />
                  ))}
                </Picker>
              </View>
            </View>


            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity style={{ marginBottom: 10 }} onPress={fetchCurrentLocation}>
                <View style={{ backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center', height: 50, flexDirection: "row", gap: 10 }}>
                  <MaterialIcons name='my-location' color={"white"} size={30} />
                  <Text style={{ color: 'white' }}>
                    Use my location
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSaveAddressbtn}>
                <View style={{ backgroundColor: 'rgb(255, 90, 0)', alignItems: 'center', justifyContent: 'center', height: 50 }}>
                  <Text style={{ color: 'white' }}>
                    Save Address
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <Text>{currentAddress ? JSON.stringify(currentAddress) : ''}</Text> */}
            </View>
          </View>





        </View>
      </View>
    </Modal>
  )
}

export default EditAddress

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal:20,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: "#2874f0",
    width: "100%",
    alignItems: 'center',
    height: "9%",
    paddingLeft: 10,
  },
  headerText: {
    color: "white",
    marginLeft: 105,
    fontSize: 20,
    fontWeight: "300",
  },
  mainContainer: {
    flex: 1.9, // Adjusted to accommodate the header taking 10% of the screen height
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20
  }
})


