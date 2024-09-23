import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Modal, TouchableOpacity, StyleSheet, TextInput, Keyboard, Pressable, Image, ScrollView, TouchableWithoutFeedback, ToastAndroid, Alert } from "react-native";
import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import ResolveImagePost from "./ResolveImagePost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import DisplayAllAddresses from "../addressModal/DisplayAllAdresses";
import { getApiResponse } from "../../../Navigation/Tab3/functions";
import { AuthContext } from "../../../redux/ContextApi/UserAuthProvider";
import GoodModal from "../../Credential/GoodModal";
// import { MainChats } from "../../../Navigation/Tab1/T1Screen1";
import { MainChats1 } from "../../../Navigation/Tab1/OrderBuy/MainChats1";
import Product from "../../OrderImage/Product";
import GroupChatModal from "../../../Navigation/Tab5_buy/GroupChatModal";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import LoginModal from "../../Credential/LoginModal";
const imgurl = "https://shreddersbay.com/API/uploads/";

const SearchModalContent = ({ closeModal, visible, navigation, dataforsearch }) => {
  const [searchText, setSearchText] = useState("");
  const [searchLocationText, setSearchLocationText] = useState("");
  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password, isloginModalVisible } = state;

  const textInputRef = useRef(null); // Ref for TextInput
  const [orderData, setOrderData] = useState([]);
  const [isSearchModalContentisDisplay, setIsSearchModalContentisDisplay] = useState(false);
  const [setselectedObjforSearch, setSetselectedObjforSearch] = useState(null);

  const handleSearch = () => {
  
    
    console.log("with location search text doing nothing =>",searchText)
    getOrderResponse(searchText)
    Keyboard.dismiss();

  };
  const handleSearchLocation = () => {
    // Implement your search logic here
    console.log("Searching for location:", searchLocationText);
    setSearchLocationText(searchLocationText)
    // You can add logic here to handle the search functionality
    Keyboard.dismiss(); // Dismiss keyboard after search
  };

  const handleFocusTextInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus(); // Focus on TextInput
    }
  };
  const [isAllAddressModalVisible, setIsAllAddressModalVisible] = useState(false);
  const [localAddresses, setLocalAddresses] = useState([]);
  const getAddressFromLocalStorage = async () => {
    try {
      const addresses = await AsyncStorage.getItem("addresses");
      if (addresses !== null) {
        console.log("addresses:=", addresses);
        setLocalAddresses(JSON.parse(addresses));
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  const getPickChooseAddressfromAddressModal = (addr) => {
    console.log("Choosen address=>", addr);
    setSearchLocationText(addr.address)
    // handleSearchLocation();
    setCurrentAddress(addr)

  }
  const filterOrderData = (orders, searchCriteria) => {
    if (typeof searchCriteria === 'object' && searchCriteria !== null) {
      const { state_name, country_name, landmark } = searchCriteria;
  
      return orders.filter(order => {
        const stateMatch = state_name && order.state_name 
          ? order.state_name.toLowerCase() === state_name.toLowerCase()
          : false;
        const countryMatch = country_name && order.country_name 
          ? order.country_name.toLowerCase() === country_name.toLowerCase()
          : false;
        const landmarkMatch = landmark && order.landmark 
          ? order.landmark.toLowerCase() === landmark.toLowerCase()
          : false;
  
        return stateMatch || countryMatch || landmarkMatch;
      });
    } else if (typeof searchCriteria === 'string') {
      const lowerCaseSearch = searchCriteria.toLowerCase();
  
      return orders.filter(order => {
        const pNameMatch = order.p_name 
          ? order.p_name.toLowerCase().includes(lowerCaseSearch)
          : false;
        const landmarkMatch = order.landmark 
          ? order.landmark.toLowerCase().includes(lowerCaseSearch)
          : false;
        const countryNameMatch = order.country_name 
          ? order.country_name.toLowerCase().includes(lowerCaseSearch)
          : false;
         const stateNameMatch = order.state_name 
          ? order.state_name.toLowerCase().includes(lowerCaseSearch)
          : false;
          const cityNameMatch = order.city_name 
          ? order.city_name.toLowerCase().includes(lowerCaseSearch)
          : false;
  
        return pNameMatch
         || landmarkMatch || countryNameMatch || stateNameMatch || cityNameMatch;
      });
    } else {
      // Return all orders if searchCriteria is neither object nor string
      return orders;
    }
  };
  
  
  
  
  const getOrderResponse = async (searchCriteria) => {
    try {
      // Encode URI components to handle special characters in URLs
      const country = encodeURIComponent("");
      const city = encodeURIComponent("");
      const userId = encodeURIComponent(userIdApp || "");
  
      // Construct the URL with encoded parameters
      const url = `https://shreddersbay.com/API/orders_api.php?action=select&country=${country}&city=${city}&userId=${userId}`;
  
      // Fetch data from the API using the constructed URL
      const data = await getApiResponse(url);
  
      // Log the URL and received data for debugging
      console.log("Order URL:", url);
      console.log("Order data:", data);
  
      // Filter the data based on the search criteria
      const filteredData = filterOrderData(data, searchCriteria);
  
      // Update the component state with the filtered data
      setOrderData(filteredData);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.log("Error fetching order data:", error);
    }
  };
  
  // const getOrderResponse = async () => {
  //   try {
  //     // Encode URI components to handle special characters in URLs
  //     const country = encodeURIComponent("");
  //     const city = encodeURIComponent("");
  //     // const country = encodeURIComponent(currentAddress?.country || currentAddress?.country_name || "");
  //     // const city = encodeURIComponent(currentAddress?.city || currentAddress?.city_name || "");
  //     const userId = encodeURIComponent(userIdApp || "");

  //     // Construct the URL with encoded parameters
  //     const url = `https://shreddersbay.com/API/orders_api.php?action=select&country=${country}&city=${city}&userId=${userId}`;

  //     // Fetch data from the API using the constructed URL
  //     const data = await getApiResponse(url);

  //     // Log the URL and received data for debugging
  //     console.log("Order URL:", url);
  //     // console.log("Order data:", data);

  //     // Update the component state with the fetched data
  //     console.log("search order data =>>>",data);
  //     setOrderData(data);
  //   } catch (error) {
  //     // Handle any errors that occur during the API request
  //     console.log("Error fetching order data:", error);
  //   }
  // };

  useEffect(() => {
    getOrderResponse(dataforsearch);
    getAddressFromLocalStorage();
  }, [])
  const [currentAddress, setCurrentAddress] = useState(null);

  const handleCancel = async (addr_id) => {
    // Implement cancel logic here (e.g., remove address from list or perform other actions)
    console.log(`Cancel address with ID: ${addr_id}`);
    try {
      // Get the current addresses from AsyncStorage
      const addresses = await AsyncStorage.getItem("addresses");
      if (addresses !== null) {
        // Parse the addresses JSON
        const parsedAddresses = JSON.parse(addresses);

        // Find the index of the address with the matching addr_id
        const indexToRemove = parsedAddresses.findIndex(item => item.addr_id === addr_id);
        if (indexToRemove !== -1) {
          // Remove the address from the array
          parsedAddresses.splice(indexToRemove, 1);

          // Update AsyncStorage with the modified array
          await AsyncStorage.setItem("addresses", JSON.stringify(parsedAddresses));

          // Optionally, update the local state or trigger a re-render
          setLocalAddresses(parsedAddresses);
        }
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };
  const [imagename, setImagename] = useState('');
  const [booking_id, setbookingId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [detaildata, setdetaildata] = useState([])
  const handleDetailPress = async (bookingId: number, filename: string) => {
    setImagename(filename);
    console.log(filename);
    setbookingId(bookingId);
    setModalVisible(!modalVisible);
    console.log("booking_id", bookingId);
    try {
      const formdata = new FormData();
      formdata.append("booking_id", bookingId.toString());

      const response = await fetch(
        "https://shreddersbay.com/API/orders_api.php?action=select_id",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            // Add other headers if needed
          },
          body: formdata,
        }
      );

      if (response.ok) {
        const details = await response.json();
        // Handle the received data, navigate to another screen, etc.
        // For example:
        // console.log("getting order detail Data:=>",details);
        setdetaildata(details);
        console.log("Detail Data:", details);
      } else {
        // Handle error
        console.error("Error fetching details:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error:", error);
    }
  };
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
  const [isAllBuyCurrentOrderModalVisible, setIsAllBuyCurrentOrderModalVisible] = useState(false);
  const [acceptData, setacceptData] = useState([]);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [fromChatUserIdFbse, setFromChatUserIdFbse] = useState("");
  const [toChatUserEmailFbse, setToChatUserEmailFbse] = useState("");
  const [toChatUserNameFbse, setToChatUserNameFbse] = useState("");
  const [toChatUserIdFbse, setToChatUserIdFbse] = useState("");
  const [toChatUserMobileFbse, setToChatUserMobileFbse] = useState("");
  const [users, setUsers] = useState([]);

  const handleBuyPressOnMOdal = async (bookingId: any, getOrderResponse: any) => {
    // console.log("we will see later ....");

    try {
      const formdata = new FormData();
      formdata.append("booking_id", bookingId);
      formdata.append("user_id", userIdApp);

      const response = await fetch(
        "https://shreddersbay.com/API/orders_api.php?action=accept",
        {
          method: "POST",
          headers: {
            "Content-type": "multipart/form-data",
          },
          body: formdata,
        }
      );

      if (response.ok) {
        const aceptData = await response.json();
        setacceptData(aceptData);
        // Process or set the acceptData if needed
        console.log("Accept API request successful");
        // getOrderResponse();
      } else {
        console.error("Accept API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleBuyPress = () => {
    if (((gUserCred !== null && typeof gUserCred === 'object') || (userCred !== null && typeof userCred === 'object')) && userIdApp !== null) {
      // navigation.navigate("myorder");
      // Assuming detaildata is already fetched and logged

      // Check if booking_id exists in the first item of detaildata
      if (detaildata.length > 0) {
        if (detaildata[0].hasOwnProperty('booking_id') && detaildata[0].booking_id !== null) {
          console.log("selectedGroup|=>", selectedGroup);
          if (selectedGroup !== null) {
            setIsGroupModalVisible(!isGroupModalVisible)
          } else {
            ToastAndroid.showWithGravity(
              "There is no bidding group",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            setIsAllBuyCurrentOrderModalVisible(!isAllBuyCurrentOrderModalVisible);
          }
        } else {
          console.log("selectedGroup:=>", selectedGroup);
          if (selectedGroup !== null) {
            setIsGroupModalVisible(!isGroupModalVisible)
          } else {
            ToastAndroid.showWithGravity(
              "There is no bidding group",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            setIsAllBuyCurrentOrderModalVisible(!isAllBuyCurrentOrderModalVisible);
          }
        }
      } else {
        console.error('detaildata array is empty');
      }

      handleBuyPressOnMOdal(booking_id, getOrderResponse);
    } else {
      showCustomAlert();
    }
  };
  const getUsers1 = async () => {

    try {
      const email = await AsyncStorage.getItem("femail");
      const fuserid = await AsyncStorage.getItem("fid");

      console.log("Current user's email:", email);
      console.log("firebase form chat user Id:fuser-", fuserid);

      if (email) {
        setFromChatUserIdFbse(fuserid);
        const firebaseDB = getFirestore();
        const userCollection = collection(firebaseDB, "users");
        const usersQuery = query(userCollection, where("email", "!=", email));

        // console.log("Users query:", usersQuery); // Check the users query

        const querySnapshot = await getDocs(usersQuery);
        const userData = querySnapshot.docs.map((documentSnapshot) => ({
          id: documentSnapshot.id,
          fullName: documentSnapshot.get("name"),
          mobile: documentSnapshot.get("mobile"),
          email: documentSnapshot.get("email"),
          ...documentSnapshot.data(),
        }));

        console.log("Fetched users data:", userData); // Check the fetched users data
        // console.log("firebase form chat user Id:fromchatuseridfbse-",fromChatUserIdFbse);

        console.log("this is detail data:--", detaildata);

        const detaildataEmail = detaildata[0]?.email;

        // Finding the object in userData with a matching email
        const matchingUser = userData.find(
          (user) => user.email === detaildataEmail
        );

        if (matchingUser) {
          // Perform your action here with the matching user object
          console.log("Found matching user:", matchingUser);
          setToChatUserEmailFbse(matchingUser.email);
          setToChatUserNameFbse(matchingUser.fullName);
          setToChatUserIdFbse(matchingUser.id);
          setToChatUserMobileFbse(matchingUser.mobile);
          // setIsModalVisible2(true)

          // Example: Access properties of the matching user object
          // e.g., matchingUser.id, matchingUser.name, matchingUser.whatever
          // Your action here...
        } else {
          console.log("No matching user found");
        }

        setUsers(userData);
      }
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };
  const showCustomAlert = () => {
    Alert.alert(
      "Confirmation",
      "You have to Login Or Signup",
      [
        {
          text: "No",
          onPress: () => {
            // Do something when "No" is pressed
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // Do something when "Yes" is pressed
            // navigation.navigate("LoginModal");
            setIsLoginModalVisible(!isloginModalVisible)
            setModalVisible(!modalVisible);

          },
        },
      ],
      { cancelable: false }
    );
  };
  const getUsers = async () => {
    if (((gUserCred !== null && typeof gUserCred === 'object') || (userCred !== null && typeof userCred === 'object')) && userIdApp !== null) {
      try {
        const email = await AsyncStorage.getItem("femail");
        const fuserid = await AsyncStorage.getItem("fid");

        console.log("Current user's email:", email);
        console.log("firebase form chat user Id:fuser-", fuserid);

        if (email) {
          setFromChatUserIdFbse(fuserid);
          const firebaseDB = getFirestore();
          const userCollection = collection(firebaseDB, "users");
          const usersQuery = query(userCollection, where("email", "!=", email));

          // console.log("Users query:", usersQuery); // Check the users query

          const querySnapshot = await getDocs(usersQuery);
          const userData = querySnapshot.docs.map((documentSnapshot) => ({
            id: documentSnapshot.id,
            fullName: documentSnapshot.get("name"),
            mobile: documentSnapshot.get("mobile"),
            email: documentSnapshot.get("email"),
            ...documentSnapshot.data(),
          }));

          console.log("Fetched users data:", userData); // Check the fetched users data
          // console.log("firebase form chat user Id:fromchatuseridfbse-",fromChatUserIdFbse);

          console.log("this is detail data:--", detaildata);

          const detaildataEmail = detaildata[0]?.email;

          // Finding the object in userData with a matching email
          const matchingUser = userData.find(
            (user) => user.email === detaildataEmail
          );

          if (matchingUser) {
            // Perform your action here with the matching user object
            console.log("Found matching user:", matchingUser);
            setToChatUserEmailFbse(matchingUser.email);
            setToChatUserNameFbse(matchingUser.fullName);
            setToChatUserIdFbse(matchingUser.id);
            setToChatUserMobileFbse(matchingUser.mobile);
            setIsModalVisible2(true);

            // Example: Access properties of the matching user object
            // e.g., matchingUser.id, matchingUser.name, matchingUser.whatever
            // Your action here...
          } else {
            console.log("No matching user found");
          }

          setUsers(userData);
        }
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
    } else {
      showCustomAlert();
    }
  };
  const togglemodal2 = () => {
    setIsModalVisible2(!isModalVisible2);
  };

  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.container}>
        <DisplayAllAddresses visible={isAllAddressModalVisible} onClose={() => { setIsAllAddressModalVisible(!isAllAddressModalVisible) }} addrseter={getPickChooseAddressfromAddressModal} navigation={navigation} />

        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <AntDesign name="arrowleft" size={35} />
          </TouchableOpacity>
          <TextInput
            ref={textInputRef}
            placeholder="Search your scrap here..."
            clearButtonMode="always"
            autoCapitalize="none"
            autoCorrect={true}
            keyboardType="web-search"
            style={styles.input}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={handleSearch} // Trigger search on keyboard search button press
          />
          <TouchableOpacity style={styles.searchIcon} onPress={() => { setIsAllAddressModalVisible(!isAllAddressModalVisible) }}>
            <EvilIcons name="location" size={30} color={"black"} />
          </TouchableOpacity>
        </View>


        <View style={{ flex: 1, }}>
          {orderData.length ?

            <ScrollView>
              {orderData && orderData.map((item, index) => (


                <Pressable key={index} style={styles.container5}
                  onPress={() =>
                    handleDetailPress(item.booking_id, item.filename)
                  }
                >
                  <View
                    style={styles.card}
                  >
                    <View
                      style={styles.card_image}
                    >
                      <Image source={{ uri: imgurl + item.filename.split(",")[0] }} style={styles.card_image_style}
                      />
                    </View>
                    <View
                      style={styles.card_content}
                    >
                      <View style={{ flexDirection: "column", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>{item ? item.p_name : ""}</Text>
                        <Text style={{ fontSize: 16, color: "darkgray", marginBottom: 4 }}>₹{item ? item.approx_price : ""}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                          <EvilIcons size={25} name="location" color={"black"} />
                          <Text style={{ marginLeft: 6 }}>{item ? item.address : ""}</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>{item ? item.country_name : ""}</Text>
                      </View>

                    </View>

                  </View>


                </Pressable>

              ))}

            </ScrollView>

            : <NotFound />}

          <Modal
            // animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.centeredView}>


                <View >
                  {/* <Text>
                  {JSON.stringify(detaildata)}</Text> */}
                  {detaildata &&
                    detaildata.map((item, index) => (
                      <View key={index}>
                        <GoodModal closeModal={() => setModalVisible(!modalVisible)} visible={modalVisible} comp={<Product item={item} handlebuypress={handleBuyPress} getusers={getUsers} />} />
                      </View>
                    ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View>
              <MainChats1
                isModalVisible={isModalVisible2}
                toggleModal={togglemodal2}
                formchatUserIdFbse={fromChatUserIdFbse}
                tochatUserIdFbse={toChatUserIdFbse}
                tochatUserNameFbse={toChatUserNameFbse}
                toChatUserMobileFbse={toChatUserMobileFbse}
              />
            </View>
          </Modal>
          <GroupChatModal
            modalVisible={isGroupModalVisible}
            onClose={() => {
              setIsGroupModalVisible(!isGroupModalVisible);
              setSelectedGroup(null);
            }}
            group={selectedGroup}
          />
                  <LoginModal navigation={navigation} visible={isLoginModalVisible} setVisible={setIsLoginModalVisible} />

        </View>




      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    height: 55,
    marginHorizontal: 10,
  },
  container5: {
    height: 200, // Adjust as per your design
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: '#00457E',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "gray",
    borderRadius: 15,
    overflow: "hidden",
    paddingTop: 2,
  },
  card_image: {
    width: "40%",
    aspectRatio: 1, // Maintains aspect ratio (1:1)
    backgroundColor: 'blue',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  card_image_style: {
    flex: 1,
    // borderRadius: 15,
  },
  card_content: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: "darkgray",
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  country: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  pressableContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: "10%", // Adjust the margin as needed
  },
  text: {
    fontSize: 18,
    // marginTop: 40,
    fontWeight: "400"

  },
  image: {
    width: "100%",
    height: "100%",
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // marginBottom:50
    flexDirection: 'column',
    marginTop: -10,
  },
  centeredView: {
    flex: 1,
    marginTop: 10,
  },
});

export default SearchModalContent;


const NotFound = () => {
  return (
    <View style={styles.container1}>
      {/* <Text style={styles.text}>NOT Found</Text> */}
      <Image
        source={require("../../../assets/notfound.png")}
        style={styles.image}
      />
      {/* <Text style={styles.text}>NOT Found</Text> */}



    </View>
  );
};


