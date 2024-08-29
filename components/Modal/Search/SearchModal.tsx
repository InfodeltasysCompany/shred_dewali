import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Modal, TouchableOpacity, StyleSheet, TextInput, Keyboard, Pressable, Image } from "react-native";
import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import ResolveImagePost from "./ResolveImagePost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import DisplayAllAddresses from "../addressModal/DisplayAllAdresses";
import { getApiResponse } from "../../../Navigation/Tab3/functions";
import { AuthContext } from "../../../redux/ContextApi/UserAuthProvider";
import SearchModalContent from "./SearchModalContent";
const imgurl = "https://shreddersbay.com/API/uploads/";

const SearchModal = ({ closeModal, visible, navigation }) => {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);


  const [searchText, setSearchText] = useState("");
  const [searchLocationText, setSearchLocationText] = useState("");
  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password, isloginModalVisible } = state;

  const textInputRef = useRef(null); // Ref for TextInput
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    setSearchLocationText("");
    setSearchText("");
  }, [visible])
  const handleSearch = async () => {
    if (!searchText.trim()) {
      // Keep focus if search text is empty
      inputRef1.current.focus();
    } else {
      // Handle search logic
      console.log('Searching for:', searchText);
      const checkurl = "https://shreddersbay.com/API/product_api.php?action=select";

      // setSetselectedObjforSearch(foundProduct); // Update state or perform action with found data
      setSetselectedObjforSearch(searchText);
      if (searchText !== "") {
        setIsSearchModalContentisDisplay(!isSearchModalContentisDisplay); // Toggle modal or handle display logic
        setSearchLocationText("");
        setSearchText("");
      }

      Keyboard.dismiss();
    }


  };


  const handleSearchLocation = () => {
    // Check if the search text is empty
    if (!searchLocationText.trim()) {
      // If empty, keep focus on the input field
      inputRef2.current.focus();
    } else {
      // If not empty, handle the search logic
      console.log('Searching for:', searchLocationText);
      console.log("Searching for location:", searchLocationText);

      // Update the state with the current search location text
      setSearchLocationText(searchLocationText);

      // Call the function to handle the search with the location text
      handleSearchLocationAgain(searchLocationText);

      // Dismiss the keyboard and remove focus from the input field
      Keyboard.dismiss();
      // Optionally, you can also blur the input field explicitly if needed
      inputRef2.current.blur();
    }
  };

  const handleSearchLocationAgain = (text) => {
    // Implement your search logic here
    console.log("Searching for location:", text);
    setSearchLocationText(text.address);
    // You can add logic here to handle the search functionality
    Keyboard.dismiss(); // Dismiss keyboard after search
    setSetselectedObjforSearch(text);
    setIsSearchModalContentisDisplay(!isSearchModalContentisDisplay);
    setSearchLocationText("");
    setSearchText("");
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
  const getPickChooseAddressfromAddressModal = async (addr) => {
    console.log("Choosen address=>", addr);
    setSearchLocationText(addr.address)
    // handleSearchLocation();
    setCurrentAddress(addr)
    setSetselectedObjforSearch(addr);
    setIsSearchModalContentisDisplay(!isSearchModalContentisDisplay);
    setSearchLocationText("");
    setSearchText("");
  }

  useEffect(() => {
    // getOrderResponse();
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
  ///////////////////////
  const [isSearchModalContentisDisplay, setIsSearchModalContentisDisplay] = useState(false);
  const [setselectedObjforSearch, setSetselectedObjforSearch] = useState(null);
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

  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.container}>
        <DisplayAllAddresses visible={isAllAddressModalVisible} onClose={() => { setIsAllAddressModalVisible(!isAllAddressModalVisible) }} addrseter={getPickChooseAddressfromAddressModal} navigation={navigation} />
        <SearchModalContent closeModal={() => {
          // setIsSearchModalContentisDisplay(!isSearchModalContentisDisplay);
          Keyboard.dismiss();
          closeModal();
          setIsSearchModalContentisDisplay(!isSearchModalContentisDisplay);

        }} visible={isSearchModalContentisDisplay} navigation={navigation} dataforsearch={setselectedObjforSearch} />
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <AntDesign name="arrowleft" size={35} />
          </TouchableOpacity>
          <TextInput
            ref={inputRef1}
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
          <TouchableOpacity onPress={handleFocusTextInput} style={styles.searchIcon}>
            <AntDesign name="search1" size={30} color={"gray"} />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.locationContainer, marginTop: 15, paddingLeft: 1 }}>
          <TouchableOpacity style={styles.searchIcon} onPress={() => { setIsAllAddressModalVisible(!isAllAddressModalVisible) }}>
            <EvilIcons name="location" size={30} color={"black"} />
          </TouchableOpacity>
          <TextInput
            ref={inputRef2}


            placeholder="Search scrap by location..."
            clearButtonMode="always"
            autoCapitalize="none"
            autoCorrect={true}
            keyboardType="web-search"
            style={styles.input1}
            value={searchLocationText}
            onChangeText={(text) => setSearchLocationText(text)}
            onSubmitEditing={handleSearchLocation} // Trigger search on keyboard search button press
          />
        </View>
        <View style={styles.content}>
          <View>
            {localAddresses.map((address, index) => (
              <AddressCard key={index} address={address} onCancel={handleCancel} onclick={(text) => {
                console.log("for testing first", text);
                setSearchLocationText(text.address);
                handleSearchLocationAgain(text);
              }}
              />
            ))}

          </View>

        </View>
        {/* <View style={styles.container5}>
          <View style={styles.card1}>

            {orderData && orderData.map((item, index) => (
              <View key={index} style={styles.card}>
                <Pressable
                  onPress={() =>
                    handleDetailPress(item.booking_id, item.filename)
                  }
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: imgurl + item.filename.split(",")[0] }}
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
                      {item.approx_price}
                    </Text>

                    <View>

                    </View>
                    <Text style={styles.textContainer6}>
                      <EvilIcons
                        name="location"
                        style={{ fontSize: 15 }}
                      />{" "}
                      {item ? item.country_name : item.city_name}

                    </Text>
                    <Text style={{ ...styles.textContainer6, marginLeft: 16, textTransform: 'lowercase' }}>{item && item.state_name}</Text>

                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        </View> */}
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
    // top: 17,
    left: 10,
    zIndex: 1, // Ensures the close button is above other content
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
  imageContainer: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },
  container5: {},

  locationContainer: {
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
  card: {
    width: "48%",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "lightgray",

  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  textContainer5: {
    fontSize: 15,
    color: "darkgray",
    marginBottom: 2,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: "10%", // Adjust the margin as needed
  },
  input1: {
    flex: 1,
    fontSize: 18,
    // Adjust the margin as needed
  },


  content: {
    flex: 1,
    marginTop: 25,
    alignItems: "center",

  },
  textContainer6: {
    fontSize: 12,
    marginTop: 10,
    color: "gray",


  },
  textContainer: {
    padding: 10,
  },
  image: {
    height: 100,
    width: 140,
    marginTop: 5,
  },

  textContainer2: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    marginBottom: 5,
    fontFamily: 'sans-serif',
  },
  card1: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,

    shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0.5,
    width: "90%",
    height: "20%",

  },
  addressText: {
    fontSize: 16,
    maxWidth: '80%',
  },
  cancelButton: {
    // marginLeft: 10,
  },
  // textContainer5: {
  //   fontSize: 15,
  //   color: "darkgray",
  //   marginBottom: 2,
  // },
});

export default SearchModal;
export const AddressCard = ({ address, onCancel, onclick }) => {
  // const onclick=()=>{
  //   console.log("testing:==1")
  // }
  return (
    <TouchableOpacity style={styles.card1} onPress={() => { onclick(address) }}>
      <View style={{ flex: 1, }}>
        <Text style={styles.addressText}>{address.address}
        </Text>

      </View>
      <View>
        <TouchableOpacity onPress={() => onCancel(address.addr_id)} style={styles.cancelButton}>
          <AntDesign name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );
};

