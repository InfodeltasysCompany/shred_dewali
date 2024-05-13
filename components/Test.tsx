import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'

const Test = () => {
  return (
    <View>
      <Dropdowns />
    </View>
  )
}

const Dropdowns = () => {


  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedSubMetal, setSelectedSubMetal] = useState('');
  // const userDataLOGIN_CURRENT_REDUX = useSelector((state: RootState) => state.login.userData);
  const [userDataLOCAL_STORAGE, setUserDataLocalStorage] = useState(null);

  /////////////////data for passing probs //////////
  const [user_id, setUserIds] = useState(null) // User ID
  const [capturedImage, setCapturedImage] = useState<string | null>(null);///image
  const [textInputValue, setTextInputValue] = useState('');  ///weight
  const [price, setprice] = useState(" ")///raw price 
  const [productname, setProductname] = useState('')
  const [p_id, set_p_id] = useState('')
  const [SubMetalData, setSubMetalData] = useState([]);
  const [polling, setPolling] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [selected, setSelected] = useState('');
  ///////////////////////////////////////////////
  interface MetalItem {
    p_id: string;
    p_name: string;
    created_at: string;
    date: string;
    file: string;
    file_name: string;
    p_type_id: string;
    p_type_name: string;
    price: string;
    status: string;
    sub_name: string;
    weight: string;

    // Other properties can be made optional by adding a '?' after the property name
    // optionalProperty?: string;
  }
 


  const [Metaltype, setMetaltype] = useState<MetalItem[]>([]);


  interface SubMetalItem {
    p_id: string;
    p_name: string;
    created_at: string;
    date: string;
    file: string;
    file_name: string;
    p_type_id: string;
    p_type_name: string;
    price: string;
    status: string;
    sub_name: string;
    weight: string;
    // Other properties can be made optional by adding a '?' after the property name
    // optionalProperty?: string;
  }
  
  const [SubMetaltype, setSubMetaltype] = useState<SubMetalItem[]>([]);
  





  useEffect(() => {
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

    // fetchData();
    pollApi();
    // handleChooseFirst('75');
  }, []);


  const pollApi = async () => {
    setSelectedMetal(selectedMetal)
    try {
      const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select');

      if (response.ok) {
        const responseData = await response.json();
        console.log("i m form first calling api method :-", responseData);

        setMetaltype(responseData);



        // setPolling(false); // Stop polling when a response is received
      } else {
        console.error('API Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // useEffect(()=>{
  //   pollApi();
  // },[Metaltype])
  const handleChooseFirst = async (Id: string) => {
    try {

      const formData = new FormData();
      formData.append('p_id', Id);


      const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select_id', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setSubMetaltype(responseData);

        console.log("i m form second api calling method :-", responseData);


      } else {
        console.error('Post API Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Post API Error:', error);
    }

  }

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    if (!Metaltype === null) {
      pollApi();
      setRefreshing(true);
    }
    setTimeout(() => {
      setRefreshing(false);


    }, 2000);
  }

  return (
    <View>
      {/* <Text>this is Dropdowns</Text> */}
      <View>
        {/* <ScrollView  refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0000ff']}
              tintColor="#0000ff"
            /> }> */}
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
                  selectedValue={selectedMetal}
                  style={{ height: 50, width: 300 }}
                  itemStyle={{ fontSize: 18, color: 'black', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
                  onValueChange={(itemValue) => handleChooseFirst(itemValue)}
                >
                  <Picker.Item label={`${Metaltype}`} value="" />
                  {Metaltype.map((item) => (
                    <Picker.Item label={item.p_name} value={item.p_id} key={item.p_id} />
                  ))}
                </Picker>
              </View>



        {/* </ScrollView> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({



  image1: {
    width: 100,
    height: 100,
    marginBottom: 10,

  },

  radioButtonContainer: {
    justifyContent: 'space-around',
    marginVertical: 10,
    alignItems: 'center',


  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',


  },
  radioButtonCircle: {
    height: 25,
    width: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#666666',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerCircle: {
    height: 14,
    width: 14,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  radioButtonText: {
    fontSize: 20,
    marginLeft: 10,

  },
  selectedOptionText: {
    marginTop: 20,
    fontSize: 20,

  },
  textInput: {
    borderRadius: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    height: 40,
    width: 310,
    paddingLeft: 20,
  },

  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio_main: {

    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  radio_text: {
    fontSize: 20,
  },
  radio: {
    height: 30,
    width: 30,
    borderRadius: 20,
    borderWidth: 2,

    borderColor: 'black',
    margin: 5,

  },
  radioBg: {
    backgroundColor: 'black',
    width: 20,
    height: 20,
    borderRadius: 20,
    margin: 3,


  }
});

export default Test