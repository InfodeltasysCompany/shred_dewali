// import React, { createContext, useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Alert } from "react-native";
// import { db } from "../../Config/Firebaseconfig";

// const AuthContext = createContext();
// let handleloginModalvisible =(userIdApp)=>{
//           return userIdApp === null;
// }

// const UserAuthProvider = (props) => {
//   const [isReviewVisible, setisReviewVisible] = useState(false);
//   useEffect(()=>{

    
//   },[])
//   // Global State
//   const [state, setState] = useState({
//     // user: null,
//     gUserCred:null,
//     userCred:null,
//     userIdApp:null,
//     f_email:null,
//     f_mobile:null,
//     f_id:null,
//     f_name:null,
//     f_password:null,
//     // token: null, // If needed
//     isloginModalVisible:false,
    

  
//   },[]);

//   useEffect(() => {
//     const getLocalUserData = async () => {
//       try {
//         let data = await AsyncStorage.getItem("@user")
//         let data1 = await AsyncStorage.getItem("UserCred");
//         let appUserId = await AsyncStorage.getItem("UserIdapp");
//         let fire_mail = await AsyncStorage.getItem("femail");
//         let fire_mobile = await AsyncStorage.getItem("fmobile");
//         let fire_id = await AsyncStorage.getItem("fid");
//         let fire_name = await AsyncStorage.getItem("fname");
//         let fire_password = await AsyncStorage.getItem("fpassword");
//         let f_name= await AsyncStorage.getItem("flname")
  
//         let userCred = JSON.parse(data1);
//         let gUserCred=JSON.parse(data);
// console.log("femail is =>",fire_mail );
// console.log("User cred =>",userCred);
// console.log("fire_name=>",fire_name);
// console.log("fire_mobile=>",fire_mobile);
// console.log("fire_id=>",fire_id);
// console.log("fire_password=>",fire_password)

        
       
  
//         console.log("Local User Data ==>", userCred);
//         setState(prevState => ({
//           ...prevState,
//           gUserCred,
//           userCred,
//           userIdApp: appUserId,
//           f_email: fire_mail,
//           f_id: fire_id || userCred["0"].firebase_uid,
//           f_name1: fire_name||userCred["0"].name,
//           f_mobile: fire_mobile||userCred["0"].mobile,
//           f_password: fire_password||userCred["0"].password,
//           f_name:userCred["0"].name|| f_name,

          
//         }));
//       } catch (error) {
//         console.error("Error retrieving user data:", error);
//       }
//     };
//     getLocalUserData();
//   }, []);
  
//   return (
//     <AuthContext.Provider value={[state, setState,isReviewVisible]}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// const handleLOgOUt = async () => {
//   try {
//     Alert.alert(
//       "Logout Confirmation",
//       "Are you sure you want to logout?",
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel",
//         },
//         {
//           text: "OK",
//           onPress: async () => {
//             await AsyncStorage.removeItem("UserCred");
//             await AsyncStorage.removeItem("UserIdapp");
//             await AsyncStorage.removeItem("femail");
//             await AsyncStorage.removeItem("fid");
//             await AsyncStorage.removeItem("fmobile");
//             await AsyncStorage.removeItem("fname");
//             await AsyncStorage.removeItem("@user");
//             await AsyncStorage.removeItem("fpassword");
//             // navigation.navigate("Tab1", { screen: "T1Screen1" });

//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// export { AuthContext, UserAuthProvider,handleLOgOUt };




import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { db } from "../../Config/Firebaseconfig";

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
    <AuthContext.Provider value={[state, setState, isReviewVisible]}>
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
