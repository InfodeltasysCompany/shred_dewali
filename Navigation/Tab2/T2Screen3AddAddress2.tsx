import React, { useState, useEffect, useContext } from 'react';
import { View ,Text, Alert,StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../redux/ContextApi/UserAuthProvider';
import { BASE_URL } from '../../ReuseComponent/Env';

const T2Screen3AddAddress2 = ({navigation}) => {

  
  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp,f_email, f_mobile, f_id, f_name, f_password  } = state;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [userDataLOCAL_STORAGE, setUserDataLocalStorage] = useState(null);


  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedAreaId, setSelectedAreaId] = useState('');
  const [address,setaddress] = useState('')
  const [landmark,setlandmark] =useState('')
  const [pincode,setpincode] =useState('')
  const [user_id, setUserIds] = useState(null) // User ID


  useEffect(() => {
    fetchCountries();


    const fetchData = async () => {
      try {
  const storedData = await AsyncStorage.getItem('UserCred');

  if (storedData !== null) {
    const userDataObject = JSON.parse(storedData);
    setUserDataLocalStorage(userDataObject);

    // Check if the '0' key exists and 'id' field is present in the object
    if (userDataObject && userDataObject['0'] && userDataObject['0'].id) {
      const userId = userDataObject['0'].id;
      setUserIds(userId)
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

fetchData();
  }, []);

  // Fetch countries data
  const fetchCountries = async () => {
    try {
      const url = `${BASE_URL}/country_api.php?action=select`;
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
    try {
      const url = `${BASE_URL}/city_api.php?action=select_id&state_id=${stateId}`;
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
    setSelectedCityId('');
    setSelectedAreaId('');

    if (itemValue !== '') {
      fetchCities(itemValue);
    }
  };

  // Handle city selection
  const handleCitySelection = (itemValue) => {
    setSelectedCityId(itemValue);
    setSelectedAreaId('');

    if (itemValue !== '') {
      fetchAreas(itemValue);
    }
  };

  // Handle area selection
  const handleAreaSelection = (itemValue) => {
    setSelectedAreaId(itemValue);
  };


  const [alertShown, setAlertShown] = useState(false);

  const displayAlert = () => {
    const message = 'Please enter all required fields:\nCountry, State, City, Area, Address,\nLandmark, Pincode';
    Alert.alert('Error', message);
  };
  ////////////////////////////////////////////////////////////

  
  const handlefinalsubmit = () => {
    console.log("selectedAreaId"+selectedAreaId+"selectedStateId"+selectedStateId+"selectedcityid"+selectedCityId+"selectedareaid"+selectedAreaId+"address"+address+"landmark"+landmark+"pincode"+pincode+"useidapp"+userIdApp);
    if(selectedAreaId && selectedStateId && selectedCityId && selectedAreaId && address && landmark && pincode && userIdApp){


       // Prepare form data
    const formData = new FormData();
    formData.append('country_id', selectedCountryId);
    formData.append('state_id', selectedStateId);
    formData.append('city_id', selectedCityId);
    formData.append('area_id', selectedAreaId);
    formData.append('address', address);
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
          onPress: () => { navigation.navigate('T2Screen2AddAddress')
            // Perform any action you want here after the 'OK' button is pressed
            // For example, navigate to another screen or update state
            // Your code goes here...
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
    setAlertShown(!alertShown);
    if (!alertShown) {
      displayAlert(); // Display the full message alert
      setAlertShown(false); // Set the flag to true to indicate the alert has been shown
    }
   
  
  };
  
  /////////////////////////////////////////////////////////////

  return (

    
    <View style=
    {{
        justifyContent: 'center', 
        alignItems: 'center',
        margin: 5,
        padding: 10,
        backgroundColor: 'white',
    }}
    >

      <View 
      style=
      {{

        justifyContent: 'center',
        borderWidth: 1,
        padding: 0,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginTop: 10,
      }}
      >
   {/* Country Picker */}
   <Picker
        selectedValue={selectedCountryId}
        style={{ height: 50, width: 270   }}
        itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 5 }}
        onValueChange={(itemValue) => handleCountrySelection(itemValue)}
      >

        <Picker.Item label="Select Country" value=""
        />
        {countries.map((country) => (
          <Picker.Item key={country.country_id} label={country.country_name} value={country.country_id} />
        ))}

      </Picker>
      </View>
   

      <View  style=
      {{

        justifyContent: 'center',
        borderWidth: 1,
        padding: 0,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginTop: 10,
      }}>
        {/* State Picker */}
     <Picker
        selectedValue={selectedStateId}
        style={{ height: 50, width: 270 }}
        itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
        onValueChange={(itemValue) => handleStateSelection(itemValue)}
      >
        <Picker.Item label="Select State" value="" />
        {states.map((state) => (
          <Picker.Item key={state.state_id} label={state.state_name} value={state.state_id} />
        ))}
      </Picker>

      </View>

     
 <View  style=
      {{

        justifyContent: 'center',
        borderWidth: 1,
        padding: 0,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginTop: 10,
      }}>
      
      {/* <Text>State</Text> */}

      {/* City Picker */}
      <Picker
        selectedValue={selectedCityId}
        style={{ height: 50, width: 270 }}
        itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
        onValueChange={(itemValue) => handleCitySelection(itemValue)}
      >
        <Picker.Item label="Select City" value="" />
        {cities.map((city) => (
          <Picker.Item key={city.city_id} label={city.city_name} value={city.city_id} />
        ))}
      </Picker>
</View>
      
     
<View style=
      {{

        justifyContent: 'center',
        borderWidth: 1,
        padding: 0,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginTop: 10,
      }}>
<Picker
        selectedValue={selectedAreaId}
        style={{ height: 50, width: 270 }}
        itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
        onValueChange={(itemValue) => handleAreaSelection(itemValue)}
      >
        <Picker.Item label="Select Area" value="" />
        {areas.map((area) => (
          <Picker.Item key={area.area_id} label={area.area_name} value={area.area_id} />
        ))}
      </Picker>
</View>
      {/* Area Picker */}
   
{/*       
      <Text>Area</Text> */}

      <View style={{marginTop: 20}}>
      <TextInput placeholder='address' style={styles.text} value={address} onChangeText={setaddress}/>
      <TextInput placeholder='landmark' style={styles.text} value={landmark} onChangeText={setlandmark}/>
      <TextInput placeholder='pincode' style={styles.text} value={pincode} onChangeText={setpincode}/>
      </View>
     
      <View style={{margin:20,}}>
        <TouchableOpacity onPress={handlefinalsubmit}>
          <Text style={styles.btn2} >Save Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({

  btn2:{
 borderWidth: 1,
 padding: 10,
 borderRadius: 5,
 fontSize: 18,
 color: 'white',
 backgroundColor: 'green',
 borderColor: 'green',
  },

  text:
  {
    borderWidth:2,
    borderColor:'gray',
    borderRadius:10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontSize: 20,
    width: 330,
   color: 'black',
   marginBottom: 10,
  }
})

export default T2Screen3AddAddress2;
