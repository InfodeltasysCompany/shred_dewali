import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Modal,
  TouchableWithoutFeedback,
  RefreshControl,
  Pressable,
  Alert,
  Dimensions,
  Linking,
  Platform,
  
} from "react-native";
import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
  useContext,
} from "react";
import { StatusBar } from 'expo-status-bar'
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/actions/dashAction";
import { StyleSheet } from "react-native";
// import {  } from 'react-native-gesture-handler';
import { EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import EntypoIcon from "react-native-vector-icons/Entypo"; // Import the Entypo icon
import Login from "../../components/Credential/Login";
import LogoSlider from "../../components/OrderImage/LogoSlider";
import Aluminium from "../../components/OrderImage/Aluminium";
import CopperImage from "../../components/OrderImage/CopperImage";
import T1Screen1modal1 from "./T1Screen1modal1";
// import ImageSlider1 from "../../components/OrderImage/ImageSlider";
import CaroselImage from "../../components/OrderImage/ImageSlider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import * as Updates from "expo-updates";

import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getApiResponse, getCurrentLocation, postData } from "../Tab3/functions";
import GoodModal from "../../components/Credential/GoodModal";
import Product from "../../components/OrderImage/Product";
import { AuthContext } from "../../redux/ContextApi/UserAuthProvider";
import LoginModal from "../../components/Credential/LoginModal";
import HandleAddAddressModal from "../../components/Modal/addressModal/DisplayAllAdresses";
import SearchModal from "../../components/Modal/Search/SearchModal";
import SearchModalContent from "../../components/Modal/Search/SearchModalContent";

const T1Screen1 = ({ navigation }) => {
  const imgurl = "https://shreddersbay.com/API/uploads/";
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detaildata, setdetaildata] = useState<any | number>(null);

  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password,isloginModalVisible } = state;
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)

  // const setIsloginModalVisible=()=>{
  //   setState(prevState => ({
  //     ...prevState,
  //     isloginModalVisible:!isloginModalVisible,

      
  //   }));
  // }
  const dispatch = useDispatch();

  // Access data and error from Redux store
  const data = useSelector((state: any) => state.dashboard.data);
  const [auctionData, settAuctionData] = useState([]);
  const [orderData, settOrderData] = useState([])
  const error = useSelector((state: any) => state.dashboard.error);
  const [userfilterdata, setuserfilterdata] = useState([]);
  const [auctionFiteredData, setAuctionFiteredData] = useState([]);
  
  const getPickChooseAddressfromAddressModal =(addr)=>{
    console.log("Choosen address=>",addr);
    setCurrentAddress(addr)
  }

  const handleAddresModalOpen = () => {
    setIsAddressModalOpen(!isAddressModalOpen)
    // locationSetup();
  }
  useEffect(() => {
    // Define a function to fetch data
    const fetchDataAndCheck = () => {
      dispatch(fetchData());
    };

    // Call the function initially
    fetchDataAndCheck();

    // If data is empty, set up an interval to keep fetching data
    if (data.length === 0) {
      const intervalId = setInterval(fetchDataAndCheck, 500); // Adjust the interval as needed

      // Clean up the interval when the component unmounts or when data is not empty
      return () => clearInterval(intervalId);
    } else {
      // const filteredArray = data.filter((item) => item.user_id != user_id);
      const filteredArray = data.filter((item) => item.user_id != userIdApp);

      setuserfilterdata(filteredArray);

      const filteredArray1 = auctionData.filter((item) => item.user_id != userIdApp);
      setAuctionFiteredData(filteredArray1);
      // console.log("UseridApp==>",userIdApp)
    }
  }, [data, dispatch]); // Add data as a dependency to re-run useEffect when data changes
  // /////////////////////////////
  // const [showModal, setshowModal] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchData());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  //////////////////////////////////
  const [booking_id, setbookingId] = useState<number | null>(null);
  const [imagename, setImagename] = useState("");
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
        setdetaildata(details);
        console.log("Detail Data:", details);
      } else 
      {
        // Handle error
        console.error("Error fetching details:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error:", error);
    }
  };
  const handleAuctionDetailPres = async (
    auctionId

  ) => {
    console.log("auctionId:-" + auctionId);

    const apiUrl =
      "https://shreddersbay.com/API/auctionOrder_api.php?action=select_id";
    const formdata = new FormData();
    formdata.append("auction_id", auctionId.toString());
    const auctionDetailData = await postData(formdata, apiUrl);
    console.log("auctionDetailData", auctionDetailData);
    const auctiondetail = auctionDetailData[0];
    console.log("images:-" + auctiondetail.filename)
    setImagename(auctiondetail.filename);
    setModalVisible(!modalVisible);
    setdetaildata(auctionDetailData);
  };

  const handleBuyPress = () => {
    if (((gUserCred !== null && typeof gUserCred === 'object') || (userCred !== null && typeof userCred === 'object')) && userIdApp !== null) {
      navigation.navigate("myorder");
      handleBuyPressOnMOdal(booking_id,getOrderResponse);
    } else {
      showCustomAlert();
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
  const getAuctionResponse = async () => {
   try {
    const country = encodeURIComponent("");
    const city = encodeURIComponent("");
    // const country = encodeURIComponent(currentAddress?.country || currentAddress?.country_name || "");
    // const city = encodeURIComponent(currentAddress?.city || currentAddress?.city_name || "");
    const userId = encodeURIComponent(userIdApp || "");

    const url1 = `https://shreddersbay.com/API/auctionOrder_api.php?action=select&country=${country}&city=${city}&userId=${userId}`
    const url =
      "https://shreddersbay.com/API/auctionOrder_api.php?action=select";
    
      // console.log("calling order1")
      const data = await getApiResponse(url1);
      console.log("Auction urlis:=.",url1)
      // console.log("auctiondata", data);
      settAuctionData(data);
   
   
    
   } catch (error) {
    console.log("the auction calling error is =>",error)
   }


  }
  // const getOrderResponse = async () => {
  //   try {
  //     const country = encodeURIComponent(currentAddress.country||""||currentAddress.country_name);
  //   const city  = encodeURIComponent(currentAddress.city||""||currentAddress.city_name);
  //   const userId = encodeURIComponent(userIdApp || "");
  //   console.log("userid"+userId +"city"+city +"country"+country);
  //   const url1 = `https://shreddersbay.com/API/orders_api.php?action=select&country=${country}&city=${city}&userId=${userId}`
  //   // https://shreddersbay.com/API/orders_api.php?action=select&userId=
  //       const url =
  //     "https://shreddersbay.com/API/orders_api.php?action=select";
  //   const data = await getApiResponse(url1);
  //   console.log("order urlis:=.",url1)
  //   console.log("orderdata", data);
  //   settOrderData(data);
  //   } catch (error) {
  //     console.log("the order error is =>",error);
  //   }


  // }
  const getOrderResponse = async () => {
    try {
      // Encode URI components to handle special characters in URLs
      const country = encodeURIComponent("");
    const city = encodeURIComponent("");
      // const country = encodeURIComponent(currentAddress?.country || currentAddress?.country_name || "");
      // const city = encodeURIComponent(currentAddress?.city || currentAddress?.city_name || "");
      const userId = encodeURIComponent(userIdApp || "");
  
      // Construct the URL with encoded parameters
      const url = `https://shreddersbay.com/API/orders_api.php?action=select&country=${country}&city=${city}&userId=${userId}`;
  
      // Fetch data from the API using the constructed URL
      const data = await getApiResponse(url);
  
      // Log the URL and received data for debugging
      console.log("Order URL:", url);
      // console.log("Order data:", data);
  
      // Update the component state with the fetched data
      settOrderData(data);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.log("Error fetching order data:", error);
    }
  };
  
  const [currentAddress, setCurrentAddress] = useState(null);
    const [currentAddress1, setCurrentAddress1] = useState(null);

  const locationSetup = async () => {
    const address = await getCurrentLocation();
    setCurrentAddress(address);
    console.log("address=>", address)

  }
   const locationSetupModal = async () => {
    setIsAddressModalOpen(prevState => !prevState)
    const address = await getCurrentLocation();
    setCurrentAddress1(address);

    
    console.log("address=>", address)

  }
  
  useEffect(()=>{
if(!currentAddress){
  locationSetup();
}
  },[currentAddress])
  useEffect(() => {
    if(currentAddress==null){
      locationSetup();
    }
    locationSetup();
    getAuctionResponse();
    getOrderResponse();
  }, []);
  useEffect(() => {
    if(currentAddress==null){
      locationSetup();
    }
    getAuctionResponse();
    getOrderResponse();
  }, [currentAddress]);
  useEffect(()=>{
    getAuctionResponse();
    getOrderResponse();
  },[currentAddress,userIdApp])

  const [acceptData, setacceptData] = useState([]);
  const handleBuyPressOnMOdal = async (bookingId: any,getOrderResponse:any) => {
    console.log("we will see later ....");

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
        getOrderResponse();
      } else {
        console.error("Accept API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const [user_id, setUserIds] = useState(null); // User ID
  // const [userDataLOCAL_STORAGE, setUserDataLocalStorage] = useState(null);
  const [isandroidUpdateModalVisible, setIsandroidUpdateModalVisible] =
    useState(false);
  const setUpdateModal = async () => {
    setIsandroidUpdateModalVisible(!isandroidUpdateModalVisible);
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  };

  useEffect(() => {
   
    async function onFetchUpdateAsync() {
      // const osName = Platform.OS;
      // console.log(`The os name is ${osName}`);

      try {
        const update = await Updates.checkForUpdateAsync();

        // if (update.isAvailable && Platform.OS === 'android') {
        if (update.isAvailable) {
          //  await Updates.fetchUpdateAsync();
          //  await Updates.reloadAsync();
          setIsandroidUpdateModalVisible(!isandroidUpdateModalVisible);
        } else {
          setIsandroidUpdateModalVisible(false);
        }
      } catch (error) {
        // You can also add an alert() to see the error message in case of an error when fetching updates.
        console.log(`Error fetching latest Expo update: ${error}`);
      }
    }
    //////////////////////////////////////////////////
    const getAuctionData = () => {

    }

    getAuctionData();

    onFetchUpdateAsync();
  }, []);
  ///////////////////////////////
  const [fromChatUserIdFbse, setFromChatUserIdFbse] = useState("");
  const [toChatUserEmailFbse, setToChatUserEmailFbse] = useState("");
  const [toChatUserNameFbse, setToChatUserNameFbse] = useState("");
  const [toChatUserIdFbse, setToChatUserIdFbse] = useState("");
  const [toChatUserMobileFbse, setToChatUserMobileFbse] = useState("");
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const maxLength = 10;
  const togglemodal2 = () => {
    setIsModalVisible2(!isModalVisible2);
  };

  useEffect(() => {
    getUsers1();
  }, [fromChatUserIdFbse, detaildata]);

  const [users, setUsers] = useState([]);

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
  ///////////////////////////////////////slider//////////////////////////////////////

////////////////////search//////////////////////
const [searchtext, setSetsearchtext] = useState("");
const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
const onchangeSearch=(text)=>{
  setIsSearchModalVisible(true);
  setSetsearchtext(text)
} 
const onSeachModalclose=()=>{
  setIsSearchModalVisible(!isSearchModalVisible)
}
 ///////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#abcdef" />


      <View>
        <HandleAddAddressModal visible={isAddressModalOpen} onClose={handleAddresModalOpen} addrseter={getPickChooseAddressfromAddressModal} navigation={navigation} />
        <SearchModal closeModal={onSeachModalclose} visible={isSearchModalVisible} comp={<SearchModalContent/>}/>
         <LoginModal navigation={navigation} visible={isLoginModalVisible} setVisible={setIsLoginModalVisible} />

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
                      <GoodModal closeModal={() => setModalVisible(false)} visible={modalVisible} comp={<Product item={item} handlebuypress={handleBuyPress} getusers={getUsers} />} />
                    </View>
                  ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View>
            <MainChats
              isModalVisible={isModalVisible2}
              toggleModal={togglemodal2}
              formchatUserIdFbse={fromChatUserIdFbse}
              tochatUserIdFbse={toChatUserIdFbse}
              tochatUserNameFbse={toChatUserNameFbse}
              toChatUserMobileFbse={toChatUserMobileFbse}
            />
          </View>
        </Modal>
        <AskForAppUpdate
          isAndroidUpdateModal={isandroidUpdateModalVisible}
          setUpdateModal={setUpdateModal}
        />
      </View>

      <View style={styles.logo}>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.heading}>ShreddersBay</Text>
          </View>

          <Pressable style={{ justifyContent: "flex-end", alignItems: "flex-end", flexDirection: "row-reverse" }} onPress={locationSetupModal}>
            <Ionicons
              name="location-outline"
              style={{ fontSize: 25, fontWeight: "bold", color: "#00457E" }}
            />
            {currentAddress && (
              <>
                {/* <Text>{JSON.stringify(currentAddress)}</Text> */}
                <Text style={{ fontSize: 14, fontWeight: '500' }}>{currentAddress.city || currentAddress.city_name}</Text>
                {/* <Text style={{ fontSize: 14, fontWeight: '500' }}>{currentAddress.name ||currentAddress.area ||currentAddress.pin_code},  </Text> */}
              </>
            )}
          </Pressable>
        </View>
      </View>

      <View style={styles.container1}>
        {/* <TextInput
          placeholder="search"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={true}
          style={styles.searchbox}
          onFocus={()=>{
            setIsSearchModalVisible(true);
          }}
        /> */}
        <Pressable onPress={()=>{setIsSearchModalVisible(true)}}>
          <View style={styles.searchbox}>
            

        <Text style={{marginLeft:10,color:'gray'}}>search your scrap here...</Text>
          </View>
        </Pressable>

        <View style={[userIdApp ? { flexDirection: "row", marginLeft: 15, justifyContent: "center" } : { flexDirection: 'row', justifyContent: "center" }]}>
          {/* {!userIdApp &&(
            
          <TouchableOpacity>
            <View style={{...styles.heading1,}}>
              <Ionicons
                name="person-add"
                onPress={() => setIsLoginModalVisible(true)}
                size={30}
                color={"#00457E"}
              />
            </View>
          </TouchableOpacity>
          )} */}
          {/* <LoginModal navigation={navigation} visible={isLoginModalVisible} setVisible={setIsLoginModalVisible} /> */}
{/* 
          <TouchableOpacity>
            <View style={styles.heading1}>
              <FontAwesome
                name="shopping-cart"
                // name="bell-o"
                onPress={
                  () => {
                    // navigation.navigate("T2Screen1");
                  }
                }
                size={30}
                color={"#00457E"}
              />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView
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
            <CaroselImage />
          </View>
          <View>
            <LogoSlider navigation={navigation}/>
          </View>
          <View>
            <View style={styles.container3}>
              <Text style={styles.order}>Fresh Recommendations</Text>
            </View>

            <View style={styles.container5}>
              <View style={styles.card1}>
               
                  {orderData&&orderData.map((item,index)=>(
                    <View key={index} style={styles.card}>
                    <Pressable
                      onPress={() =>
                        handleDetailPress(item.booking_id, item.filename)
                      }
                    >
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: imgurl + item.filename }}
                          style={styles.image}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.textContainer2}>
                          {item.p_name}
                        </Text>
                        <Text style={styles.textContainer5}>
                          <FontAwesome
                            name="rupee"
                            style={{ fontSize: 15 }}
                          />{" "}
                          {item.price}
                        </Text>

                        <View>
                          
                        </View>
                        <Text style={styles.textContainer6}>
                          <EvilIcons
                            name="location"
                            style={{ fontSize: 15 }}
                          />{" "}
                          {/* {item && item.address.length > maxLength ? item.address.substring(0, maxLength) + '...' : item.address} */}
                          {item?item.country_name:item.city_name}

                        </Text>
                        <Text style={{...styles.textContainer6, marginLeft:16,textTransform: 'lowercase'}}>{item&&item.state_name}</Text>

                      </View>
                    </Pressable>
                  </View>
                  ))}
              </View>
            </View>
            {/* /////////////////////////////////////// auction data bind ////////////////////////////////////////////////////////////////// */}

            <View style={styles.container3}>
              <Text style={styles.order}>New Auction</Text>
            </View>
            <View style={styles.container5}>
              <View style={styles.card1}>
               
                  {auctionData&&auctionData.map((item,index)=>(
                      <View key={index} style={styles.card}>
                      <Pressable
                        onPress={() =>
                          handleAuctionDetailPres(item.auction_id)
                        }
                      >
                        <View style={styles.imageContainer}>
                          <Image
                            source={{
                              uri: imgurl + item.filename.split(",")[0],
                            }}
                            style={styles.image}
                          />
                        </View>

                        <View style={styles.textContainer}>
                          <Text style={styles.textContainer2}>
                            {item.p_name}
                          </Text>
                          <Text style={styles.textContainer5}>
                            <FontAwesome
                              name="rupee"
                              style={{ fontSize: 15 }}
                            />{" "}
                            {item.price}
                          </Text>
                          <Text style={styles.textContainer6}>
                            <EvilIcons
                              name="location"
                              style={{ fontSize: 15 }}
                            />{" "}
                            {/* {item.address.length > maxLength ? item.address.substring(0, maxLength) + '...' : item.address} */}
                            {item?item.country_name:item.city_name}
                            <Text style={styles.textContainer8}>{item &&  item.state_name}</Text>

                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  ))}
              </View>
            </View>

            {/* <Text>{JSON.stringify(data)}</Text> */}
          </View>

          
{/* 
          <View>
            <Aluminium />
          </View>

          <View>
            <CopperImage />
          </View> */}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image2: {
    width: 100,
    height: 100,
  },
  container123: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemContainer123: {
    marginBottom: 20,
  },
  imageContainer123: {
    flexDirection: "row",
  },
  image123: {
    width: 500,
    height: 200,
    marginRight: 10,
    borderRadius: 5,
  },
  imageContainer1: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  textContainer7: {
    borderWidth: 1,
    padding: 20,
    margin: 4,
    borderRadius: 4,
    borderColor: "#ddd",
  },

  centeredView: {
    flex: 1,
    marginTop: 10,
  },

  modalView: {
    // #666666
    margin: 2,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 50,
  },

  buttonClose: {
    position: "absolute",
    top: 20,
    right: 10,
    backgroundColor: "#cccc00",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
  },

  //

  heading1: {
    marginTop: 20,
    marginLeft: 15,
    margin:10,
  },

  accept: {
    fontSize: 20,
    color: "black",
    borderWidth: 1,
    borderRadius: 50,
    padding: 8,
    borderColor: "transparent",
    backgroundColor: "#ddd",
  },

  delete: {
    fontSize: 20,
    color: "#fff",
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    backgroundColor: "red",
  },

  detail: {
    fontSize: 20,
    color: "black",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 90,
    paddingHorizontal: 35,
    paddingVertical: 10,
    backgroundColor: "#cccc00",
  },

  image1: {
    width: 50,
    height: 50,
    marginRight: 8,
  },

  card1: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 10,
  },

  card: {
    width: "48%",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "lightgray",
    
  },

  textContainer: {
    padding: 10,
  },

  textContainer3: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },

 
  textContainer2: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    marginBottom: 5,
    fontFamily: 'sans-serif',
  },

  textContainer4: {
    fontSize: 15,
    color: "black",
    marginBottom: 5,
    marginRight: 5,
  },
  
  textContainer5: {
    fontSize: 15,
    color: "darkgray",
    marginBottom: 2,
  },
  textContainer6: {
    fontSize: 12,
    marginTop: 10,
    color: "gray",
    
    
  },

  textContainer8: {
    fontSize: 12,   
    color: "gray",
    
  },

  imageContainer: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },

  logo: {
    flexDirection: "row",
    // alignItems: 'center'
    // textAlign: 'center
  },

  container: {
    flex: 1,
    marginTop: 35,
    padding: 10,
    backgroundColor: "#00457E'",
  },

  container1: {
    marginBottom: 8,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: "#CCC",
    flexDirection: "row",
  },

  container2: {
    padding: 10,
    margin: 10,
    flexWrap: "wrap",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ccc",
  },

  scrollView: {
    flex: 1,
    backgroundColor: "white",
    // #e6e6e6
  },

  contentContainer: {
    alignItems: "center",
  },

  text1: {
    color: "black",
  },

  container3: {
    padding: 10,
  },

  container4: {},
  container5: {},

  scrollContent: {
    padding: 11,
  },

  order: {
    
    fontSize: 20,
    color: "#00457E",
    // fontFamily: 'sans-sarif',
    marginBottom: 20,
    marginTop: 20,
    fontWeight: "500",
  },


  tinyLogo: {
    width: 160,
    height: 160,
    marginRight: 8,
    padding: 5,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 20,
  },

  tinyLogo1: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },

  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00457E",
    alignItems: "center",
    marginTop: 8,
  },

  searchbox: {
 paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    borderBottomWidth: 1,
    width: 340,
    height: 50,
    justifyContent:'center',
  },
  image: {
    height: 100,
    width: 140,
    marginTop: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  userItem: {
    width: Dimensions.get("window").width - 50,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "column",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "lightcoral",
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,

    backgroundColor: "white",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightgray",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  updateModalView1: {
    flex: 1,
    justifyContent: "flex-end",
  },

  transparentTop: {
    flex: 1,
    backgroundColor: "transparent",
  },

  blackBottom: {
    height: "35%",
    backgroundColor: "white",
   
  },


  iconimg: {
    width: 100,
    height: 100,
    borderRadius: 20,
    margin: 10,
  },

  updateicon: {
    flex: 1,
    flexDirection: "row",
    gap: 15,
  },

  shreds: {
    fontSize: 30,
    fontWeight: "600",
    color: "black",
    marginTop: 8,
  },

  shredsbay: {
    fontSize: 20,
    color: "gray",
    marginTop: 8,
    marginRight: 10, // Changed from marginright to marginRight
  },

  text: {},

  updatebtn: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
export default T1Screen1;

export const MainChats: React.FC<{
  isModalVisible: boolean;
  toggleModal: () => void;
  formchatUserIdFbse: string;
  tochatUserIdFbse: string;
  tochatUserNameFbse: string;
  toChatUserMobileFbse: string;
}> = ({
  isModalVisible,
  toggleModal,
  formchatUserIdFbse,
  tochatUserIdFbse,
  tochatUserNameFbse,
  toChatUserMobileFbse,
}) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const firebaseDB = getFirestore(); // Get the Firestore instance

    useEffect(() => {
      const subscriber = onSnapshot(
        query(
          collection(
            firebaseDB,
            "chats",
            `${formchatUserIdFbse}_${tochatUserIdFbse}`,
            "messages"
          ),
          orderBy("createdAt", "desc")
        ),
        (querySnapshot) => {
          const allmessages: IMessage[] = [];
          querySnapshot.forEach((doc) => {
            const messageData = doc.data();
            allmessages.push({
              _id: doc.id,
              text: messageData.text,
              createdAt: new Date(messageData.createdAt),
              user: {
                _id: messageData.sendBy,
              },
            });
          });
          setMessages(allmessages);
        }
      );
      return () => subscriber();
    }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

    const onSend = useCallback(
      async (messages = []) => {
        const newMessage = messages[0];
        const messageToSend: IMessage = {
          ...newMessage,
          sendBy: formchatUserIdFbse,
          sendTo: tochatUserIdFbse,
          createdAt: Date.now(),
        };

        // Update the state by merging the new message with the existing messages array
        setMessages((previousMessages) => [...previousMessages, messageToSend]);

        // Add message to the sender's chat collection
        try {
          await addDoc(
            collection(
              firebaseDB,
              "chats",
              `${formchatUserIdFbse}_${tochatUserIdFbse}`,
              "messages"
            ),
            messageToSend
          );
        } catch (error) {
          console.error("Error sending message:", error);
        }

        // Add message to the receiver's chat collection
        try {
          await addDoc(
            collection(
              firebaseDB,
              "chats",
              `${tochatUserIdFbse}_${formchatUserIdFbse}`,
              "messages"
            ),
            messageToSend
          );
        } catch (error) {
          console.error("Error sending message to the receiver:", error);
        }
      },
      [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]
    );

    const closeModal = () => {
      toggleModal();
    };
    const openDialer = () => {
      Linking.openURL(`tel:${toChatUserMobileFbse}`);
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="arrow-back" style={{ fontSize: 30 }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 22, marginLeft: 10 }}>
                {tochatUserNameFbse}
              </Text>
            </View>

            <View style={{}}>
              <TouchableOpacity style={{}} onPress={openDialer}>
                <Ionicons name="call" style={{ fontSize: 25, marginRight: 10 }} />
              </TouchableOpacity>
            </View>
          </View>
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: formchatUserIdFbse,
            }}
          />
        </View>
      </Modal>
    );
  };

export const AskForAppUpdate: React.FC<{
  isAndroidUpdateModal: boolean;
  setUpdateModal: () => void;
}> = ({ isAndroidUpdateModal, setUpdateModal }) => {
  const handleUpdateModal =async()=>{
    const url ="https://play.google.com/store/apps/details?id=com.shreddersbay";
    try {
      const supported = await Linking.canOpenURL(url);
      if(supported){
        await Linking.openURL(url);
      }else{
        console.log(`Don't know how to Open Url: ${url}`);

      }
    } catch (error) {
      console.log(`Error occured while opening the url: ${error}`);

    }
  }
  // const handleUpdateModal = async () => {
  //   let url = "";

  //   if (Platform.OS === "android") {
  //     url = "https://play.google.com/store/apps/details?id=com.shreddersbay";
  //   } else if (Platform.OS === "ios") {
  //     url = "https://www.example.com/ios"; // Replace with your iOS URL
  //   }

  //   try {
  //     const supported = await Linking.canOpenURL(url);
  //     if (supported) {
  //       await Linking.openURL(url);
  //     } else {
  //       console.log(`Don't know how to Open Url: ${url}`);
  //     }
  //   } catch (error) {
  //     console.log(`Error occurred while opening the URL: ${error}`);
  //   }
  // };

  return (
    <Modal
      transparent={true}
      visible={isAndroidUpdateModal}
      onRequestClose={() => setUpdateModal()}
    >
      <View style={styles.updateModalView1}>
        <View style={styles.transparentTop}></View>
        <View style={styles.blackBottom}>
          <View style={styles.updateicon}>
            <View>
              <Image
                source={require("../../assets/icon2.png")}
                style={styles.iconimg}
              />
            </View>

            <View style={styles.text}>
              <Text style={styles.shreds}> ShreddersBay:</Text>

              <Text style={styles.shreds}> Buy Sell Auction</Text>

              <Text style={styles.shredsbay}>ShreddersBay</Text>
            </View>
          </View>

          <View style={styles.updatebtn}>
            <TouchableOpacity
              style={{
                borderWidth: 2, // Adjust the border width as needed
                borderColor: "gray", // Change the border color                                          // Adjust the padding
                borderRadius: 8, // Add border radius for rounded corners
                backgroundColor: "white",
                margin: 10,
                alignItems: "center",
                justifyContent: "center",
                width: 160,
                height: 50,
                marginLeft: 18,
                // paddingHorizontal: 40,
                // paddingVertical: 6,
              }}
              onPress={() => setUpdateModal()}
            >
              <Text style={{ fontSize: 20 }}>Later</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 2, // Adjust the border width as needed
                borderColor: "blue", // Change the border color                                          // Adjust the padding
                borderRadius: 8, // Add border radius for rounded corners
                backgroundColor: "blue",
                margin: 10,
                alignItems: "center",
                justifyContent: "center",
                // paddingHorizontal: 10,
                // paddingVertical: 8,
                width: 160,
                height: 50,
                marginRight: 18,
              }}
              onPress={() => handleUpdateModal()}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
                Update
              </Text>
            </TouchableOpacity>
          </View>

          {/* <Image  source={require('../../assets/UpdateImage.jpeg')}  /> */}
        </View>
      </View>
    </Modal>
  );
};
