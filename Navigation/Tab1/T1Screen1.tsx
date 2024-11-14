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
  ToastAndroid,

} from "react-native";
import Constants from 'expo-constants';

import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
  useContext,
} from "react";
import { StatusBar } from 'expo-status-bar'
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StyleSheet } from "react-native";
// import {  } from 'react-native-gesture-handler';
import { EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import EntypoIcon from "react-native-vector-icons/Entypo"; // Import the Entypo icon
import Login from "../../components/Credential/Login";
import LogoSlider1 from "../../components/OrderImage/LogoSlider";
import Aluminium from "../../components/OrderImage/Aluminium";
import CopperImage from "../../components/OrderImage/CopperImage";
import CaroselImage from "../../components/OrderImage/ImageSlider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import * as Updates from "expo-updates";
import { getApiResponse, getCurrentLocation, postData } from "../Tab3/functions";
import GoodModal from "../../components/Credential/GoodModal";
import Product from "../../components/OrderImage/Product";
import { AuthContext } from "../../redux/ContextApi/UserAuthProvider";
import LoginModal from "../../components/Credential/LoginModal";
import HandleAddAddressModal from "../../components/Modal/addressModal/DisplayAllAdresses";
import SearchModal from "../../components/Modal/Search/SearchModal";

import RatingSlider from "../../components/OrderImage/RatingSlider";
import AuctionBuyModal1 from "./AuctionBuy/AuctionBuyModal1";
import OrderBuyModal1 from "./OrderBuy/OrderBuyModal1";
import GroupChatModal from "../Tab5_buy/GroupChatModal";
import { handlePushNotifications } from "../../utils/NotificaitonFunction";
import AppUpdateModal from "../../utils/AppUpdateModal";
import OrderDetailModal from "./OrderComps/OrderDetailModal";
import Orders from "./OrderComps/Orders";
import { BASE_URL, IMG_URL } from "../../ReuseComponent/Env";
import Auctions from "./AuctionComps/Auctions";

const T1Screen1 = ({ navigation }) => {
  const imgurl = IMG_URL;
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detaildata, setdetaildata] = useState<any | number>(null);
  const [isAllBuyCurrentOrderModalVisible, setIsAllBuyCurrentOrderModalVisible] = useState(false);
  const [isAllBuyAuctionOrderModalVisible, setIsAllBuyAuctionOrderModalVisible] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password, isloginModalVisible } = state;
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);

  const [auctionData, settAuctionData] = useState([]);
  const [orderData, settOrderData] = useState([])
  const [userfilterdata, setuserfilterdata] = useState([]);
  const [auctionFiteredData, setAuctionFiteredData] = useState([]);

  const getPickChooseAddressfromAddressModal = (addr) => {
    // console.log("Choosen address=>", addr);
    setCurrentAddress(addr)
  }

  const handleAddresModalOpen = () => {
    setIsAddressModalOpen(!isAddressModalOpen)
    // locationSetup();
  }
  useEffect(() => {
    // Define a function to fetch data
    const fetchDataAndCheck = () => {
      // dispatch(fetchData());
    };

    // Call the function initially
    fetchDataAndCheck();

  }, []); // Add data as a dependency to re-run useEffect when data changes

  const onRefresh = () => {
    setRefreshing(true);
    // dispatch(fetchData());
    setTimeout(() => {
      setRefreshing(false);

    }, 2000);
  };

  //////////////////////////////////
  const [booking_id, setbookingId] = useState<number | null>(null);
  const [imagename, setImagename] = useState("");
  const [isOrderDetailModalVisible, setIsOrderDetailModalVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentAddress1, setCurrentAddress1] = useState(null);
  const locationSetup = async () => {
    const address = await getCurrentLocation();
    setCurrentAddress(address);

  }
  const locationSetupModal = async () => {
    setIsAddressModalOpen(prevState => !prevState)
    const address = await getCurrentLocation();
    setCurrentAddress1(address);
  }

  useEffect(() => {
    if (!currentAddress) {
      locationSetup();
    }
  }, [currentAddress])
  useEffect(() => {
    if (currentAddress == null) {
      locationSetup();
    }
    locationSetup();
  }, []);
  useEffect(() => {
    if (currentAddress == null) {
      locationSetup();
    }
  }, [currentAddress]);
  useEffect(() => {
  }, [currentAddress, userIdApp])

  const [acceptData, setacceptData] = useState([]);


  const [isandroidUpdateModalVisible, setIsandroidUpdateModalVisible] =
    useState(false);
  const setUpdateModal = async () => {
    await Updates.reloadAsync();

    setIsandroidUpdateModalVisible(!isandroidUpdateModalVisible);
  };

  const [updatesVersion, setupdatesVersion] = useState("");
  useEffect(() => {

    async function onFetchUpdateAsync() {



      try {
        const update = await Updates.checkForUpdateAsync();
        const appVersion = Constants.expoConfig.version;
        // console.log("appVersion=>", appVersion);

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
         
          setIsandroidUpdateModalVisible(!isandroidUpdateModalVisible);
        }
      } catch (e) {
        console.error(e);
      }
    }
    //////////////////////////////////////////////////



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


  const getUsers1 = async () => {


  };


  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
    setIsGroupModalVisible(true);
  };
  ///////////////////////////////////////slider//////////////////////////////////////

  ////////////////////search//////////////////////
  const [searchtext, setSetsearchtext] = useState("");
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const onchangeSearch = (text) => {
    setIsSearchModalVisible(true);
    setSetsearchtext(text)
  }
  const onSeachModalclose = () => {
    setIsSearchModalVisible(!isSearchModalVisible)
  }

  const oncloseAllorderbuy = () => {
    navigation.navigate("Tab1", { screen: "T1Screen1" });
    setModalVisible(!modalVisible);
    setIsAllBuyCurrentOrderModalVisible(!isAllBuyCurrentOrderModalVisible);
    onRefresh();
  }
  const oncloseAllAuctionbuy = () => {
    navigation.navigate("Tab1", { screen: "T1Screen1" });
    setModalVisible(!modalVisible);
    setModalVisible(!modalVisible);
    setIsAllBuyAuctionOrderModalVisible(!isAllBuyAuctionOrderModalVisible);
    onRefresh();
  }
  ///////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#abcdef" />


      <View>
        <HandleAddAddressModal visible={isAddressModalOpen} onClose={handleAddresModalOpen} addrseter={getPickChooseAddressfromAddressModal} navigation={navigation} />
        <SearchModal closeModal={onSeachModalclose} visible={isSearchModalVisible} navigation={navigation} />
        <LoginModal navigation={navigation} visible={isLoginModalVisible} setVisible={setIsLoginModalVisible} />
        <OrderBuyModal1 closeModal={oncloseAllorderbuy} visible={isAllBuyCurrentOrderModalVisible} />
        <AuctionBuyModal1 closeModal={oncloseAllAuctionbuy} visible={isAllBuyAuctionOrderModalVisible} />
        <AppUpdateModal />


        <AskForAppUpdate
          isAndroidUpdateModal={isandroidUpdateModalVisible}
          setUpdateModal={setUpdateModal}
          updatesVersion={updatesVersion}
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
                <Text style={{ fontSize: 14, fontWeight: '500' }}>{currentAddress.city || currentAddress.city_name}</Text>
              </>
            )}
          </Pressable>
        </View>
      </View>

      <View style={styles.container1}>

        <Pressable onPress={() => { setIsSearchModalVisible(!isSearchModalVisible) }}>
          <View style={styles.searchbox}>


            <Text style={{ marginLeft: 10, color: 'gray' }}>search Scrap ...</Text>
          </View>
        </Pressable>

        <View style={[userIdApp ? { flexDirection: "row", marginLeft: 15, justifyContent: "center" } : { flexDirection: 'row', justifyContent: "center" }]}>


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
            <RatingSlider navigation={navigation} />
          </View>
          <View>
            <LogoSlider1 navigation={navigation} />
          </View>
          <View>
            <View style={styles.container3}>
              <Text style={styles.order}>Fresh Recommendations</Text>
            </View>
            <View style={styles.container5}>
              <View style={styles.card1}>
                <Orders />
              </View>
            </View>
            {/* /////////////////////////////////////// auction data bind ////////////////////////////////////////////////////////////////// */}

            <View style={styles.container3}>
              <Text style={styles.order}>New Auction</Text>
            </View>
            <View style={styles.container5}>
              <View style={styles.card1}>


                <Auctions />
              </View>
            </View>

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
    margin: 10,
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
    justifyContent: 'center',
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


export const AskForAppUpdate: React.FC<{
  isAndroidUpdateModal: boolean;
  setUpdateModal: () => void;
  updatesVersion: string;

}> = ({ isAndroidUpdateModal, setUpdateModal, updatesVersion }) => {

  const [isthereNewVersion, setisthereNewVersion] = useState(false);
  useEffect(() => {
    const appVersion = Constants.expoConfig.version;

    if (updatesVersion == appVersion) {
      setisthereNewVersion(true);
    } else {
      setisthereNewVersion(false);
    }
  }, [])


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
                width: "90%",
                height: 50,
                marginLeft: 18,
                // paddingHorizontal: 40,
                // paddingVertical: 6,
              }}
              onPress={() => setUpdateModal()}
            >

              <Text style={{ fontSize: 20 }}>Restart </Text>
            </TouchableOpacity>


          </View>

        </View>
      </View>
    </Modal>
  );
};
