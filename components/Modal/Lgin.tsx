import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    SafeAreaView,
    Alert,
    ToastAndroid,
    Modal,
  } from "react-native";
  import React, { useEffect, useState, createContext, useContext } from "react";
  // import axios from 'axios';
  import Ionicons from "react-native-vector-icons/Ionicons";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import { TouchableOpacity } from "react-native";
  import { NavigationProp, useRoute } from "@react-navigation/native";
  // import Screen3 from '../navigation/Screen3';
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useDispatch } from "react-redux";
  // import { setUserId } from '../Context/userSlice';
  import { useNavigation } from "@react-navigation/native";
  import { CommonActions } from "@react-navigation/native";
  import { setLoginData } from "../../redux/actions/loginAction";
  import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
  } from "firebase/firestore";
  import { firebaseDB } from "../../Config/Firebaseconfig";
  import * as Google from "expo-auth-session/providers/google";
  import * as WebBrowser from "expo-web-browser";
  import uuid from "react-native-uuid";
  import OTPScreen from "../Credential/OTPScreen";
  import GoodModal from "../Credential/GoodModal";
  import { AuthContext } from "../../redux/ContextApi/UserAuthProvider";
  // web: "763429625259-ut8pfj2edgmiks42epfj9e4nla8nj706.apps.googleusercontent.com",
  // ios: "763429625259-4k2snc1nfjbdf6erh67htbgvrccpbr3v.apps.googleusercontent.com",
  // android: "763429625259-vt479t47a8p6r39g6k45fd02jicrc6n9.apps.googleusercontent.com",
  WebBrowser.maybeCompleteAuthSession();
  
  interface UserIdContextProps {
    GetUserId: () => string | null;
    setUserId: (id: string) => void;
  }
  
  const UserIdContext = createContext<UserIdContextProps | undefined>(undefined);
  
  type LoginProps = {
    navigation: NavigationProp<any>;
    // closeModal:any;
    handleIsshowLogin:any;
    visible:boolean;
    setVisible:any;
  };
  const Lgin = ({ navigation ,handleIsshowLogin,visible,setVisible}: LoginProps) => {
    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId:
        "763429625259-vt479t47a8p6r39g6k45fd02jicrc6n9.apps.googleusercontent.com",
      iosClientId:
        "763429625259-4k2snc1nfjbdf6erh67htbgvrccpbr3v.apps.googleusercontent.com",
      webClientId:
        "763429625259-pqbkm905lr71d5k9u4qbt7o4p6i2ag9s.apps.googleusercontent.com",
    });
    useEffect(() => {
      handleSignInWithGoogle(response);
    }, [response]);
    const handleSignInWithGoogle = async (response) => {
      try {
        if (response?.type === "success") {
          if (
            response.authentication.accessToken &&
            response.authentication.idToken
          ) {
            const userInfo = await getUserInfo(
              response.authentication.accessToken
            );
            // console.log("userInfo:", userInfo); // Log userInfo to identify any unexpected content
            if (userInfo) {
              handleGoogleLogin(
                userInfo.id,
                response.authentication.idToken,
                userInfo.name,
                userInfo.email,
                userInfo.picture
              );
            } else {
              console.log("Error fetching user info");
            }
          } else {
            console.log("One or more required parameters are missing");
          }
        }
      } catch (error) {
        // Handle specific errors
        if (error.response && error.response.status === 400) {
          console.log("Bad Request: The provided tokens are invalid or expired");
          // Perform actions to handle invalid or expired tokens, such as logging out the user
        } else {
          // Handle other errors
          console.error("Error handling sign in with Google:", error);
        }
      }
    };
    const [isSmsVerificationModalOpen, setIsSmsVerificationModalOpen] =
      useState(false);
  
    const toggleSmsVerificationModal = () => {
      setIsSmsVerificationModalOpen(!isSmsVerificationModalOpen);
    };
  
    const getUserInfo = async (token) => {
      try {
        if (!token) return null;
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          console.error("Error fetching user info:", response.status);
          return null;
        }
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user));
  
        return user;
      } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
      }
    };
  
    const handleGoogleLogin = async (
      gUserId,
      gAccessToken,
      gUserName,
      gUserEmail,
      gUserPic
    ) => {
      console.log(
        "gUserid:-",
        gUserId,
        "gAccessToken:-",
        gAccessToken,
        "gUserName",
        gUserName,
        "gUserEmail",
        gUserEmail,
        "guserPic",
        gUserPic
      );
      try {
        if (!gUserId || !gAccessToken || !gUserName || !gUserEmail || !gUserPic) {
          console.error("One or more required parameters are missing");
          return;
        }
        const formData = new FormData();
        formData.append("google_id", gUserId);
        formData.append("token", gAccessToken);
        formData.append("name", gUserName);
        formData.append("email", gUserEmail);
        formData.append("profile_pic", gUserPic);
        authenticateWithFirebase(gUserEmail);
        const response = await fetch(
          "https://shreddersbay.com/API/user_api.php?action=google_login",
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          console.log("Login Successful:", responseData);
          const userId = responseData["0"].id;
          dispatch(setLoginData(responseData));
          try {
            await AsyncStorage.setItem("UserCred", JSON.stringify(responseData));
            await AsyncStorage.setItem("UserIdapp", userId);
            setState(prevState => ({ ...prevState, 
              userCred: responseData,
              gUserCred:JSON.stringify(responseData),
              userIdApp:userId,
              f_email:responseData["0"].email,
              // f_mobile:null,
              // f_id:null,
              // f_name:null,
              // f_password:null 
            }));
            if(!(navigation == undefined)){
              navigation.navigate("Tab1", { screen: "T1Screen1" });
            }
              authenticateWithFirebase(email);
  
            ToastAndroid.showWithGravity(
              "Login Successfully",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            setVisible(false);
          } catch (error) {
            console.error("Error storing data:", error);
          }
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    // const[userId,setUserId] = useState('')
    const dispatch = useDispatch();
  
    //////////////////////////////
  
    ///////////////////////////////
  
    //////////////////////////
  
    const isValidEmail = (email: any) => {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const hasNumber = /\d/.test(email);
      return emailRegex.test(email) && hasNumber;
    };
  
    const handleEmailChange = (input: any) => {
      setEmail(input);
      if (isValidEmail(input)) {
        setEmailError("");
      }
    };
    const isValidPassword = (password: string) => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
      return passwordRegex.test(password);
    };
  
    const handlePasswordChange = (input: string) => {
      setPassword(input);
      if (isValidPassword(input)) {
        setPasswordError("");
      }
    };
    const [state, setState] = useContext(AuthContext);
    const { gUserCred, userCred, userIdApp,f_email, f_mobile, f_id, f_name, f_password  } = state;
  
    const handleLogin = async () => {
      if (!isValidEmail(email)) {
        setEmailError("Invalid email address");
      }
  
      if (!isValidPassword(password)) {
        setPasswordError("Invalid password");
      }
  
      if (isValidEmail(email) && isValidPassword(password)) {
        console.log("Login data submitted:", {
          email,
          password,
        });
  
        // Your login logic goes here...
        try {
          const formData = new FormData();
          formData.append("email", email);
          formData.append("password", password);
  
          const response = await fetch(
            "https://shreddersbay.com/API/user_api.php?action=signin",
            {
              method: "POST",
              body: formData,
            }
          );
  
          if (response.ok) {
            const responseData = await response.json();
            console.log("Login Successful:", responseData);
            ///////          setUserCred(responseData);
            const userId = responseData["0"].id;
            // const data = await response.json()
            console.log("my id is:--", userId);
            console.log("JSON.stringify(responseData)=>",JSON.stringify(responseData))
  
            dispatch(setLoginData(responseData));
            // setState({userCred:responseData})
            setState(prevState => ({ ...prevState, userCred: responseData,
              gUserCred:JSON.stringify(responseData),
              userIdApp:userId,
              f_email:responseData["0"].email,
              // f_mobile:null,
              // f_id:null,
              // f_name:null,
              // f_password:null 
            }));
  
          
  
            authenticateWithFirebase(email);

            try {
              try {
                await AsyncStorage.setItem(
                  "UserCred",
                  JSON.stringify(responseData)
                );
                const userId = responseData[0].id;
                await AsyncStorage.setItem("UserIdapp", userId);
  
                console.log("Data stored successfully", responseData);
              } catch (error) {
                console.error("Error storing data:", error);
              }
              ///////////////////////////////////////////////////////////
  
              console.log("data set successfully");
              if(!(navigation == undefined)){
                navigation.navigate("Tab1", { screen: "T1Screen1" });
              }
              
  
             
              ToastAndroid.showWithGravity(
                
                "Login Successfully",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              setVisible(false);
            } catch (error) {
              console.log("data is not set ");
            }
  
          } else {
            console.error("Login failed:", response.status);
            // Handle failed login (show error message, etc.)
          }
        } catch (error) {
          // console.error("Error during login:", error);
          Alert.alert("Invalid Credentials");
          // Handle other errors (network, server unreachable, etc.)
        }
      } else {
        console.log("Login data is not valid.");
      }
    };
    
    const authenticateWithFirebase = async (email) => {
      console.log("this is current user's email=>",email)
      const usersCollection = collection(firebaseDB, "users");
      const q = query(usersCollection, where("email", "==", email));
  
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // User exists, log them in
          querySnapshot.forEach(async (doc) => {
            const userData = doc.data();
            if (userData != null) {
              if (userData && Object.keys(userData).length > 0) {
                try {
                  await AsyncStorage.setItem("femail", userData.email || "");
                  await AsyncStorage.setItem("fmobile", userData.mobile || "");
                  await AsyncStorage.setItem("fid", userData.idf || "");
                  await AsyncStorage.setItem("fname", userData.name || "");
                  await AsyncStorage.setItem(
                    "fpassword",
                    userData.password || ""
                  );
                  // console.log(userData.idf);
  
                  console.log(
                    "Data stored Of Firebase in AsyncStorage successfully"
                  );
                } catch (error) {
                  console.log("Error storing data in AsyncStorage:", error);
                }
              } else {
                console.log("User data is null or empty");
              }
            }
          });
        } else {
          // User doesn't exist, sign them up
          const userIdf = uuid.v4();
          const userDocumentRef = doc(usersCollection, `${userIdf}`);
          const userObjectf = {
            name: "", // Set name if provided, otherwise empty string
            email,
            mobile: "", // Set mobile if provided, otherwise empty string
            password: "", // Set password if provided, otherwise empty string
            idf: userIdf,
          };
  
          await setDoc(userDocumentRef, userObjectf);
          console.log("User signed up successfully:", userObjectf);
        }
      } catch (error) {
        console.error("Error authenticating with Firebase:", error);
      }
    };
  

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.signuplogo}>
            <Image
              style={styles.tinyLogo}
              source={require("../../assets/istockphoto2.png")}
            />
          </View>
  
          <View style={{ padding: 10 }}>
            <View style={styles.container2}>
              <MaterialCommunityIcons
                name="email-outline"
                size={30}
                color="#666"
                style={styles.icon}
              />
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={handleEmailChange}
                style={styles.textinput}
              />
            </View>
            <Text style={{ color: "red" }}>{emailError}</Text>
            <View style={styles.container3}>
              <Ionicons
                name="lock-closed-outline"
                size={30}
                color="#666"
                style={styles.icon}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={handlePasswordChange}
                textContentType="password"
                style={styles.textinput}
              />
  
              <Text style={{ color: "red" }}>{passwordError}</Text>
                <TouchableOpacity onPress={togglePasswordVisibility}>
                      <Ionicons
                        name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                        size={30}
                        style={styles.eyes}
                        color="#666"
                      />
                </TouchableOpacity>
             
            </View>
            <TouchableOpacity onPress={() => { }}>
                <Text style={{ fontSize: 17, marginTop: 14, color: "#002699",
                 textAlign: 'right' }}>
                  Forgot?
                </Text>
              </TouchableOpacity>
          </View>
  
          <View>
            <TouchableOpacity onPress={handleLogin} style={styles.login}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
  
          <Text
            style={{
              textAlign: "center",
              color: "#666",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            Or, login with ...
          </Text>
  
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                promptAsync();
              }}
              style={styles.container4}
            >
              <Ionicons
                name="logo-google"
                size={26}
                color="red"
                style={styles.icon1}
              />
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={toggleSmsVerificationModal}
              style={styles.container5}
            >
              <Ionicons
                name="phone-portrait"
                size={26}
                color="blue"
                style={styles.icon2}
              />
            </TouchableOpacity>
            {/* <GoodModal closeModal={toggleSmsVerificationModal} visible={isSmsVerificationModalOpen} comp={<OTPScreen />} /> */}
  
          </View>
  
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text style={{ marginTop: 3, marginRight: 5 }}>New to the app?</Text>
            <TouchableOpacity>
              <Text
                style={{ color: "#002699", fontWeight: "700", fontSize: 18 }}
                onPress={handleIsshowLogin}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tinyLogo: {
      width: 300,
      height: 120,
    },
    signuplogo: {
      justifyContent: "center",
    },
    container1: {
      margin: 20,
      padding: 20,
    },
    container2: {
      flexDirection: "row",
      borderBlockEndColor: "#ccc",
      borderBottomWidth: 1,
      marginTop: 15,
    },
    container3: {
      flexDirection: "row",
      borderBlockEndColor: "#ccc",
      borderBottomWidth: 1,
      marginBottom: 4,
      marginTop: 20,
    },
    textinput: {
      fontSize: 20,
      flex: 1,
      paddingVertical: 0,
      marginTop: 6,
    },
    icon: {
      marginTop: 15,
      paddingBottom: 4,
      marginRight: 10,
    },
    login: {
      backgroundColor: "#002699",
      padding: 13,
      borderRadius: 10,
      marginTop: 20,
    },
    loginText: {
      color: "#fff",
      fontSize: 17,
      textAlign: "center",
      fontWeight: "600",
    },
    container4: {
      borderColor: "red",
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 8,
      marginRight: 10,
    },

    eyes:{
     marginTop: 10,
    },
    container5: {
      borderColor: "blue",
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 8,
      marginRight: 10,
    },
    icon1: {},
    icon2: {},
  });
  
  export default Lgin;
  


