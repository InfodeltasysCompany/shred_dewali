// import { StyleSheet, Text, View } from 'react-native'
// import React, { useState, useEffect } from 'react';
// import { Picker } from '@react-native-picker/picker';

// const Dropdown = () => {

//      const [selected, setSelected] = useState('');
//      const [data, setData] = useState([]);

//      useEffect(() => {
//           fetchData();
//         }, []);

//         const fetchData = async () => {
//           try {
//             const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select_id');
//             if (response.ok) {
//               const responseData = await response.json();
//               setData(responseData);
//             } else {
//               console.error('Failed to fetch data');
//             }
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
//   return (
//      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//      <Picker
//        selectedValue={selected}
//        style={{ height: 50, width: 300 }}
//        itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
//        onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
//      >
//        <Picker.Item label="Select Scrap" value="" />
//        {data && data.length > 0 && data.map((item, index) => (
//          <Picker.Item label={item.label} value={item.value} key={index} />
//        ))}
//      </Picker>
//    </View>
//   )
// }

// export default Dropdown

// const styles = StyleSheet.create({})











import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Dropdown = () => {
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedSubMetal, setSelectedSubMetal] = useState('');
  const [MetalData, setMetalData] = useState([]);
  const[SubMetalData,setSubMetalData]=useState([]);
  const [p_id, set_p_id] = useState('');
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select');
      if (response.ok) {
        const responseData = await response.json();
        setMetalData(responseData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleSelectMetal = async (selectedValue) => {
    setSelectedMetal(selectedValue);

    const selectedItem = MetalData.find((item) => item.p_id === selectedValue);
    if (selectedItem) {
      try {
        const formData = new FormData();
        formData.append('p_id', selectedItem.p_id);

        const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select_id', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Data sent successfully');
          const responseData = await response.json();
          setSubMetalData(responseData);
          setSelectedSubMetal(''); // Reset selected sub-metal when changing metal
        } else {
          console.error('Post API Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Post API Error:', error);
      }
    }
  }

 

  return (

    <View>

      <View style=
        {{
          flex: 1,
          justifyContent: 'center',
          borderWidth: 1,
          padding: 20,
          borderColor: 'lightgray',
          borderRadius: 10,
          marginTop: 10,
        }}>
      <Picker
       selectedValue={selectedMetal}
          style={{ height: 50, width: 300 }}
          itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
          onValueChange={(itemValue) => handleSelectMetal(itemValue)}
        >
          <Picker.Item label="Select Scrap" value="" />
          {MetalData.map((item) => (
            <Picker.Item label={item.p_name} value={item.p_id} key={item.p_id} />
          ))}
        </Picker>
      </View>


      <View
        style=
        {{
          flex: 1,
          justifyContent: 'center',
          borderWidth: 1,
          padding: 20,
          borderColor: 'lightgray',
          borderRadius: 10,
          marginTop: 10,
        }}
      >

<Picker
         selectedValue={selectedSubMetal}
          style={{ height: 50, width: 300 }}
          itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
          onValueChange={(itemValue) => setSelectedSubMetal(itemValue)}
        >
          <Picker.Item label="Select Sub-Scrap" value="" />
          {
          SubMetalData.map((item, index) => (
            <Picker.Item label={item.p_type_name} value={item.p_type_name} key={index} />
          ))
          }
        </Picker>

      </View>


    </View>


  );
};

export default Dropdown;
