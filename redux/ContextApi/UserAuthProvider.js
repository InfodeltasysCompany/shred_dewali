import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, ToastAndroid } from "react-native";
import { db } from "../../Config/Firebaseconfig"; // Ensure this is correctly configured
import * as Network from "expo-network";

// Create the AuthContext
const AuthContext = createContext();

// Helper function to check if login modal should be visible
const handleLoginModalVisible = (userIdApp) => userIdApp === null;

// Auth Provider component
const UserAuthProvider = (props) => {
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [networkStatus, setNetworkStatus] = useState("online"); // Can be 'online', 'offline', 'weak'
  const [GChatState, setGChatState] = useState({
    productdetails: {},
    userdetails: {},
    currentConversationData:{},
    // chatCurrentData:{},
  });
  const [GCreateOrderAuctionState, setCreateOrderAuctionState] = useState({
    userId: "",
    firebase_uid: "",
    category: "",
    categoryId: "",
    catagoryImgSource:"",
    subcategory: "",
    minimumPresetPrice: "",
    title: "",
    description: "",
    enterPrice: "",
    enterWeight: "",
    images: [],
    address: {},
    date: "",
    isAuction: false,
    startDate: "",
    endDate: "",
  });
  
  // 
  const [state, setState] = useState({
    gUserCred: null,
    userCred: null,
    userIdApp: "",
    f_email: "",
    f_mobile: "",
    f_id: "",
    f_name: "",
    f_password: "",
    firebase_uid:"",
    isLoginModalVisible: false,
  });

  // Function to check network connectivity
  const checkNetworkStatus = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();

      if (!networkState.isConnected) {
        setNetworkStatus("offline");
        ToastAndroid.show("No internet connection", ToastAndroid.SHORT);
      } else if (networkState.isConnected && !networkState.isInternetReachable) {
        setNetworkStatus("weak");
        ToastAndroid.show("Weak internet connection", ToastAndroid.SHORT);
      } else {
        setNetworkStatus("online");
      }
    } catch (error) {
      console.error("Error checking network status:", error);
    }
  };

  useEffect(() => {
    // Check network status initially and set up a check every 10 seconds
    checkNetworkStatus();
    const interval = setInterval(checkNetworkStatus, 10000);

    // Clean up interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Fetch user data from AsyncStorage on component mount
  useEffect(() => {
    const getLocalUserData = async () => {
      try {
        const userData = await Promise.all([
          AsyncStorage.getItem("@user"),
          AsyncStorage.getItem("UserCred"),
          AsyncStorage.getItem("UserIdapp"),
          AsyncStorage.getItem("femail"),
          AsyncStorage.getItem("fmobile"),
          AsyncStorage.getItem("fid"),
          AsyncStorage.getItem("fname"),
          AsyncStorage.getItem("fpassword"),
        ]);

        const [
          gUserCredRaw,
          userCredRaw,
          userIdApp,
          fireEmail,
          fireMobile,
          fireId,
          fireName,
          firePassword,
        ] = userData;

        const gUserCred = JSON.parse(gUserCredRaw);
        const userCred = JSON.parse(userCredRaw);

        setState((prevState) => ({
          ...prevState,
          gUserCred,
          userCred,
          userIdApp: userIdApp || userCred?.[0]?.id,
          f_email: fireEmail,
          f_id: fireId || userCred?.[0]?.firebase_uid,
          f_name: fireName || userCred?.[0]?.name,
          f_mobile: fireMobile || userCred?.[0]?.mobile,
          f_password: firePassword || userCred?.[0]?.password,
          firebase_uid:fireId || userCred?.[0]?.firebase_uid,
        }));
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getLocalUserData();
  }, []);

  // Update GChatState whenever state.userCred changes
  useEffect(() => {
    const userDetails = Array.isArray(state.userCred) ? state.userCred[0] : state.userCred?.[0];
    setGChatState((prevState) => ({
      ...prevState,
      userdetails: userDetails || {},
    }));
  }, [state.userCred]);

  return (
    <AuthContext.Provider
      value={[
        state,
        setState,
        isReviewVisible,
        networkStatus,
        GChatState,
        setGChatState,
        GCreateOrderAuctionState, setCreateOrderAuctionState
      ]}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// Logout function
const handleLogout = async () => {
  try {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.multiRemove([
              "UserCred",
              "UserIdapp",
              "femail",
              "fid",
              "fmobile",
              "fname",
              "@user",
              "fpassword",,
              
            ]);
          },
        },
      ],
      { cancelable: false }
    );
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export { AuthContext, UserAuthProvider, handleLogout };
