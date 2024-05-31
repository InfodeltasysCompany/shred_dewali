import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Modal, FlatList, Button, Alert, Dimensions, ScrollView, Pressable, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ProductPreviewAndPost from "./ProductPreviewAndPost";
import DisplayAllAddresses from "../../components/Modal/addressModal/DisplayAllAdresses";

const ProductImageAdd = ({ closeModal, visible, navigation }) => {
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
  const handleNext = () => {
    setIspreviewModalVisible(!ispreviewModalVisible)
  }
  const handleOnCloseAddress = () => {
    setIsAddressModalvisible(!isAddressModalvisible);
  }
  const getAddress = (address) => {
    setaddress(address);
  }

  return (
    <Modal animationType="none" visible={visible}>
      <ProductPreviewAndPost closeModal={handleNext} visible={ispreviewModalVisible} />
      <DisplayAllAddresses navigation={navigation} visible={isAddressModalvisible} onClose={handleOnCloseAddress} addrseter={getAddress} />
      <View style={{ flex: 1 }}>
        <AntDesign name="close" size={35} color={"gray"} onPress={closeModal} style={{ ...styles.closeIcon, left: 10, top: 10 }} />
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 13 }}>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>Add images and address</Text>
        </View>
        {/* //////////////// */}
        <View style={{paddingTop:10,}}>
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
            {address &&
              <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingTop: 8, width: "100%", paddingLeft: 20, paddingRight: 60, }}>
                <View style={{}}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold', color: '#888' }}>City:</Text>
                    <Text style={{ color: '#888' }}>{address.city_name}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold', color: '#888' }}>State:</Text>
                    <Text style={{ color: '#888' }}>{address.state_name}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold', color: '#888' }}>Country:</Text>
                    <Text style={{ color: '#888' }}>{address.country_name}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold', color: '#888' }}>Postal Code:</Text>
                    <Text style={{ color: '#888' }}>{address.pin_code}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold', color: '#888' }}>Landmark:</Text>
                    <Text style={{ color: '#888' }}>{address.landmark}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold', color: '#888' }}>Address:</Text>
                    <Text style={{ color: '#888' }}>{address.address}</Text>
                  </View>
                </View>
              </View>}
            
          </Pressable>
          
        </View >
        <TouchableOpacity style={{ backgroundColor: '#00457E', height: 70, width: '90%', alignSelf: 'center', borderRadius: 8,  alignItems: 'center', justifyContent: 'center',bottom:0, }} onPress={handleNext}>
          <Text style={{ color: 'white', fontSize: 27, fontWeight: '600' }}>Next</Text>
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
    marginTop:25,
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
