import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert ,ToastAndroid} from "react-native";
import { db } from "../../Config/Firebaseconfig";
import * as Network from 'expo-network';


// Create the AuthContext
const AuthContext = createContext();

// Helper function to check if login modal should be visible
const handleLoginModalVisible = (userIdApp) => userIdApp === null;

// Auth Provider component
const UserAuthProvider = (props) => {
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [state, setState] = useState({
    gUserCred: null,
    userCred: null,
    userIdApp: "",
    f_email: "",
    f_mobile: "",
    f_id: "",
    f_name: "",
    f_password: "",
    isLoginModalVisible: false,
  });
  const [networkStatus, setNetworkStatus] = useState('online'); // Can be 'online', 'offline', 'weak'

  // Function to check network connectivity
  const checkNetworkStatus = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      
      if (!networkState.isConnected) {
        setNetworkStatus('offline');
        ToastAndroid.show(`No internet connection`, ToastAndroid.SHORT);

      } else if (networkState.isConnected && networkState.isInternetReachable === false) {
        setNetworkStatus('weak');
        ToastAndroid.show('Weak internet connection', ToastAndroid.SHORT);

      } else {
        setNetworkStatus('online');
      }
    } catch (error) {
      console.error('Error checking network status:', error);
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
        const data = await AsyncStorage.getItem("@user");
        const data1 = await AsyncStorage.getItem("UserCred");
        const appUserId = await AsyncStorage.getItem("UserIdapp");
        const fireMail = await AsyncStorage.getItem("femail");
        const fireMobile = await AsyncStorage.getItem("fmobile");
        const fireId = await AsyncStorage.getItem("fid");
        const fireName = await AsyncStorage.getItem("fname");
        const firePassword = await AsyncStorage.getItem("fpassword");
        const fName = await AsyncStorage.getItem("flname");

        const userCred = JSON.parse(data1);
        const gUserCred = JSON.parse(data);

        setState(prevState => ({
          ...prevState,
          gUserCred,
          userCred,
          userIdApp: appUserId ||userCred?.[0]?.id,
          f_email: fireMail,
          f_id: fireId || userCred?.[0]?.firebase_uid,
          f_name: fireName || userCred?.[0]?.name,
          f_mobile: fireMobile || userCred?.[0]?.mobile,
          f_password: firePassword || userCred?.[0]?.password,
          f_name: userCred?.[0]?.name || fName,
        }));
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getLocalUserData();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState, isReviewVisible,networkStatus]}>
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
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.removeItem("UserCred");
            await AsyncStorage.removeItem("UserIdapp");
            await AsyncStorage.removeItem("femail");
            await AsyncStorage.removeItem("fid");
            await AsyncStorage.removeItem("fmobile");
            await AsyncStorage.removeItem("fname");
            await AsyncStorage.removeItem("@user");
            await AsyncStorage.removeItem("fpassword");
            // navigation.navigate("Tab1", { screen: "T1Screen1" }); // Uncomment and adjust if needed
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
