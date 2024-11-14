import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Platform,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Pressable,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getUserId,
  getApiResponse,
  getCurrentLocation,
  postData,
  deleteAllExceptLast,
  handleFinalSubmitSAddress,
} from "../Tab3/functions";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { EvilIcons } from "@expo/vector-icons";
import DisplayAllAddresses from "../../components/Modal/addressModal/DisplayAllAdresses";
import ImageSlider from 'react-native-image-slider';
import { CommonActions } from "@react-navigation/native";
import { BASE_URL, IMG_URL } from "../../ReuseComponent/Env";

const imgurl = IMG_URL;

const T3Screen4 = ({ navigation }) => {
  const [userIds, setuserIds] = useState(null);
  const [resData, setresData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setaddress] = useState(null);
  const [startDate, setStartDate] = useState("Start Date");
  const [endDate, setEndDate] = useState("End Date");
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);
  const [addrId, setAddrId] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [postApiRes, setPostApiRes] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  //////////////////////////////////////
  const [isAddressChooseModalDisplay, setIsAddressChooseModalDisplay] = useState(false);
  const [choosenAddress, setChoosenAddress] = useState(null);
  const handleaddresscloseModal = () => {
    setIsAddressChooseModalDisplay(!isAddressChooseModalDisplay);
  }
  const handleaddressetr = (addr) => {
    setIsAddressChooseModalDisplay(addr);
    setaddress(addr);
    setAddrId(addr.addr_id);
  }

  const fetchData = async () => {
    try {
      const userId = await getUserId();
      setuserIds(userId);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [counter, setCounter] = useState(0);

  const delRest = async () => {
    if (resData !== null && resData.length > 1) {
      // Get the cart_id of the last element
      const lastCartId = resData[resData.length - 1].cart_id;

      // Construct the base API URL
      const apiUrlBase =
        `${BASE_URL}/auctioncart_api.php?action=delete&cart_id=`;

      // Iterate through all elements except the last one
      for (let i = 0; i < resData.length - 1; i++) {
        const element = resData[i];
        const apiUrl = `${apiUrlBase}${element.cart_id}`;

        try {
          // Check if the current element's cart_id is not the same as the last one
          if (element.cart_id !== lastCartId) {
            await deleteAllExceptLast(apiUrl); // Delete the current element
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  useEffect(() => {

    delRest();////////////////////////////////////////////////////

    // if (counter < 5) {
    //   // Your function to run 5 times

    //   // Increment the counter
    //   console.log("counter==>",counter)
    // }
  }, []);

  const getCurrentPlace = async () => {
    const address = await getCurrentLocation();
    setaddress(address);

    ///////////////////////////////////////////////managing...//////////////////////////////////////////////////
    // console.log("Address:", address);

    // const url1 =
    //   "https://shreddersbay.com/API/address_api.php?action=AddrByUserId&user_id=" +
    //   userIds;

    // try {
    //   let addressdata = await getApiResponse(url1);

    //   // Assuming 'addressdata' is an array of objects and 'address' is an object
    //   const matchedAddresses = addressdata.filter(
    //     (item) =>
    //       item.landmark === address.district &&
    //       item.pin_code === address.postalCode
    //   );

    //   // Extracting addr_id of matched objects into a new array
    //   const matchedAddrIds = matchedAddresses.map((item) => item.addr_id);

    //   console.log("Matched addr_ids:", matchedAddrIds);
    //   matchedAddrIds.forEach(async (addrId) => {
    //     // console.log("Addr_id:", addrId);
    //      try {
    //   const id = addrId;
    //   const response = await fetch(
    //     `https://shreddersbay.com/API/address_api.php?action=delete&addr_id=${id}`,
    //     {
    //       method: "DELETE",
    //     }
    //   );

    //   if (response.ok) {
    //     console.log("Item deleted successfully"+id);
    //     // console.log("Address delete response:", response);
    //   } else {
    //     // Handle the error or failed deletion response
    //     console.error("Failed to delete item:", response.status);
    //   }
    // } catch (error) {
    //   console.error("Error deleting item:", error);
    // }
    //   });
    // } catch (error) {
    //   // Handle errors
    // }
    ////////1attempt
    console.log("Address:", address);

    const url1 = `${BASE_URL}/address_api.php?action=AddrByUserId&user_id=${userIds}`;


    try {
      let addressdata = await getApiResponse(url1);

      // Assuming 'addressdata' is an array of objects and 'address' is an object
      const matchedAddresses = addressdata.filter(
        (item) =>
          item.landmark === address.district &&
          item.pin_code === address.postalCode
      );

      // Extracting addr_id of matched objects into a new array
      const matchedAddrIds = matchedAddresses.map((item) => item.addr_id);

      // console.log("Matched addr_ids:", matchedAddrIds);

      // // Use for...of loop to ensure async/await works properly
      // for (const addrId of matchedAddrIds) {
      //   try {
      //     const id = addrId;
      //     const response = await fetch(
      //       `https://shreddersbay.com/API/address_api.php?action=delete&addr_id=${id}`,
      //       {
      //         method: "DELETE",
      //       }
      //     );

      //     if (response.ok) {
      //       // console.log(response, id);
      //       // console.log("Address delete response:", response);
      //     } else {
      //       // Handle the error or failed deletion response
      //       console.error("Failed to delete item:", response.status);
      //     }
      //   } catch (error) {
      //     console.error("Error deleting item:", error);
      //   }
      // }
      const deleteAddresses = async (matchedAddrIds) => {
        if (!Array.isArray(matchedAddrIds) || matchedAddrIds.length === 0) {
          console.error("No addresses to delete");
          return;
        }

        for (const addrId of matchedAddrIds) {
          try {
            const response = await fetch(
              `${BASE_URL}/address_api.php?action=delete&addr_id=${addrId}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json", // Adjust if needed
                  // Add any other headers as needed (e.g., authentication)
                },
              }
            );

            if (response.ok) {
              console.log(`Address with ID ${addrId} deleted successfully`);

            } else {
              console.error(
                `Failed to delete address with ID ${addrId}: ${response.statusText}`
              );
            }
          } catch (error) {
            console.error(`Error deleting address with ID ${addrId}:`, error);
          }
        }
      }
      deleteAddresses(matchedAddrIds);

    } catch (error) {
      // Handle errors
    }


    ///////////////////////////////////////////////managing....////////////////////////////////////////////////////////////
    ////////////////////////////set local address//////////////////////////
    const formData = new FormData();
    // formData.append("country_id", address.country);
    // formData.append("state_id", address.);
    // formData.append("city_id", selectedCityId);
    // formData.append("area_id", selectedAreaId);
    // formData.append("address", `${address.country} ${address.city} ${address.district}`);
    formData.append("landmark", address.district);
    formData.append("pincode", address.postalCode);
    formData.append("user_id", userIds);

    const apiUrl = `${BASE_URL}/address_api.php?action=insert`;

    handleFinalSubmitSAddress(formData, apiUrl)
      .then(async (response) => {
        // Handle the response here
        console.log(response);
        const url = `${BASE_URL}/address_api.php?action=AddrByUserId&user_id=${userIds}`;

        try {
          let addressdata = await getApiResponse(url);
          console.log("check response:-", addressdata);
          const lastaddress = addressdata[addressdata.length - 1];

          setAddrId(lastaddress.addr_id);
        } catch (error) {
          console.error("Error fetching data:,hello", error);
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
        // Show an alert or perform any action in case of an error
        // Alert.alert('Error', 'There was an error submitting the data');
      });
  };
  // const getData = async () => {
  //   if (userIds) {
  //     const url = `https://shreddersbay.com/API/auctioncart_api.php?action=select_id&user_id=${userIds}`;
  //     try {

  //   if (counter < 5) {
  //     // Your function to run 5 times

  //     // Increment the counter
  //     const auctionCart = await getApiResponse(url);
  //     if (auctionCart !== null && auctionCart.length > 1) {
  //       // Get the cart_id of the last element
  //       const lastCartId = auctionCart[auctionCart.length - 1].cart_id;

  //       // Construct the base API URL
  //       const apiUrlBase =
  //         "https://shreddersbay.com/API/auctioncart_api.php?action=delete&cart_id=";

  //       // Iterate through all elements except the last one
  //       for (let i = 0; i < auctionCart.length - 1; i++) {
  //         const element = auctionCart[i];
  //         const apiUrl = `${apiUrlBase}${element.cart_id}`;

  //         try {
  //           // Check if the current element's cart_id is not the same as the last one
  //           if (element.cart_id !== lastCartId) {
  //             await deleteAllExceptLast(apiUrl); // Delete the current element
  //           }
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       }
  //     }

  //     console.log("auction cart :-", auctionCart);
  //     delRest();

  //     const lastItem = auctionCart[auctionCart.length - 1]; // Get the last item from the array
  //     setresData([lastItem]); // Set only the last item in the state
  //   }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       Alert.alert("Error", "Failed to fetch data");
  //     }
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, [userIds,counter]);
  const getData = async () => {
    if (userIds) {
      const url = `${BASE_URL}/auctioncart_api.php?action=select_id&user_id=${userIds}`;
      try {
        if (counter < 5) {
          const auctionCart = await getApiResponse(url);
          if (auctionCart !== null && auctionCart.length > 1) {
            const lastCartId = auctionCart[auctionCart.length - 1].cart_id;
            const apiUrlBase = `${BASE_URL}/auctioncart_api.php?action=delete&cart_id=`;

            for (let i = 0; i < auctionCart.length - 1; i++) {
              const element = auctionCart[i];
              const apiUrl = `${apiUrlBase}${element.cart_id}`;

              try {
                if (element.cart_id !== lastCartId) {
                  await deleteAllExceptLast(apiUrl);
                }
              } catch (error) {
                console.log(error);
              }
            }
          }

          console.log("auction cart :-", auctionCart);
          delRest();

          const lastItem = auctionCart[auctionCart.length - 1];
          return lastItem; // Return the last item
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch data");
      }
    }
  };

  // const fetchData1 = async () => {
  //   const lastItem = await getData(); // Call getData and await the result
  //   if (lastItem) {
  //     setresData([lastItem]); // Update resData with the last item
  //   }
  // };
  const fetchData1 = async () => {
    const url = `${BASE_URL}/auctioncart_api.php?action=select_id&user_id=${userIds}`;

    await getData(); // Call getData and await the result
    const auctionCart = await getApiResponse(url);

    if (auctionCart && auctionCart.length > 0) {
      const lastItem = auctionCart[auctionCart.length - 1]; // Get the last item from the data array
      setresData([lastItem]); // Update resData with the last item
    } else {
      const lastItem = await getData(); // Call getData and await the result
      if (lastItem) {
        setresData([lastItem]); // Update resData with the last item
      }
    }
  };

  useEffect(() => {
    fetchData1();
  }, [userIds, counter]);
  useEffect(() => {
    onRefresh();
  }, [])

  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   if (resData[0]&& resData[0].filename) {
  //     const imageUrls = resData.filename.split(",").map(filename => imgurl + filename.trim());
  //     setImages(imageUrls);
  //   }
  // }, [resData]);


  const onDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowPicker(Platform.OS === "ios");
    setSelectedDate(currentDate);
    setEndDate(formatDate(currentDate)); // Update end date
  };

  const formatDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    return formattedDate;
  };
  const onDateChange1 = (event, selected1) => {
    const currentDate = selected1 || selectedDate1;
    setShowPicker1(Platform.OS === "ios");
    setSelectedDate1(currentDate);
    setStartDate(formatDate1(currentDate)); // Update end date
  };

  const formatDate1 = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    return formattedDate;
  };

  const today = new Date(); // Get today's date

  const [isSubmitting, setIsSubmitting] = useState(false);

  const createAuction = async () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }

    setIsSubmitting(true);
    console.log(addrId);
    if (
      startDate !== null &&
      endDate !== null &&
      addrId !== null &&
      resData !== null &&
      userIds !== null &&
      endDate >= startDate
    ) {
      try {
        const formData = new FormData();
        formData.append("user_id", userIds);
        // Assuming resData[0].filename is a comma-separated string of filenames
        const filenames = resData[0].filename
          .split(",")
          .map((filename) => filename.trim());

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getDate().toString().padStart(2, "0");
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");

        // Concatenate date and time in the desired format
        const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const imageURIs = [];

        for (const filename of filenames) {
          try {
            const imgurl = IMG_URL;
            const uri = `${imgurl}${filename}`;

            // Push the URI to the array
            imageURIs.push(uri);
          } catch (error) {
            console.error("Error generating image URI:", error);
            // Handle errors generating URIs here if needed
          }
        }

        // Now use the fetched URIs to fetch images as blobs and append them to FormData
        for (const uri of imageURIs) {
          try {
            const response = await fetch(uri);
            if (!response.ok) {
              throw new Error(`Failed to fetch image: ${uri}`);
            }
            const blob = await response.blob();

            // Generate a unique filename
            const uniqueFilename = generateUniqueFilename(uri);
            const filename = `${currentDateTime}-${uniqueFilename}.jpg`;

            const image = {
              uri: uri,
              name: filename,
              type: "image/jpeg", // Adjust the type based on your file type
            };

            formData.append("file[]", image as any);
          } catch (error) {
            console.error("Error fetching image:", error);
            // Handle errors fetching individual images here if needed
          }
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
        formData.append("addr_id", addrId); // Ensure addrId is a number
        formData.append("approx_weight", resData[0].total_weight);
        formData.append("prod_id", resData[0].prod_id);
        // console.log(parseInt(addrId));

        console.log("formdata:-", formData);

        const apiUrl =
          `${BASE_URL}/auctionOrder_api.php?action=insert`;
        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
          // No need to specify Content-Type; FormData will set it automatically
        });

        if (response.ok) {
          console.log("Auction created successfully!");
          ToastAndroid.showWithGravity(
            "Auction Created successfully",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'T1Screen1' }],
            })
          );
          navigation.navigate("Tab1", { screen: "T1Screen1" });
        } else {
          console.error("Failed to create auction.");
        }

        const data = await response.json();
        // Handle response data as needed
        console.log("response:", data);
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
      }
    } else {
      Alert.alert("Please fill all the necessary fields.");
    }
  };


  // const [images1, setImages1] = useState([]);

  // useEffect(() => {
  //   if (resData[0] && resData[0].filename) {
  //     const imageUrls = resData[0].filename.split(",").map(filename => imgurl + filename.trim());
  //     setImages1(imageUrls);
  //   }
  // }, [resData[0]]);

  const onRefresh = () => {
    fetchData1();
    fetchData();
    getData();
    fetchData1();
  };

  return (
    <>
      <DisplayAllAddresses visible={isAddressChooseModalDisplay} onClose={handleaddresscloseModal} addrseter={handleaddressetr} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0000ff"]}
            tintColor="#0000ff"
          />
        }
      >
        <View style={styles.container}>
          {resData && resData.length > 0 && (
            <View style={styles.itemContainer}>
              <View style={{...styles.imageContainer,}}>

                <ScrollView horizontal={true} pagingEnabled={true}>
                  {resData[0].filename &&
                    resData[0].filename
                      .split(",")
                      .map((imageUrl, index) => (
                        <Image
                          key={index}
                          style={styles.image}
                          source={{ uri: imgurl + imageUrl }}
                        />

                      ))}
                </ScrollView>
                

                {/* <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 10 }}>
      <ImageSlider
        loopBothSides
        autoPlayWithInterval={2000}
        images={images1}
        customSlide={({ index, item, style, width }) => (
          <View key={index} style={[style]}>
            <Image source={{ uri: item }} style={{ width: 500, height: 300 }} />
          </View>
        )}
        customButtons={(position, move) => (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {images1.map((image, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  underlayColor="#ccc"
                  onPress={() => move(index)}
                  style={{ margin: 5, padding: 5, borderRadius: 5, backgroundColor: position === index ? '#3399ff' : '#ccc' }}
                >
                  <Text style={{ color: position === index ? '#fff' : '#000' }}>
                    {index + 1}
                  </Text>
                </TouchableHighlight>
              );
            })}
          </View>
        )}
      />
    </View>   */}
              </View>

              <View>
                <View style={styles.container2}>
                  <Text style={styles.heading}>Product Detail : </Text>
                  <View style={styles.detailContainer}>
                    <View style={styles.column}>
                      <Text style={[styles.itemText, styles.leftText]}>PRODUCT:</Text>
                      <Text style={[styles.itemText, styles.leftText]}>PRICE:</Text>
                      <Text style={[styles.itemText, styles.leftText]}>WEIGHT:</Text>
                      <Text style={[styles.itemText, styles.leftText]}>CART ID:</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={[styles.itemText, styles.rightText]}>{resData[0].p_name}</Text>
                      <Text style={[styles.itemText, styles.rightText]}>{resData[0].price}</Text>
                      <Text style={[styles.itemText, styles.rightText]}>{resData[0].weight}</Text>
                      <Text style={[styles.itemText, styles.rightText]}>{resData[0].cart_id}</Text>
                    </View>
                  </View>

                  <Text style={styles.heading1}>
                    Discription :
                  </Text>

                  <Text style={styles.heading2}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptatum architecto, expedita vitae velit, minus commodi
                    distinctio consequatur doloremque suscipit similique enim soluta
                    reiciendis alias totam. Dolorem quibusdam aut officiis adipisci!
                  </Text>

                  <Text style={styles.heading3}>
                    Schedule Date :
                  </Text>


                  <View style=
                    {{
                      flexDirection: "column",
                      marginBottom: 25,
                      alignItems: 'flex-start'
                    }}
                  >
                    <View style={styles.row}>
                      <View style={styles.flexItem}>
                        <Text style={styles.date}>{startDate}</Text>
                      </View>
                      <View style={styles.flexItem}>
                        <FontAwesome
                          name="calendar"
                          style={styles.icon}
                          onPress={() => setShowPicker1(true)}
                        />
                      </View>
                    </View>
                    {showPicker1 && (
                      <DateTimePicker
                        value={selectedDate1}
                        mode="date"
                        display="default"
                        minimumDate={new Date()}
                        onChange={onDateChange1}
                      />
                    )}


                    <View style={styles.row}>
                      <View style={styles.flexItem}>
                        <Text style={styles.date}>{endDate}</Text>
                      </View>
                      <View style={styles.flexItem}>
                        <FontAwesome
                          name="calendar"
                          style={styles.icon}
                          onPress={() => setShowPicker(true)}
                        />
                      </View>
                    </View>
                    {showPicker && (
                      <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        minimumDate={today}
                        onChange={onDateChange}
                      />
                    )}



                    <View style={styles.row}>
                      <View style={styles.flexItem}>
                        <Text style={styles.date}>
                          {address ? (
                            `${address.city_name}, ${address.state_name}`
                          ) : (
                            'Pick Address'
                          )}
                        </Text>
                      </View>
                      <View style={styles.flexItem}>
                        <EvilIcons
                          name="location"
                          color="black"
                          size={28}
                          onPress={handleaddresscloseModal}
                          style={styles.icon}
                        />
                      </View>
                    </View>
                  </View>
                </View>

              </View>

              {/* <Text>{JSON.stringify(resData[0])}</Text> */}




            </View>
          )}
        </View>
      </ScrollView>


      {/* <Button title="Set Current Location " onPress={getCurrentPlace} /> */}
    
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}  onPress={createAuction} >Create Auction</Text>
     </TouchableOpacity>
   
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  fullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container1: {
    flex: 1,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },

  itemContainer: {
    marginBottom: 20,
  },
  // itemText1: {
  //   fontSize: 18,
  //   marginBottom: 5,
  //   alignSelf: "center",
  //   fontWeight: "500",
  // },
  imageContainer: {
    flexDirection: "row",
  },
  image: {
    width: 500,
    height: 300,
    borderRadius: 5,
    padding:20,
  },

  container2: {

    backgroundColor: '#e6e6e6',
    margin: 15,
    padding: 15,
    borderWidth: 0.8,
    borderRadius: 1,

  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 30,


  },

  flexItem: {
    flex: 1,
  },

  date: {
    fontWeight: 'bold',
    color: 'darkgray',
    fontSize: 18,
  },

  icon: {
    fontSize: 25,
    // color: '#3498db',
    color:'#00457E'

  },


  heading: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'left',
  },

  heading1: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'left',
  },

  heading2: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'left',
    lineHeight: 25,
  },

  heading3: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'left',
  },


  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },

  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  leftText: {
    // color: '#3399ff',
    fontWeight: 'bold',
    color: 'darkgray',
  },
  rightText: {
    color: 'black',
    fontWeight: '500',
  },

  button: {
    backgroundColor: '#00457E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 3, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default T3Screen4;
