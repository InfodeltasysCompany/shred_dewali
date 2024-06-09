import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, Image, StyleSheet, Modal, FlatList, Button, Alert, Dimensions, ScrollView, Pressable, TouchableOpacity, Switch } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ProductPreviewAndPost from "./ProductPreviewAndPost";
import DisplayAllAddresses from "../../components/Modal/addressModal/DisplayAllAdresses";
import LoginModal from "../../components/Credential/LoginModal";
import { AuthContext } from "../../redux/ContextApi/UserAuthProvider";
import { useFocusEffect } from "@react-navigation/native";

const ProductImageAdd = ({ closeModal, visible, navigation, formfilledpost, setformfilledPost }) => {
  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password } = state;
  const [images, setImages] = useState([]);
  const width = Dimensions.get('window').width;
  const height = width * 0.5;
  const [active, setActive] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);
////////////////////////////////////////

////////////////////////////////////////


  useEffect(()=>{
    console.log("formfilled post",formfilledpost);

  },[formfilledpost])

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      const newImages = [...images, ...selectedImages];
      if (newImages.length > 10) {
        Alert.alert("Maximum limit reached", "You can only select up to 10 images.");
        setImages(newImages.slice(0, 10));
      } else {
        setImages(newImages);
      }
    }
  };

  const takePicture = async () => {
    let photo = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!photo.canceled) {
      const newImage = photo.assets[0].uri;
      const newImages = [...images, newImage];
      if (newImages.length > 10) {
        Alert.alert("Maximum limit reached", "You can only select up to 10 images.");
        setImages(newImages.slice(0, 10));
      } else {
        setImages(newImages);
      }
    }
  };

  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setActive(slide);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };
  const [ispreviewModalVisible, setIspreviewModalVisible] = useState(false);
  const [isAddressModalvisible, setIsAddressModalvisible] = useState(false);
  const [address, setaddress] = useState(null);
  const [isSubmitting, setisSubmitting] = useState(false);
const closePreviewModal=()=>{
  setIspreviewModalVisible(!ispreviewModalVisible)
  // console.log("data for testing=>",data);

} 
  const handleNext = async() => {
    if (userIdApp && address && images.length) {
      if (isAuctionEnabled) {
        //call Insert Auction Cart api. 
        // Alert.alert("Auction is created happily.")
        console.log("formfillledpost",formfilledpost);
        ////////////////////////////////////
        if (isSubmitting) {
          return; // Prevent multiple submissions
        }
        try {
       
    
            const textInputValue = parseInt(formfilledpost.textWeight);
            const minimum_price = parseInt(formfilledpost.textPrice);
    
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
    
            for (const imageUri of images) {
              if (!imageUri) {
                continue; // Skip iteration if imageUri is falsy
              }
    
              const response = await fetch(imageUri);
    
              if (!response.ok) {
                throw new Error(`Failed to fetch image: ${imageUri}`);
              }
    
              // Generate a unique filename
              const uniqueFilename = generateUniqueFilename(imageUri);
              const filename = `${currentDateTime}-${uniqueFilename}`;
    
              const image = {
                uri: imageUri,
                name: filename,
                type: "image/jpeg", // Adjust the type based on your file type
              };
    
              formData.append("file[]", image as any);
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
    
            formData.append("title",formfilledpost.textTitle.toString());
            formData.append("description",formfilledpost.textDescription.toString());  
            formData.append("user_id", userIdApp.toString());
            formData.append("weight", textInputValue.toString());
            formData.append("price", minimum_price.toString());
            formData.append("prod_id", formfilledpost.p_id.toString());
            formData.append("minimum_price", minimum_price.toString());
            let a = Number(textInputValue);
            let b = Number(minimum_price);
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
              imageAddressResetbtn();
              Alert.alert("Add Scrap Successfully.");

              setIspreviewModalVisible(!ispreviewModalVisible)

            } else {
              // Handle non-2xx response statuses here
              console.error(
                "Failed to upload image. Server returned status: ",
                uploadResponse.status
              );
            }
    
            // console.log(uploadResponse)
          
        } catch (error) {
          console.error("Error during handleSubmit:", error);
          // Handle other errors such as network issues here
          Alert.alert(
            `${error}....... Error uploading image. Please check your network connection and try again.`
          );
        }
        ////////////////////////////////////
        setIspreviewModalVisible(!ispreviewModalVisible)

      } else {
        //call order insert cart api.

        if (isSubmitting) {
          return; // Prevent multiple submissions
        }
        try {
       
    
          const textInputValue = parseInt(formfilledpost.textWeight);
          const minimum_price = parseInt(formfilledpost.textPrice);
  
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
  
          for (const imageUri of images) {
            if (!imageUri) {
              continue; // Skip iteration if imageUri is falsy
            }
  
            const response = await fetch(imageUri);
  
            if (!response.ok) {
              throw new Error(`Failed to fetch image: ${imageUri}`);
            }
  
            // Generate a unique filename
            const uniqueFilename = generateUniqueFilename(imageUri);
            const filename = `${currentDateTime}-${uniqueFilename}`;
  
            const image = {
              uri: imageUri,
              name: filename,
              type: "image/jpeg", // Adjust the type based on your file type
            };
  
            formData.append("file[]", image as any);
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
  
          formData.append("title",formfilledpost.textTitle.toString());
          formData.append("description",formfilledpost.textDescription.toString());
          formData.append("user_id", userIdApp.toString());
          formData.append("weight", textInputValue.toString());
          formData.append("price", minimum_price.toString());
          formData.append("prod_id", formfilledpost.p_id.toString());
          formData.append("minimum_price", minimum_price.toString());
          let a = Number(textInputValue);
          let b = Number(minimum_price);
          let c = a * b;
          formData.append("maximum_price", c.toString());
            const url = 'https://shreddersbay.com/API/cart_api.php?action=insert';
          // const url = "";
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
            // console.log("uploadResponse:=>",uploadResponse)
            // imageAddressResetbtn();
            Alert.alert("Add Scrap Successfully.");

            setIspreviewModalVisible(!ispreviewModalVisible)

          } else {
            // Handle non-2xx response statuses here
            console.error(
              "Failed to upload image. Server returned status: ",
              uploadResponse.status
            );
          }
  
          // console.log(uploadResponse)
        
      } catch (error) {
        console.error("Error during handleSubmit:", error);
        // Handle other errors such as network issues here
        Alert.alert(
          `${error}....... Error uploading image. Please check your network connection and try again.`
        );
      }
      

      }

    } else {
      Alert.alert("Please fill all fill..")
    }

  }
  const handleOnCloseAddress = () => {
    if (userIdApp) {
      setIsAddressModalvisible(!isAddressModalvisible);
    } else {
      setisloginModalVisible(!isloginModalVisible);
    }
  }
  const getAddress = (address) => {
    setaddress(address);
  }
  /////////////////////
  const [isAuctionEnabled, setIsAuctionEnabled] = useState(false);
  const toggleSwitch = () => setIsAuctionEnabled(previousState => !previousState);
  const [isloginModalVisible, setisloginModalVisible] = useState(false);
  ////////////////////////////
  const imageAddressResetbtn=()=>{
    setImages([]);
    setaddress(null);
  }





  return (
    <Modal animationType="none" visible={visible}>
      <ProductPreviewAndPost setisVisible={setIspreviewModalVisible} visible={ispreviewModalVisible} address={address} setaddress={setaddress}  isAuctionEnabled={isAuctionEnabled} navigation={navigation} />
      <DisplayAllAddresses navigation={undefined} visible={isAddressModalvisible} onClose={handleOnCloseAddress} addrseter={getAddress} />
      <LoginModal navigation={navigation} visible={isloginModalVisible} setVisible={setisloginModalVisible} />
      <View style={{ flex: 1 }}>
        <AntDesign name="close" size={35} color={"gray"} onPress={closeModal} style={{ ...styles.closeIcon, left: 10, top: 10 }} />
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 13 }}>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>Add images and address</Text>
        </View>
        {/* //////////////// */}
        <View style={{ paddingTop: 10, }}>
          {!images.length ?
            <Pressable onPress={pickImages} style={{ width, height }} >
              <Image
                source={require("../../assets/addImgPoster.png")}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              />
            </Pressable>
            :
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              style={styles.scrollView}
              scrollEventThrottle={16}
            >
              {images.map((image, index) => (
                <View key={index} style={{ width, height }}>
                  <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                  <AntDesign
                    name="closecircle"
                    size={24}
                    color={"black"}
                    style={styles.deleteIcon}
                    onPress={() => removeImage(index)}
                  />
                </View>
              ))}
            </ScrollView>

          }

          <View style={styles.pagination}>
            {images.map((_, index) => (
              <Text key={index} style={[styles.paginationDot, index === active && styles.paginationDotActive]}>&bull;</Text>
            ))}
          </View>

        </View>
        {/* ////////////////////// */}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={pickImages}
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
              onPress={takePicture}
            />
          </View>

          {/* /////////////////////// */}

        </View>


        <View style={styles.card}>
          <Pressable onPress={handleOnCloseAddress} style={styles.pressable}>
            <Text style={styles.buttonText}>
              {address ? "Change Address" : "Pick Address"}
            </Text>

            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingTop: 8, width: "100%", paddingLeft: 20, paddingRight: 60, }}>
              <View style={{}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: '#888' }}>City:</Text>
                  <Text style={{ color: '#888' }}>{address ? address.city_name : "_ _ _ _"}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: '#888' }}>State:</Text>
                  <Text style={{ color: '#888' }}>{address ? address.state_name : "_ _ _ _"}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: '#888' }}>Country:</Text>
                  <Text style={{ color: '#888' }}>{address ? address.country_name : "_ _ _ _"}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: '#888' }}>Postal Code:</Text>
                  <Text style={{ color: '#888' }}>{address ? address.pin_code : "_ _ _ _"}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: '#888' }}>Landmark:</Text>
                  <Text style={{ color: '#888' }}>{address ? address.landmark : "_ _ _ _"}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: '#888' }}>Address:</Text>
                  <Text style={{ color: '#888' }}>{address ? address.address : "_ _ _ _"}</Text>
                </View>
              </View>
            </View>

          </Pressable>

        </View >
        <Pressable style={{ flex: 1, alignItems: 'center', justifyContent: "space-evenly", flexDirection: 'row' }} onPress={toggleSwitch}>
          <Text style={{
            fontSize: 18,
            color: "black",

            borderWidth: 2,
            borderColor: "#1f2e2e",
            padding: 5,
            borderRadius: 7,
            marginRight: 10,
          }}>
            {isAuctionEnabled ? "Enable Order" : "Enable Auction"}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isAuctionEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isAuctionEnabled}
          />
        </Pressable>
        <TouchableOpacity style={{ backgroundColor: '#00457E', height: 70, width: '90%', alignSelf: 'center', borderRadius: 8, alignItems: 'center', justifyContent: 'center', bottom: 0, }} onPress={handleNext}>
          <Text style={{ color: 'white', fontSize: 27, fontWeight: '600' }}>{isAuctionEnabled ? "Auction" : "Order"} preview</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    top: 5,
    // right: 15,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  scrollView: {
    // flex: 1,
    // paddingTop: 180,
    // flex:1,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  paginationDot: {
    color: '#888',
    margin: 3,
    fontSize: 30,
  },
  paginationDotActive: {
    color: '#000',
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 28,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 25,
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#007BFF',
    marginBottom: 10,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
});

export default ProductImageAdd;

