// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'

// const DashAddressFilterWUNLI = () => {
//     const [countries, setcountries] = useState([]);
//     const [states, setstates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [countryId, setCountryId] = useState('');
//     const [state_id, setState_id] = useState('');
    

//     useEffect(()=>{
//         fetchCountries();
//     },[])


//     const fetchCountries =async () => {
//         try {
//           const url = 'https://shreddersbay.com/API/country_api.php?action=select';
//           const response = await fetch(url);
    
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
    
//           const data = await response.json();
//           setcountries(data);
//         } catch (error) {
//           console.error('Error fetching countries:', error);
//         }
//       };
    
//       // Fetch states based on the selected country
//       const fetchStates = async (countryId) => {
//         try {
//           const url = `https://shreddersbay.com/API/state_api.php?action=select&country_id=${countryId}`;
//           const response = await fetch(url);
    
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
    
//           const data = await response.json();
//           setstates(data);
//         } catch (error) {
//           console.error('Error fetching states:', error);
//         }
//       };
    
//       // Fetch cities based on the selected state
//       const fetchCities = async (stateId) => {
//         console.log("stateId=>", stateId);
//         try {
//           const url = `https://shreddersbay.com/API/city_api.php?action=select&state_id=${stateId}`;
//           const response = await fetch(url);
    
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
    
//           const data = await response.json();
//           setCities(data);
//         } catch (error) {
//           console.error('Error fetching cities:', error);
//         }
//       };

//   // Handle country selection
//   const handleCountrySelection = (itemValue) => {
//     setSelectedCountryId(itemValue);
//     setIscountrydrpdwnfilled(false)
//     setSelectedStateId('');
//     setSelectedCityId('');
//     setSelectedAreaId('');

//     if (itemValue !== '') {
//       fetchStates(itemValue);
//     }
//   };

//   // Handle state selection
//   const handleStateSelection = (itemValue) => {
//     setSelectedStateId(itemValue);
//     setIsstatedrpdwnfilled(false);
//     setSelectedCityId('');
//     setSelectedAreaId('');

//     if (itemValue !== '') {
//       fetchCities(itemValue);
//     }
//   };

//   // Handle city selection
//   const handleCitySelection = (itemValue) => {
//     setSelectedCityId(itemValue);
//     setIscitydrpdwnfilled(false)
//     setSelectedAreaId('');

//     // if (itemValue !== '') {
//     //   fetchAreas(itemValue);
//     // }
//   };
//   return (
//     <View>
//       <Text>DashAddressFilterWUNLI</Text>
//     </View>
//   )
// }

// export default DashAddressFilterWUNLI

// const styles = StyleSheet.create({})

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DashAddressFilterWUNLI = () => {
  return (
    <View>
      <Text>DashAddressFilterWUNLI</Text>
    </View>
  )
}

export default DashAddressFilterWUNLI

const styles = StyleSheet.create({})