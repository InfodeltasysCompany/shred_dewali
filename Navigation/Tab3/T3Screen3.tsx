import { View, Text, StyleSheet, ScrollView, RefreshControl, Button, Image, TouchableOpacity, TextInput, Alert, } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';
const T3Screen3 = ({ navigation }) => {
  return (


    <View>
      <Dropdowns navigation={navigation} />
    </View>
  )
}

const Dropdowns = ({ navigation }) => {
  // const navigation = useNavigation<NavigationProp<Stack2ParamList>>();



  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedSubMetal, setSelectedSubMetal] = useState('');
  // const userDataLOGIN_CURRENT_REDUX = useSelector((state: RootState) => state.login.userData);
  const [userDataLOCAL_STORAGE, setUserDataLocalStorage] = useState(null);

  /////////////////data for passing probs //////////
  const [user_id, setUserIds] = useState(null) // User ID
  const [textInputValue, setTextInputValue] = useState('');  ///weight
  const [price, setprice] = useState(" ")///raw price 
  const [productname, setProductname] = useState('')
  const [p_id, set_p_id] = useState('')
  // const [MetalData, setMetalData] = useState([]);
  // const [SubMetalData, setSubMetalData] = useState([]);
  const [polling, setPolling] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [selected, setSelected] = useState('');
  ///////////////////////////////////////////////
  const [metalType, setmetaltype] = useState<string>('Metal Type');
  const [submetalType, setSubmetaltype] = useState<string>('Sub Metal Type');

  const [reloadFlag, setReloadFlag] = useState(false);
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

  }

  const [MetalData, setMetalData] = useState<MetalItem[]>([]);


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

  }

  // };
  const [SubMetalData, setSubMetalData] = useState<SubMetalItem[]>([]);

  // Function to trigger reload in the parent component
  const reloadParent = () => {
    setReloadFlag(!reloadFlag);
  };


  //////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('UserCred');

        if (storedData !== null) {
          const userDataObject = JSON.parse(storedData);
          setUserDataLocalStorage(userDataObject);
          if (userDataObject && userDataObject['0'] && userDataObject['0'].id) {
            const userId = userDataObject['0'].id;
            setUserIds(userId)
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





  const handleNumericInputChange = (value: any) => {
    // Allow only numeric values in the text input
    const numericValue = value.replace(/[^0-9]/g, '');
    setTextInputValue(numericValue);
  };


  const handleSelectMetal = async (selectedValue: any) => {
    setSelectedMetal(selectedValue);

    const selectedItem = MetalData.find((item) => item.p_id === selectedValue);

    if (selectedItem) {


      setSelectedId(selectedItem.p_id); // Set the selected id in state
      setprice(selectedItem.price);
      setProductname(selectedItem.p_name)
      try {

        const formData = new FormData();
        formData.append('p_id', selectedItem.p_id);
        set_p_id(selectedItem.p_id);

        const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select_id', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // console.log('Data sent successfully');
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

  const pollApi = useCallback(async () => {
    // Your existing pollApi logic
    try {
      const response = await fetch('https://shreddersbay.com/API/product_api.php?action=select');

      if (response.ok) {
        const responseData = await response.json();
        setMetalData(responseData);



        // setPolling(false); // Stop polling when a response is received
      } else {
        console.error('API Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  useEffect(() => {
    // Start polling when the component mounts
    // startPolling();
    pollApi()
  }, [MetalData]);





  const resetDropdowns = () => {
    setSelectedMetal('');
    setSelectedSubMetal('');
    setmetaltype('Metal Type');
    setSubmetaltype('Sub Metal Type');
    setTextInputValue('')
    setCapturedImage(null);
    setSelectedImage(null);
    setprice('')
    setProductname('')

  };
  //////////////////////////////////////////////////////////Open Camera And Gallery ////////////////////////////////////////////////

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  const getPermissions = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

    setHasPermission(
      cameraStatus.status === 'granted' && galleryStatus.status === 'granted'
    );
  };

  useEffect(() => {
    getPermissions();
  }, []);


  const saveImageToAssets = async (uri: any) => {
    const now = new Date()
    try {
      const assetUri = `${FileSystem.documentDirectory}assets/${now}.jpg`;
      await FileSystem.copyAsync({ from: uri, to: assetUri });
      return assetUri;
    } catch (error) {
      console.error('Error saving image:', error);
      return null;
    }
  };

  const takePicture = async () => {

    if (hasPermission) {
      const photo = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!photo.canceled) {
        if (photo.assets && photo.assets.length > 0) {
          const selectedAsset = photo.assets[0];
          const savedImageUri = await saveImageToAssets(selectedAsset.uri);
          setCapturedImage(savedImageUri);
          // onImageCapture(savedImageUri);
          setSelectedImage(null);
        }
      }
    }
  };

  const pickImage = async () => {
    if (hasPermission) {
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!photo.canceled) {
        if (photo.assets && photo.assets.length > 0) {
          const selectedAsset = photo.assets[0];
          const savedImageUri = await saveImageToAssets(selectedAsset.uri);
          setSelectedImage(savedImageUri);
          // onImageCapture(savedImageUri);
          setCapturedImage(null);
        }
      }
    }
  };
 
  const submittingRef = useRef(false);

  const handleSubmit = async () => {
    try {
      // Add a check to prevent multiple submissions
      // If already submitting, return early to avoid duplicate submissions
      if (submittingRef.current) {
        return;
      }
  
      submittingRef.current = true; // Set submitting flag
      if (user_id && (capturedImage || selectedImage) && textInputValue && price && p_id) {
        const weight = parseInt(textInputValue);
        const price1 = parseInt(price);

        ////
        const currentDate = new Date();

        // Get individual date components
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');

        // Concatenate date and time in the desired format
        const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const randomNumber = Math.floor(Math.random() * 10).toString();
        console.log("the randomNumber is :-",randomNumber);


        try {
          const formData = new FormData();

          let imageUri: string | undefined | null = capturedImage;

          if (!imageUri && selectedImage) {
            imageUri = selectedImage; // Use selectedImage if capturedImage is undefined
          }

          if (imageUri) {

            // const filename = `${timestamp.toString}.jpg`; // Generate filename using timestamp
            const filename = currentDateTime+":"+randomNumber + '.jpg'
            // const filename = 'imag1.jpg';


            const image = {
              uri: imageUri,
              name: filename,
              type: 'image/jpg', // Adjust the type according to your image
            };

            formData.append('file', image as any);
          }

          formData.append('user_id', user_id);
          formData.append('weight', textInputValue);
          formData.append('price', price1.toString())
          formData.append('prod_id', p_id);

          const uploadResponse = await fetch('https://shreddersbay.com/API/cart_api.php?action=insert', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              // Add any necessary headers here
            },
          });
          console.log("the multiple of weight and price is :-", (weight * price1).toString());

          if (uploadResponse.ok) {
            resetDropdowns();


            console.log(uploadResponse.status);
            // setIsAddScrap(false)
            Alert.alert("Add Scrap Successfully.")
            navigation.navigate('Scrap Cart', { screen: 'T2Screen1' });

          } else {
            console.error('Failed to upload image');
          }
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      } else {
        Alert.alert('Please choose all necessary fields like: choose product, weight, choose or capture Image');
      }
     
      submittingRef.current = false;
    } catch (error) {
      console.error('Error during handleSubmit:', error);
    }
  };
  

  //////////////////////////////////////////////-------end-----------/////////////////////////////////////////////////////
  const [refreshing, setRefreshing] = useState(false);




  const onRefresh = () => {
        pollApi();
  }
  return (
    <View style={{ backgroundColor: '#fff' }}
    >
      <View style={{
        marginTop: 30,
        marginHorizontal: 10, padding: 30,
        justifyContent: 'center'
      }}
      >
        {/* <Text>this is Dropdowns</Text> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0000ff']}
              tintColor="#0000ff"
            />}>
          <View>



            <View>
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
                  style={{ height: 50, width: 270 }}
                  itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
                  onValueChange={(itemValue) => handleSelectMetal(itemValue)}
                >
                  <Picker.Item label={`${metalType}`} value="" />
                  {MetalData.map((item) => (
                    <Picker.Item label={item.p_name} value={item.p_id} key={item.p_id} />
                  ))}
                </Picker>
              </View>
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

                <Picker
                  selectedValue={selectedSubMetal}
                  style={{ height: 50, width: 270 }}
                  itemStyle={{ fontSize: 18, color: 'blue', backgroundColor: 'lightgray', paddingHorizontal: 10 }}
                  onValueChange={(itemValue) => setSelectedSubMetal(itemValue)}
                >
                  <Picker.Item label={`${submetalType}`} value="" />
                  {
                    SubMetalData.map((item, index) => (
                      <Picker.Item label={item.p_type_name} value={item.p_type_name} key={index} />
                    ))
                  }
                </Picker>
              </View>



              <View style={styles.radioButtonContainer}>
                <View>
                  <TextInput
                    // placeholder={`Enter ${weight} in kg`}
                    placeholder='Enter Weight in kg'
                    value={textInputValue}
                    onChangeText={handleNumericInputChange}
                    style={styles.textInput}
                    keyboardType="numeric"

                  />
                </View>
                {productname || price ? <Text style={{ color: 'blue', }}> price of {productname}:-{price} </Text> : null}
              </View>





              <View style={styles.imageContainer}>


                {capturedImage && <Image source={{ uri: capturedImage }} style={styles.image} />}
                {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
              </View>

              <View style={styles.buttonsContainer}>


                <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between' }}>
                  <View >
                    {/* <TouchableOpacity  onPress={pickImage} disabled={!hasPermission} > */}
                    <TouchableOpacity onPress={pickImage} disabled={!hasPermission}  >

                      <Text style=
                        {{
                          fontSize: 18,
                          color: 'black',

                          borderWidth: 2,
                          borderColor: '#1f2e2e',
                          padding: 5,
                          borderRadius: 7,
                          marginRight: 10,
                        }}> Open Gallery</Text>
                    </TouchableOpacity>
                  </View>
                  <FontAwesome name="camera" style={{ fontSize: 30 }} onPress={takePicture} disabled={!hasPermission} />
                </View>
              </View>



              <View style={{ marginTop: 20, }}>
                <View>
                  {user_id ? (
                    <TouchableOpacity onPress={handleSubmit}>
                      <Text
                        style=
                        {{
                          borderColor: '#1f2e2e',
                          borderWidth: 2,
                          padding: 10,
                          marginBottom: 6,
                          borderRadius: 5,
                          fontSize: 17,
                          color: '#fff',
                          backgroundColor: '#1f2e2e',
                          fontWeight: 'bold',
                          textAlign: 'center',

                        }}

                      >
                        Add Scrap
                      </Text>
                    </TouchableOpacity>) : (<TouchableOpacity>
                      <Text
                        style=
                        {{
                          borderColor: '#1f2e2e',
                          borderWidth: 2,
                          padding: 10,
                          marginBottom: 6,
                          borderRadius: 5,
                          fontSize: 17,
                          color: '#fff',
                          backgroundColor: '#1f2e2e',
                          fontWeight: 'bold',
                          textAlign: 'center',

                        }}
                        onPress={() => { navigation.navigate('Login') }}
                      >
                        Add Scrap.
                      </Text>
                    </TouchableOpacity>)}


                  <TouchableOpacity>
                    <Text
                      style=
                      {{
                        borderColor: '#1f2e2e',
                        borderWidth: 2,
                        padding: 10,
                        borderRadius: 5,
                        fontSize: 17,
                        color: '#fff',
                        backgroundColor: '#1f2e2e',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                      onPress={resetDropdowns}
                    >
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>



              {/* </ScrollView> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({


  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 1,
  },


  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 28,


  },


  image1: {
    width: 100,
    height: 100,
    marginBottom: 10,

  },

  radioButtonContainer: {
    justifyContent: 'space-around',
    marginVertical: 20,
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
    height: 50,
    width: 290,
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

export default T3Screen3;
