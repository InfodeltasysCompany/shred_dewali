import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, Alert, ScrollView, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AntDesign, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { getApiResponse, getCurrentLocation, postData } from "../../../Navigation/Tab3/functions"
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';
import { fetchApiData } from '../../../MyMethods/APIMethodsConstants';
import OptionsMenu from "react-native-options-menu";
import HandleAddAddress from './HandleAddAddress';
import EditAddress from './EditAddress';
import LoginModal from '../../Credential/LoginModal';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";




const DisplayAllAddresses = ({ navigation, visible, onClose, addrseter }) => {
    const [state, setState] = useContext(AuthContext);
    const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password } = state;
    const [currentLocation, setcurrentLocation] = useState(null);
    const [mysavedAddresses, setMysavedAddresses] = useState([]);
    const [isEditAddressModal, setIsEditAddressModal] = useState<Boolean>(false);
    const [isAddAddressModal, setIsAddAddressModal] = useState<Boolean>(false);
    const [ADDEDITModalAddress, setADDEDITModalAddress] = useState(null)
    const [isloginModalVisible, setIsloginModalVisible] = useState<Boolean>(false);

    const hanleEditAddressModal = () => {
        setIsEditAddressModal(true);
    }
    const hanleAddAddressModal = () => {

        if (userIdApp) {
            setIsAddAddressModal(prevState => !prevState);
        }
        else {
            // navigation.navigate("LoginModal")
            setIsloginModalVisible(!isloginModalVisible)
        }

    }

    useEffect(() => {
        onRefresh();
    }, [isAddAddressModal, isEditAddressModal])
    const handlePickCurrentLocationModal = async () => {
        const address = await getCurrentLocation();
        setcurrentLocation(address);
        // addrseter(address)
        console.log("address=>", address)
    }
    const handleEdit = (address) => {
        setADDEDITModalAddress(address)

        setIsEditAddressModal(!isAddAddressModal);

    }

    const handleDelete = async (address) => {
        // need to call a delete api for delete api's
        const url = "https://shreddersbay.com/API/address_api.php?action=delete";
        const formData = new FormData();
        setADDEDITModalAddress(address)
        try {
            formData.append("addr_id", address.addr_id);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data', // Specify the content type as FormData
                    // You can add other headers here if needed
                },
                body: formData, // Pass the FormData object as the body
            });
            if (response.ok) {

                Alert.alert("Address Deleted SuccessFully")
                onRefresh();
            }
        } catch (error) {

        }
    }
    useEffect(() => {

    }, [userIdApp])
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = () => {
        getMyAllAddress();
    }
    const addAddressToLocalStorage = async (newAddress) => {
        try {
          // Get existing addresses from local storage or initialize an empty array
          let addressesJSON = await AsyncStorage.getItem('addresses');
          let addresses = addressesJSON ? JSON.parse(addressesJSON) : [];
      
          // Check if the new address already exists in the addresses array
          const existingAddressIndex = addresses.findIndex(addr => addr.address === newAddress.address);
      
          if (existingAddressIndex !== -1) {
            // Address already exists, remove it from current position to prevent duplicates
            addresses.splice(existingAddressIndex, 1);
          }
      
          // Add the new address to the end of the array
          addresses.push(newAddress);
      
          // Check if there are more than 5 addresses
          if (addresses.length > 5) {
            // Remove the oldest address (first element)
            addresses.shift();
          }
      
          // Update local storage with the updated addresses array
          await AsyncStorage.setItem('addresses', JSON.stringify(addresses));
      
          console.log('Addresses updated successfully:', addresses);
        } catch (error) {
          console.error('Error updating addresses:', error);
        }
      };
      
    const getMyAllAddress = async () => {
        const url = userIdApp ? 'https://shreddersbay.com/API/address_api.php?action=AddrByUserId&user_id=' + userIdApp : 'https://shreddersbay.com/API/address_api.php?action=AddrByUserId&user_id=';
        const myaddress = await fetchApiData(url);
        setMysavedAddresses(myaddress)
        console.log("mysavedaddress=<", myaddress);
        console.log("useridapp=<", userIdApp)
    };
    const [checkedAddressId, setCheckedAddressId] = useState<string>('');
    const [selectedAddressDetails, setSelectedAddressDetails] = useState<any>({});

    const handleonCheckboxaddress = (addressId: string, addressDetails: any) => {

        if (checkedAddressId === addressId) {
            // Uncheck the checkbox if it's already checked
            setCheckedAddressId('');
            setSelectedAddressDetails({});
        } else {
            // Check the clicked checkbox and uncheck the previously checked checkbox
            setCheckedAddressId(addressId);
            setSelectedAddressDetails(addressDetails);
            addrseter(addressDetails)
            addAddressToLocalStorage(addressDetails)
            onClose();
            console.log(addressDetails);
            console.log(userIdApp);
            //   dispatch(setAddress(addressDetails));



        }
    };
    useLayoutEffect(() => {
        getMyAllAddress();
    }, [userIdApp])
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <HandleAddAddress visible={isAddAddressModal} onClose={hanleAddAddressModal} item={currentLocation} />
            <EditAddress visible={isEditAddressModal} onClose={hanleEditAddressModal} item={currentLocation} />
            <LoginModal navigation={navigation} visible={isloginModalVisible} setVisible={setIsloginModalVisible} />

            <View style={styles.modalcontainer}>


                {/* <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={onClose}>

                        <View>
                            <AntDesign name='arrowleft' size={25} color={"white"} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ color: "white", marginLeft: 105, fontSize: 20, fontWeight: "400" }}> ADDRESS</Text>

                </View> */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.iconContainer}>
                        <AntDesign name='arrowleft' size={25} color={"white"} />
                        <Text style={styles.headerText}>ADDRESS</Text>
                    </TouchableOpacity>

                </View>



                {/* <Text>header file</Text> */}
                <TouchableOpacity style={{ ...styles.addaddressbtncontainer, paddingBottom: 10 }} onPress={hanleAddAddressModal}>
                    <MaterialIcons name='add' size={25} color={"#00457E"} style={{ marginTop: 15, fontWeight: '700', marginLeft: 15, }} />
                    <Text style={{ color: "#00457E", marginLeft: 0, fontSize: 18, marginTop: 16, paddingLeft: 5 }}>Add a New Address</Text>
                </TouchableOpacity>
                <View>



                </View>
                {/* <TouchableOpacity style={{ ...styles.addaddressbtncontainer, marginTop: 5 }} onPress={handlePickCurrentLocationModal}>
                    <Ionicons name='location' size={25} color={currentLocation ? "gray" : "#2874f0"} style={{ marginTop: 10, fontWeight: '700', marginLeft: 15, }} />
                    <Text style={{ marginLeft: 0, fontSize: 18, marginTop: 10, paddingLeft: 5, ...(currentLocation ? { color: "gray" } : { color: "#2874f0" }) }}>your current location</Text>


                </TouchableOpacity> */}

                {
                    currentLocation && (

                        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingTop: 8, width: "100%", paddingLeft: 20, paddingRight: 60, }}>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#888' }}>City:</Text>
                                    <Text style={{ color: '#888' }}>{currentLocation.city}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#888' }}>Country:</Text>
                                    <Text style={{ color: '#888' }}>{currentLocation.country}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#888' }}>District:</Text>
                                    <Text style={{ color: '#888' }}>{currentLocation.district}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#888' }}>Postal Code:</Text>
                                    <Text style={{ color: '#888' }}>{currentLocation.postalCode}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#888' }}>Region:</Text>
                                    <Text style={{ color: '#888' }}>{currentLocation.region}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#888' }}>Subregion:</Text>
                                    <Text style={{ color: '#888' }}>{currentLocation.subregion}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }


                <View style={styles.myaddressesContainer}>
                    <Text style={{ color: 'gray', margin: 20, }}> Your saved address</Text>
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#0000ff"]}
                            tintColor="#0000ff"
                        />
                    }>

                        <View>


                            {/* Display fetched data in card-like format */}

                            {mysavedAddresses &&
                                mysavedAddresses
                                    .slice() // Create a shallow copy of the array to avoid mutating the original data
                                    .reverse() // Reverse the order of the array
                                    .map((address: any) => (
                                        <TouchableOpacity
                                            key={address.addr_id}
                                            onPress={() => handleonCheckboxaddress(address.addr_id, address)}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    margin: 5,
                                                    // width:"100%"
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        height: 15,
                                                        width: 15,
                                                        borderRadius: 15,
                                                        borderWidth: 1,
                                                        borderColor: 'black',
                                                        alignSelf: 'flex-start',
                                                        marginRight: 5,
                                                        marginTop: 5,




                                                    }}
                                                >
                                                    {checkedAddressId === address.addr_id && (
                                                        <View
                                                            style={{
                                                                height: 10,
                                                                width: 10,
                                                                borderRadius: 13,
                                                                backgroundColor: 'black',
                                                                padding: 1,
                                                                margin: 1.5,
                                                            }}
                                                        />
                                                    )}
                                                </View>




                                                <View key={address.addr_id} style={styles.card}>

                                                    <OptionsMenu
                                                        button={require("../../../assets/threedot.jpg")}  // Use Image component
                                                        buttonStyle={{ position: 'absolute', top: 0, right: 0, width: 30, height: 30 }}
                                                        destructiveIndex={1}
                                                        options={["Delete"]}
                                                        actions={[() => { handleDelete(address) }]}
                                                    />

                                                    <View style={{ padding: 20, marginTop: 30, }}>
                                                            {/* /////////////////// */}
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                                            <Text style={{ fontWeight: 'bold', color: '#888' }}>addr_id:</Text>
                                                            <Text style={{ color: '#888' }}>{address.addr_id}</Text>
                                                        </View>
                                                            {/* ////////////////// */}
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                                            <Text style={{ fontWeight: 'bold', color: '#888' }}>pincode:</Text>
                                                            <Text style={{ color: '#888' }}>{address.pin_code}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                                            <Text style={{ fontWeight: 'bold', color: '#888' }}>lankdmark:</Text>
                                                            <Text style={{ color: '#888' }}>{address.landmark}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                                            <Text style={{ fontWeight: 'bold', color: '#888' }}>City:</Text>
                                                            <Text style={{ color: '#888' }}>{address.city_name}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                                            <Text style={{ fontWeight: 'bold', color: '#888' }}>Country:</Text>
                                                            <Text style={{ color: '#888' }}>{address.country_name}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                                            <Text style={{ fontWeight: 'bold', color: '#888' }}>address:</Text>
                                                            <Text style={{ color: '#888' }}>{address.address}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                                            <Text style={{ fontWeight: 'bold', color: '#888' }}>state:</Text>
                                                            <Text style={{ color: '#888' }}>{address.state_name}</Text>
                                                        </View>

                                                    </View>
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    ))}


                        </View>
                    </ScrollView>
                </View>

            </View>
        </Modal>
    );
};

export default DisplayAllAddresses;

const styles = StyleSheet.create({
    modalcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",

    },

    headerContainer: {
        flexDirection: 'row',
        backgroundColor: "#00457E",

        width: "100%",
        alignItems: 'center',
        paddingLeft: 10,
        height: '10%',
    },
    headerContainer1: {
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'space-between',  // Ensures the elements are spread out
        paddingHorizontal: 10,
        height: 60,
        width: "100%",
        backgroundColor: '#00457E', // Assuming a black background for example
    },

    iconContainer: {
        backgroundColor: "#00457E",
        flex: 1,
        width: "100%",
        flexDirection: "row",
        elevation: 10,
        marginTop: 20,

    },

    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400',
        paddingLeft: 20,

    },

    //     headerContainer: {
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         justifyContent: 'space-between',  // Ensures the elements are spread out
    //         paddingHorizontal: 10,
    //         height: 60,
    //         width: "100%",
    //         backgroundColor: '#00457E', // Assuming a black background for example
    // },

    // iconContainer: {

    //     // Adjust width as necessary
    // },
    // headerText: {
    //   color: 'white',
    //   fontSize: 20,
    //   fontWeight: '400',
    //   position: 'absolute',
    //   left: 0,
    //   right: 0,
    //   textAlign: 'center',
    // },

    addaddressbtncontainer: {
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        flexDirection: "row",
        elevation: 10,

    },
    myaddressesContainer: {
        flex: 10,
        height: '100%',
        width: "100%"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '70%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        // elevation: 3,
        borderWidth: 1,
        borderColor: 'gray',
        width: "90%",
        // height: 170,
        display: 'flex'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    card1: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 20,
        margin: 10,
        maxWidth: 400,
    },
    addressContainer1: {
        textAlign: 'left',
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label1: {
        fontWeight: 'bold',
    },
    grayText1: {
        color: '#888', // Gray color
    },

});








