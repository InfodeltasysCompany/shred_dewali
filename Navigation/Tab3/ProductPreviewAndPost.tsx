

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Alert, useWindowDimensions, ScrollView, Dimensions, Platform, ToastAndroid } from "react-native";
import { AuthContext } from "../../redux/ContextApi/UserAuthProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CommonActions } from "@react-navigation/native";

const ProductPreviewAndPost = ({ setisVisible, visible, address, setaddress, isAuctionEnabled, navigation }) => {
  const imgurl = "https://shreddersbay.com/API/uploads/";
  const [state] = useContext(AuthContext);
  const { userIdApp } = state;
  const [dataforPreview, setDataforPreview] = useState([]);
  const width = Dimensions.get('window').width;
  const height = width * 0.5;
  const [active, setActive] = useState(0);
  const scrollViewRef = useRef(null);
  const [profileData, setprofileData] = useState([]);
  const [images, setImages] = useState([]);
  const [startDate, setStartDate] = useState("Start Date");
  const [endDate, setEndDate] = useState("End Date");
  const [chooseDate, setChooseDate] = useState("Choose Date");

  const [showPicker, setShowPicker] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());


  const fetchData = async () => {
    let url = "";
    if (isAuctionEnabled) {
      url = "https://shreddersbay.com/API/auctioncart_api.php?action=select_id&user_id=";
    } else {
      url = "https://shreddersbay.com/API/cart_api.php?action=select_id&user_id=";
    }
    try {
      const response = await fetch(url + userIdApp);
      const data1 = await response.json();
      setDataforPreview(data1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const response = await fetch(
        `https://shreddersbay.com/API/user_api.php?action=select_id&user_id=${userIdApp}`,
        { method: "GET" }
      );
      if (response.ok) {
        const userProfileData = await response.json();
        setprofileData(userProfileData);
      } else {
        console.error("Failed to get profile:", response.status);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const getprofiledata = async () => {
      try {
        const response = await fetch(
          `https://shreddersbay.com/API/user_api.php?action=select_id&user_id=${userIdApp}`,
          { method: "GET" }
        );
        if (response.ok) {
          const userProfileData = await response.json();
          setprofileData(userProfileData);
        } else {
          console.error("Failed to get profile:", response.status);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    getprofiledata();
  }, [isAuctionEnabled, visible]);

  useEffect(() => {
    if (dataforPreview.length > 0 && dataforPreview[dataforPreview.length - 1].filename) {
      const imageUrls = dataforPreview[dataforPreview.length - 1].filename.split(",").map(filename => imgurl + filename.trim());
      setImages(imageUrls);
    }
  }, [dataforPreview]);

  const onDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowPicker(Platform.OS === "ios");
    setSelectedDate(currentDate);
    setEndDate(formatDate(currentDate));
  };

  const formatDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  const onDateChange1 = (event, selected1) => {
    const currentDate = selected1 || selectedDate1;
    setShowPicker1(Platform.OS === "ios");
    setSelectedDate1(currentDate);
    setStartDate(formatDate1(currentDate));
  };
  const onDateChange2 = (event, selected2) => {
    const currentDate = selected2 || selectedDate2;
    setShowPicker2(Platform.OS === "ios");
    setSelectedDate2(currentDate);
    setChooseDate(formatDate1(currentDate));
  };

  const formatDate1 = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setActive(slide);
  };

  const closeModal = () => {
    let url = "";
    if (isAuctionEnabled) {
      url = "https://shreddersbay.com/API/auctioncart_api.php?action=delete&cart_id=";
    } else {
      url = "https://shreddersbay.com/API/cart_api.php?action=delete&cart_id=";
    }
  console.log("previewData:=>",)
    Alert.alert(
      'Confirmation', // Title
      'Are you sure you want to Discard the Changes?', // Message
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              for (let i = 0; i < dataforPreview.length; i++) {
                const element = dataforPreview[i];
                const apiUrl = `${url}${element.cart_id}`;
  
                const response = await fetch(apiUrl, {
                  method: "DELETE",
                  // You can add headers or other options here if required
                });
  
                if (!response.ok) {
                  throw new Error("Failed to delete data");
                }
  
                console.log("Data deleted successfully", apiUrl);
              }
              setisVisible(!visible);
            } catch (error) {
              console.error("Error:", error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  ///////////////////////////
  const [isSubmitting, setIsSubmitting] = useState(false);

const handlePublishYourAdBtn = async () => {
  if (isSubmitting) {
    return; // Prevent multiple submissions
  }

  setIsSubmitting(true);
  if (
    (
      (startDate !== "Start Date" && endDate !== "End Date" && endDate >= startDate) || chooseDate !== "Choose Date"
    ) &&
    address !== null &&
    dataforPreview[dataforPreview.length - 1] !== null &&
    userIdApp !== ""
  ) {
    try {
      const formData = new FormData();
      formData.append("user_id", userIdApp);

      const filenames = dataforPreview[dataforPreview.length - 1].filename
        .split(",")
        .map((filename) => filename.trim());

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      const hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const seconds = currentDate.getSeconds().toString().padStart(2, "0");
      const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const imageURIs = filenames.map(filename => `https://shreddersbay.com/API/uploads/${filename}`);

      for (const uri of imageURIs) {
        try {
          const response = await fetch(uri);
          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${uri}`);
          }
          const blob = await response.blob();

          const uniqueFilename = generateUniqueFilename(uri);
          const filename = `${currentDateTime}-${uniqueFilename}.jpg`;

          const image = {
            uri: uri,
            name: filename,
            type: "image/jpeg",
          };

          formData.append("file[]", image as any);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }

      function generateUniqueFilename(imageUri) {
        const extension = imageUri.split(".").pop();
        const uuid = generateUUID();
        return `${uuid}.${extension}`;
      }

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

      formData.append("addr_id", address.addr_id);
      formData.append("approx_weight", dataforPreview[dataforPreview.length - 1].total_weight);
      formData.append("prod_id", dataforPreview[dataforPreview.length - 1].prod_id);

      let apiUrl = isAuctionEnabled
        ? "https://shreddersbay.com/API/auctionOrder_api.php?action=insert"
        : "https://shreddersbay.com/API/orders_api.php?action=insert";

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Auction created successfully!");
        let toast = ""
        if(isAuctionEnabled){
          toast ="Auction Created successfully"
        }else{
          toast ="Order Placed succesfully"
        }
        ToastAndroid.showWithGravity(
          toast,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        navigation.navigate("Main");
      } else {
        console.error("Failed to create auction.");
      }

      const data = await response.json();
      console.log("response:", data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  } else {
    // Alert.alert("Please fill all the necessary fields.");
    ToastAndroid.showWithGravity(
      "Please fill all the necessary fields.",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    setIsSubmitting(false);
  }
};

  //////////////////////////

  return (
    <Modal animationType="none" visible={visible}>
      {/* <View> */}
      <AntDesign name="close" size={35} color={"gray"} onPress={closeModal} style={styles.closeIcon} />
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -30, paddingBottom: 20, }}>
        <Text style={{ fontSize: 20, fontWeight: '500' }}>Preview Details</Text>
      </View>
      {/* </View> */}

      <View style={{}}>
        {images.length > 0 && (
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
              </View>
            ))}
          </ScrollView>
        )}

        <View style={styles.pagination}>
          {images.map((_, index) => (
            <Text key={index} style={[styles.paginationDot, index === active && styles.paginationDotActive]}>&bull;</Text>
          ))}
        </View>
      </View>

      <View>
        {showPicker1 && (
          <DateTimePicker
            value={selectedDate1}
            mode="date"
            display="default"
            onChange={onDateChange1}
          />
        )}
        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        {showPicker2 && (
          <DateTimePicker
            value={selectedDate2}
            mode="date"
            display="default"
            onChange={onDateChange2}
          />
        )}
        <View style={{ ...styles.datePickerContainer, marginBottom: 20 }}>

          {isAuctionEnabled ?
            <>
              <View style={styles.row}>
                <View style={styles.flexItem}>
                  <Text style={styles.date}>{startDate}</Text>
                </View>
                <View style={styles.flexItem}>
                  <FontAwesome name="calendar" style={styles.icon} onPress={() => setShowPicker1(true)} />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.flexItem}>
                  <Text style={styles.date}>{endDate}</Text>
                </View>
                <View style={styles.flexItem}>
                  <FontAwesome name="calendar" style={styles.icon} onPress={() => setShowPicker(true)} />
                </View>
              </View>
            </> :
            <>
              <View style={styles.row}>
                <View style={styles.flexItem}>
                  <Text style={styles.date}>{chooseDate}</Text>
                </View>
                <View style={styles.flexItem}>
                  <FontAwesome name="calendar" style={styles.icon} onPress={() => setShowPicker2(true)} />
                </View>
              </View>

            </>}


        </View>
      </View>

      <ScrollView style={{ backgroundColor: 'lightgray' }}>
        <View style={{ padding: 20 }}>

          <Text style={styles.detail}>PRODUCT DETAIL</Text>

          <View style={styles.row}>
            <Text style={styles.text}>Cart_Id</Text>
            <Text style={styles.text}> : </Text>
            <Text style={styles.text1}>{dataforPreview[dataforPreview.length - 1] && dataforPreview[dataforPreview.length - 1].cart_id}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Product_Name</Text>
            <Text style={styles.text}> : </Text>
            <Text style={styles.text1}>{dataforPreview[dataforPreview.length - 1] && dataforPreview[dataforPreview.length - 1].p_name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Approx Price</Text>
            <Text style={styles.text}> : </Text>
            <Text style={styles.text1}>{dataforPreview[dataforPreview.length - 1] && dataforPreview[dataforPreview.length - 1].price}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Date</Text>
            <Text style={styles.text}> : </Text>
            <Text style={styles.text1}>{dataforPreview[dataforPreview.length - 1] && dataforPreview[dataforPreview.length - 1].date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Weight</Text>
            <Text style={styles.text}> : </Text>
            <Text style={styles.text1}>{dataforPreview[dataforPreview.length - 1] && dataforPreview[dataforPreview.length - 1].weight}</Text>
          </View>
        </View>

        <View style={{ backgroundColor: '#ffffff', padding: 10 }}>
          <Text style={styles.detail}>CUSTOMER DETAIL</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Name:</Text>
            <Text style={styles.text}> : </Text>
            <Text style={styles.text1}>{profileData[0] && profileData[0].name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Mobile:</Text>
            <Text style={styles.text}> : </Text>
            <Text style={styles.text1}>{profileData[0] && profileData[0].mobile}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Address:</Text>
            <Text style={styles.text}> : </Text>
            <Text style={styles.text1}>{address && address.address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Landmark:</Text>
            <Text style={styles.text}> : </Text>
            <Text style={styles.text1}>{address && address.landmark}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Pincode:</Text>
            <Text style={styles.text}> : </Text>
            <Text style={styles.text1}>{address && address.pin_code}</Text>
          </View>


        </View>
      </ScrollView>
      <TouchableOpacity style={{...styles.button,marginBottom:2,}} onPress={handlePublishYourAdBtn}>
        <Text style={styles.buttonText}>Publish Your Ad</Text>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    // alignSelf: 'flex-end',
    marginLeft: 10,
    marginTop: 10,
  },
  scrollView: {
    height: 200,
    // backgroundColor: 'lightgray',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginTop: -35
  },
  paginationDot: {
    fontSize: 30,
    color: '#888',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    color: 'black',
  },
  detail: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 15,
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  text: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '500',
  },
  text1: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  date: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '500',
  },
  icon: {
    fontSize: 25,
    color: 'black',
  },
  flexItem: {
    flex: 1,
    alignItems: 'center',
  },
  datePickerContainer: {
    // paddingTop: 20,
  },

  button: {
    backgroundColor: '#00457E',
    height: 70,
    width: '100%',
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },



  buttonText: {
    color: 'white',
    fontSize: 26,
    fontWeight: '600',
  },
});

export default ProductPreviewAndPost;