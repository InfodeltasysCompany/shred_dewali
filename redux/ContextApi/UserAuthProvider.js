import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const AuthContext = createContext();
let handleloginModalvisible =(userIdApp)=>{
          return userIdApp === null;
}

const UserAuthProvider = (props) => {
  // Global State
  const [state, setState] = useState({
    // user: null,
    gUserCred:null,
    userCred:null,
    userIdApp:null,
    f_email:null,
    f_mobile:null,
    f_id:null,
    f_name:null,
    f_password:null,
    // token: null, // If needed
    isloginModalVisible:false

  });

  useEffect(() => {
    const getLocalUserData = async () => {
      try {
        let data = await AsyncStorage.getItem("@user")
        let data1 = await AsyncStorage.getItem("UserCred");
        let appUserId = await AsyncStorage.getItem("UserIdapp");
        let fire_mail = await AsyncStorage.getItem("femail");
        let fire_mobile = await AsyncStorage.getItem("fmobile");
        let fire_id = await AsyncStorage.getItem("fid");
        let fire_name = await AsyncStorage.getItem("fname");
        let fire_password = await AsyncStorage.getItem("fpassword");
  
        let userCred = JSON.parse(data1);
        let gUserCred=JSON.parse(data);

        
       
  
        console.log("Local User Data ==>", userCred);
        setState(prevState => ({
          ...prevState,
          gUserCred,
          userCred,
          userIdApp: appUserId,
          f_email: fire_mail,
          f_id: fire_id,
          f_name: fire_name,
          f_mobile: fire_mobile,
          f_password: fire_password,

          
        }));
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };
    getLocalUserData();
  }, []);
  
  return (
    <AuthContext.Provider value={[state, setState]}>
      {props.children}
    </AuthContext.Provider>
  );
};

const handleLOgOUt = async () => {
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
            // navigation.navigate("Tab1", { screen: "T1Screen1" });

          },
        },
      ],
      { cancelable: false }
    );
  } catch (error) {
    console.log(error);
  }
};

export { AuthContext, UserAuthProvider,handleLOgOUt };
