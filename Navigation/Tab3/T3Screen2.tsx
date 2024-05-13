import {
  View,
  Platform,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../redux/ContextApi/UserAuthProvider";
import Login from "../../components/Credential/Login";
import LoginModal from "../../components/Credential/LoginModal";

const T3Screen2 = ({ navigation }) => {
  return (
    <View>
      <Dropdowns navigation={navigation} />
    </View>
  );
};

const Dropdowns = ({ navigation }) => {
  // const navigation = useNavigation<NavigationProp<Stack2ParamList>>();

  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password } = state;

  const [selectedMetal, setSelectedMetal] = useState("");
  const [selectedSubMetal, setSelectedSubMetal] = useState("");
  const [selectedLanguage, setselectedLanguage] = useState("");
  // const userDataLOGIN_CURRENT_REDUX = useSelector((state: RootState) => state.login.userData);
  const [userDataLOCAL_STORAGE, setUserDataLocalStorage] = useState(null);

  /////////////////data for passing probs //////////
  const [user_id, setUserIds] = useState(userIdApp); // User ID
  const [textInputValue, setTextInputValue] = useState(""); ///weight
  const [minimum_price, setMinimum_price] = useState("");
  const [price, setprice] = useState(" "); ///raw price
  const [productname, setProductname] = useState("");
  const [p_id, set_p_id] = useState("");
  // const [MetalData, setMetalData] = useState([]);
  // const [SubMetalData, setSubMetalData] = useState([]);
  const [polling, setPolling] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [selected, setSelected] = useState("");
  ///////////////////////////////////////////////
  const [metalType, setmetaltype] = useState<string>("Metal Type");
  const [submetalType, setSubmetaltype] = useState<string>("Sub Metal Type");
  const osName = Platform.OS;

  const [reloadFlag, setReloadFlag] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
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
  // const fetchData = async () => {
  //   try {
  //     const storedData = await AsyncStorage.getItem("UserCred");

  //     if (storedData !== null) {
  //       const userDataObject = JSON.parse(storedData);
  //       setUserDataLocalStorage(userDataObject);
  //       if (userDataObject && userDataObject["0"] && userDataObject["0"].id) {
  //         const userId = userDataObject["0"].id;
  //         setUserIds(userId);
  //       } else {
  //         console.log("No user data or ID found.");
  //       }
  //     } else {
  //       console.log("No data found");
  //     }
  //   } catch (error) {
  //     console.error("Error retrieving data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleNumericInputChange = (value: any) => {
    // Allow only numeric values in the text input
    const numericValue = value.replace(/[^0-9]/g, "");
    setTextInputValue(numericValue);
  };
  const handleNumericInputChange1 = (value: any) => {
    // Allow only numeric values in the text input
    const numericValue = value.replace(/[^0-9]/g, "");
    setMinimum_price(numericValue);
  };

  // const handleSelectMetal = async (selectedValue: any) => {
  //   setSelectedMetal(selectedValue);

  //   const selectedItem = MetalData.find((item) => item.p_id === selectedValue);

  //   if (selectedItem) {
  //     setSelectedId(selectedItem.p_id); // Set the selected id in state
  //     setprice(selectedItem.price);
  //     setProductname(selectedItem.p_name);
  //     try {
  //       const formData = new FormData();
  //       formData.append("p_id", selectedItem.p_id);
  //       set_p_id(selectedItem.p_id);

  //       const response = await fetch(
  //         "https://shreddersbay.com/API/product_api.php?action=select_id",
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );

  //       if (response.ok) {
  //         // console.log('Data sent successfully');
  //         const responseData = await response.json();
  //         setSubMetalData(responseData);
  //         setSelectedSubMetal(""); // Reset selected sub-metal when changing metal
  //       } else {
  //         console.error(
  //           "Post API Error:",
  //           response.status,
  //           response.statusText
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Post API Error:", error);
  //     }
  //   }
  // };

  // const pollApi = useCallback(async () => {
  //   // Your existing pollApi logic
  //   try {
  //     const response = await fetch(
  //       "https://shreddersbay.com/API/product_api.php?action=select"
  //     );

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       // console.log("i want to see the the resources:-",responseData);
  //       setMetalData(responseData);

  //       // setPolling(false); // Stop polling when a response is received
  //     } else {
  //       console.error("API Error:", response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   pollApi();
  // }, [MetalData]);
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
        // console.log("i want to see the the resources:-",responseData);
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
    setSelectedMetal("");
    setSelectedSubMetal("");
    setmetaltype("Metal Type");
    setSubmetaltype("Sub Metal Type");
    setTextInputValue("");
    setprice("");
    setProductname("");
    setSelectedImages([]);
    setMinimum_price("");
    console.log("userId is :--", user_id);
  };
  //////////////////////////////////////////////////////////Open Camera And Gallery ////////////////////////////////////////////////

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const getPermissions = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    setHasPermission(
      cameraStatus.status === "granted" && galleryStatus.status === "granted"
    );
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const selectedAssets = result.assets.filter(
          (asset) => !asset.cancelled
        );
        const imageUris = selectedAssets.map((asset) => asset.uri);

        // Check if the total number of selected images will exceed 5
        if (selectedImages.length + imageUris.length > 5) {
          const remainingSlots = 5 - selectedImages.length;
          const limitedImageUris = imageUris.slice(0, remainingSlots);

          // Update state with the URIs of the selected images, limiting to 5
          setSelectedImages([...selectedImages, ...limitedImageUris]);
          alert("You can select up to 5 images.");
        } else {
          // Update state with the URIs of the selected images
          setSelectedImages([...selectedImages, ...imageUris]);
        }
      }
    } catch (error) {
      console.log("Error picking images:", error);
    }
  };

  const takeImages = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        const savedImageUri = await saveImage(selectedAsset.uri);
        setSelectedImages([...selectedImages, savedImageUri]);
      }
    } catch (error) {
      console.log("Error taking images:", error);
    }
  };

  const saveImage = async (uri: string) => {
    const now = new Date();

    try {
      const assetDirectory = `${FileSystem.documentDirectory}assets/`;
      const assetUri = `${assetDirectory}${now.getTime()}.jpg`;

      // Ensure the destination directory exists
      const directoryInfo = await FileSystem.getInfoAsync(assetDirectory);
      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(assetDirectory, {
          intermediates: true,
        });
      }

      // Check if the source file exists
      const sourceInfo = await FileSystem.getInfoAsync(uri);
      if (!sourceInfo.exists) {
        console.error("Source file does not exist:", uri);
        return null;
      }

      // Copy the file
      await FileSystem.copyAsync({ from: uri, to: assetUri });

      return assetUri;
    } catch (error) {
      console.error("Error saving image:", error);
      return null;
    }
  };
  const removeImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleSubmit = async () => {
    // navigation.navigate("T3Screen4");

    try {
      if (
        userIdApp &&
        selectedImages.length > 0 &&
        textInputValue &&
        price &&
        p_id &&
        minimum_price
      ) {
        console.log(`this is my selected image is: ${selectedImages}`);

        const weight = parseInt(textInputValue);
        const price1 = parseInt(price);

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getDate().toString().padStart(2, "0");
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");

        // Concatenate date and time in the desired format
        const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        // Generate unique filename for the image
        const randomNumber = Math.floor(Math.random() * 10).toString();
        const formData = new FormData();

        for (const imageUri of selectedImages) {
          if (!imageUri) {
            continue; // Skip iteration if imageUri is falsy
          }

          const response = await fetch(imageUri);

          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${imageUri}`);
          }

          // Generate a unique filename
          const uniqueFilename = generateUniqueFilename(imageUri);
          const filename = `${currentDateTime}-${uniqueFilename}.jpg`;

          const image = {
            uri: imageUri,
            name: filename,
            type: "image/jpeg", // Adjust the type based on your file type
          };

          formData.append("file[]", image);
        }

        // Function to generate a unique filename
        function generateUniqueFilename(imageUri) {
          const extension = imageUri.split(".").pop(); // Extract extension from the URI
          const uuid = generateUUID(); // Generate a unique identifier
          return `${uuid}.${extension}`;
        }

        // Function to generate a UUID
        function generateUUID() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
              var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
              return v.toString(16);
            }
          );
        }


        formData.append("user_id", userIdApp.toString());
        formData.append("weight", textInputValue.toString());
        formData.append("price", minimum_price.toString());
        formData.append("prod_id", p_id.toString());
        formData.append("minimum_price", minimum_price.toString());
        let a = Number(textInputValue);
        let b = Number(price);
        let c = a * b;
        formData.append("maximum_price", c.toString());

        const url =
          "https://shreddersbay.com/API/auctioncart_api.php?action=insert";
        const uploadResponse = await fetch(url, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(formData)

        if (uploadResponse.ok) {
          resetDropdowns();
          // Alert.alert("Add Scrap Successfully.");
          // navigation.navigate("Scrap Cart", { screen: "T2Screen1" });
          navigation.navigate("T3Screen4")
        } else {
          // Handle non-2xx response statuses here
          console.error(
            "Failed to upload image. Server returned status: ",
            uploadResponse.status
          );
        }

        // console.log(uploadResponse)
      } else {
        Alert.alert(
          "Please choose all necessary fields like: choose product, weight, choose or capture Image"
        );
      }
    } catch (error) {
      console.error("Error during handleSubmit:", error);
      // Handle other errors such as network issues here
      Alert.alert(
        `${error}....... Error uploading image. Please check your network connection and try again.`
      );
    }
  };

  //////////////////////////////////////////////-------end-----------/////////////////////////////////////////////////////
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    pollApi();
  };
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          marginTop: 30,
          marginHorizontal: 10,
          padding: 30,
          justifyContent: "center",
        }}
      >
        {/* <Text>this is Dropdowns</Text> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#0000ff"]}
              tintColor="#0000ff"
            />
          }
        >
          <View>
            <View>
              {/* ///////////////////////////drowpdown Pickers////////////////////////// */}

              <View>
                <View>
                  {osName === "ios" && (
                    <>
                      {/* ///////ios pickers //////////////////////////////////////////////// */}
                      <View>
                        <View style={{ marginTop: 10 }}>
                          <Picker
                            selectedValue={selectedMetal}
                            style={{
                              height: 50,
                              width: 270,
                              alignSelf: "center",
                            }}
                            itemStyle={{
                              fontSize: 18,
                              color: "blue",
                              backgroundColor: "white",
                              paddingHorizontal: 10,
                            }}
                            onValueChange={(itemValue) =>
                              handleSelectMetal(itemValue)
                            }
                          // mode="dropdown" // Set mode to "dropdown" explicitly
                          >
                            <Picker.Item label={`${metalType}`} value="" />
                            {MetalData.map((item) => (
                              <Picker.Item
                                label={item.p_name}
                                value={item.p_id}
                                key={item.p_id}
                              />
                            ))}
                          </Picker>
                        </View>
                        <View
                          style={{
                            marginTop: 100,
                          }}
                        >
                          <Picker
                            selectedValue={selectedSubMetal}
                            style={{
                              height: 50,
                              width: 270,
                              alignSelf: "center",
                            }}
                            itemStyle={{
                              fontSize: 18,
                              color: "blue",
                              backgroundColor: "white",
                              paddingHorizontal: 10,
                            }}
                            onValueChange={(itemValue) =>
                              setSelectedSubMetal(itemValue)
                            }
                            mode="dropdown" // Set mode to "dropdown" explicitly
                          >
                            <Picker.Item label={`${submetalType}`} value="" />
                            {SubMetalData.map((item, index) => (
                              <Picker.Item
                                label={item.p_type_name}
                                value={item.p_type_name}
                                key={index}
                              />
                            ))}
                          </Picker>
                        </View>
                      </View>
                    </>
                  )}
                  {osName === "android" && (
                    <>
                      {/* //////////////////////////////////android pickers ///////////////////////////// */}
                      <View
                        style={{
                          justifyContent: "center",
                          borderWidth: 1,
                          padding: 0,
                          borderColor: "lightgray",
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                      >
                        <Picker
                          selectedValue={selectedMetal}
                          style={{ height: 50, width: 270 }}
                          itemStyle={{
                            fontSize: 18,
                            color: "blue",
                            backgroundColor: "lightgray",
                            paddingHorizontal: 10,
                          }}
                          onValueChange={(itemValue) =>
                            handleSelectMetal(itemValue)
                          }
                        >
                          <Picker.Item label={`${metalType}`} value="" />
                          {MetalData.map((item) => (
                            <Picker.Item
                              label={item.p_name}
                              value={item.p_id}
                              key={item.p_id}
                            />
                          ))}
                        </Picker>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          borderWidth: 1,
                          padding: 0,
                          borderColor: "lightgray",
                          borderRadius: 10,
                          marginTop: 30,
                        }}
                      >
                        <Picker
                          selectedValue={selectedSubMetal}
                          style={{ height: 50, width: 270 }}
                          itemStyle={{
                            fontSize: 18,
                            color: "blue",
                            backgroundColor: "lightgray",
                            paddingHorizontal: 10,
                          }}
                          onValueChange={(itemValue) =>
                            setSelectedSubMetal(itemValue)
                          }
                        >
                          <Picker.Item label={`${submetalType}`} value="" />
                          {SubMetalData.map((item, index) => (
                            <Picker.Item
                              label={item.p_type_name}
                              value={item.p_type_name}
                              key={index}
                            />
                          ))}
                        </Picker>
                      </View>
                    </>
                  )}
                </View>
              </View>
              {/* //////////////////////////////////////////////////////////// */}

              <View
                style={[
                  styles.radioButtonContainer,
                  osName === "ios" && styles.iosMarginTop,
                ]}
              >
                <View>
                  <TextInput
                    // placeholder={Enter ${weight} in kg}
                    placeholder="Enter Weight in kg"
                    value={textInputValue}
                    onChangeText={handleNumericInputChange}
                    style={styles.textInput}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <TextInput
                    // placeholder={Enter ${weight} in kg}
                    placeholder="Enter Minimum Price"
                    value={minimum_price}
                    onChangeText={handleNumericInputChange1}
                    style={[styles.textInput, { marginTop: 18 }]}
                    keyboardType="numeric"
                  />
                </View>
                {productname || price ? (
                  <Text style={{ color: "blue" }}>
                    {" "}
                    price of {productname}:-{price}{" "}
                  </Text>
                ) : null}
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <Button title="Pick Images" onPress={pickImages} /> */}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 20,
                  }}
                >
                  {selectedImages.map((imageUri, index) => (
                    <View key={index} style={styles.imageContainer}>
                      <Image
                        source={{ uri: imageUri }}
                        style={{ width: 100, height: 100, margin: 5 }}
                      />
                      <TouchableOpacity
                        onPress={() => removeImage(index)}
                        style={[
                          styles.cancelButton,
                          { backgroundColor: "transparent" },
                        ]}
                      >
                        <FontAwesome name="times-circle" size={24} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.buttonsContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    {/* <TouchableOpacity  onPress={pickImage} disabled={!hasPermission} > */}
                    <TouchableOpacity
                      onPress={pickImages}
                      disabled={!hasPermission}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "black",

                          borderWidth: 2,
                          borderColor: "#1f2e2e",
                          padding: 5,
                          borderRadius: 7,
                          marginRight: 10,
                        }}
                      >
                        {" "}
                        Open Gallery
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <FontAwesome
                    name="camera"
                    style={{ fontSize: 30 }}
                    onPress={takeImages}
                    disabled={!hasPermission}
                  />
                </View>
              </View>
                <LoginModal navigation={navigation} visible={isLoginModalVisible} setVisible={setIsLoginModalVisible}/>        
              <View style={{ marginTop: 20 }}>
                
                <View>
                  {((gUserCred !== null && typeof gUserCred === 'object') || (userCred !== null && typeof userCred === 'object')) && userIdApp ? (
                    <TouchableOpacity onPress={handleSubmit}>
                      <Text
                        style={{
                          borderColor: "#1f2e2e",
                          borderWidth: 2,
                          padding: 10,
                          marginBottom: 6,
                          borderRadius: 5,
                          fontSize: 17,
                          color: "#fff",
                          backgroundColor: "#1f2e2e",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Add Auction
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Text
                        style={{
                          borderColor: "#1f2e2e",
                          borderWidth: 2,
                          padding: 10,
                          marginBottom: 6,
                          borderRadius: 5,
                          fontSize: 17,
                          color: "#fff",
                          backgroundColor: "#1f2e2e",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                        onPress={() => {

                          setIsLoginModalVisible(true)
                        }}
                      >
                        Add Auction.
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity>
                    <Text
                      style={{
                        borderColor: "#1f2e2e",
                        borderWidth: 2,
                        padding: 10,
                        borderRadius: 5,
                        fontSize: 17,
                        color: "#fff",
                        backgroundColor: "#1f2e2e",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      onPress={resetDropdowns}
                    // onPress={hsubmit}
                    >
                      Reset
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity>
                    <Text
                      style={{
                        borderColor: "#1f2e2e",
                        borderWidth: 2,
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 5,
                        fontSize: 17,
                        color: "#fff",
                        backgroundColor: "#1f2e2e",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      onPress={() => navigation.navigate("Auction")}
                    >
                      Auction
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
              {/* </ScrollView> */}
            </View>
          </View>
        </ScrollView>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // imageContainer: {
  //   alignItems: "center",
  // },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 18,
    marginTop: 10,
  },
  cancelButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 1,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 28,
  },

  image1: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  radioButtonContainer: {
    justifyContent: "space-around",
    marginVertical: 20,
    alignItems: "center",
  },
  iosMarginTop: {
    marginTop: 120,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonCircle: {
    height: 25,
    width: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#666666",
    alignItems: "center",
    justifyContent: "center",
  },

  innerCircle: {
    height: 14,
    width: 14,
    borderRadius: 6,
    backgroundColor: "#000",
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
    borderColor: "lightgray",
    borderWidth: 1,
    height: 50,
    width: 280,
    paddingLeft: 20,
    marginTop: 10,
  },

  radioWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio_main: {
    alignItems: "center",
    justifyContent: "center",
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

    borderColor: "black",
    margin: 5,
  },
  radioBg: {
    backgroundColor: "black",
    width: 20,
    height: 20,
    borderRadius: 20,
    margin: 3,
  },
});

export default T3Screen2;
