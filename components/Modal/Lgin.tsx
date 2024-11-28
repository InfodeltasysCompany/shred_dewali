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
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { NavigationProp, useRoute } from "@react-navigation/native";
// import Screen3 from '../navigation/Screen3';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useDispatch } from "react-redux";
// import { setUserId } from '../Context/userSlice';
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
// import { setLoginData } from "../../redux/actions/loginAction";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import uuid from "react-native-uuid";
import OTPScreen from "../Credential/OTPScreen";
import GoodModal from "../Credential/GoodModal";
import { AuthContext } from "../../redux/ContextApi/UserAuthProvider";
import { firebaseSignIn } from "./Search/firebasefunctions";
import { handlePushNotifications } from "../../utils/NotificaitonFunction";
import { BASE_URL } from "../../ReuseComponent/Env";
import { userCreatefirebaserealtime } from "./Search/FirebaseChatFunctions";
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
  handleIsshowLogin: any;
  visible: boolean;
  setVisible: any;
};
const Lgin = ({ navigation, handleIsshowLogin, visible, setVisible }: LoginProps) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // androidClientId:
    //   "763429625259-vt479t47a8p6r39g6k45fd02jicrc6n9.apps.googleusercontent.com",
    // iosClientId:
    //   "763429625259-4k2snc1nfjbdf6erh67htbgvrccpbr3v.apps.googleusercontent.com",
    // webClientId:
    //   "763429625259-pqbkm905lr71d5k9u4qbt7o4p6i2ag9s.apps.googleusercontent.com",
    androidClientId:
      "254504701779-h6q77schmob167ed01kgc2ncenls2gg2.apps.googleusercontent.com",

    webClientId:
      "254504701779-h1969g4pfje50j76var1oa5htms97d8k.apps.googleusercontent.com",
  });
  useEffect(() => {
    handleSignInWithGoogle(response);
  }, [response]);
  const handleSignInWithGoogle = async (response) => {
    try {
      if (response?.type === "success") {
        const { accessToken, idToken } = response.authentication;

        if (accessToken && idToken) {
          // Fetch Google user info
          const userInfo = await getUserInfo(accessToken);
          console.log("userInfo:", userInfo);

          if (userInfo) {
            // Create a Google OAuth credential with the Google ID token
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(idToken);

            // Sign in to Firebase with the Google credential
            const firebaseUser = await signInWithCredential(auth, credential);

            console.log("User signed in to Firebase:", firebaseUser.user);

            // Now check if the user exists in your backend and handle accordingly
            const { uid, displayName, email, photoURL } = firebaseUser.user;

            handleGoogleLogin(
              uid,         // userInfo.id -> Firebase UID
              idToken,     // Google ID Token
              displayName, // userInfo.name -> Firebase displayName
              email,       // userInfo.email -> Firebase email
              photoURL     // userInfo.picture -> Firebase photoURL
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
      } else {
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
      formData.append("firebase_uid", gUserId);
      formData.append("token", gAccessToken);
      formData.append("name", gUserName);
      formData.append("email", gUserEmail);
      formData.append("profile_pic", gUserPic);
      const response = await fetch(
        `${BASE_URL}/user_api.php?action=google_login`,
        {
          method: "POST",
          body: formData,
        }
      );
      

      if (response.ok) {
        try {
          const responseData = await response.json();
          console.log("Login Successful:", responseData);

          // Assuming responseData is an array and accessing the first element
          const user = responseData[0];
          const userId = user.id;

          // Dispatch the login data
          // dispatch(setLoginData(responseData));

          // Logging the response data
          console.log("JSON.stringify(responseData)=>", JSON.stringify(responseData));
          await handlePushNotifications (userId, user.firebase_uid, 0);
          console.log("handlePushNotifications called successfully");

          // Update the state with the user's information
          setState(prevState => ({
            ...prevState,
            userCred: JSON.stringify(responseData),
            userIdApp: userId,
            f_email: user.email,
            f_mobile: user.mobile,
            f_id: user.firebase_uid,
            f_name: user.name,
          }));
          await userCreatefirebaserealtime(user.firebase_uid,user.email,user.mobile,user.name);

          // Attempt to store the user's data in AsyncStorage
          try {
            await AsyncStorage.setItem("UserCred", JSON.stringify(responseData));
            await AsyncStorage.setItem("UserIdapp", user.id);
            await AsyncStorage.setItem("femail", user.email);
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            await AsyncStorage.setItem("fmobile", user.mobile);
            await AsyncStorage.setItem("fid", user.firebase_uid);
            await AsyncStorage.setItem("fname", user.username);
          } catch (storageError) {
            console.log("Error setting data in AsyncStorage via login:", storageError);
          };

          // Show success alert and navigate to the Tab1 screen
          Alert.alert(
            "Login Successfully",
            "You have successfully logged in.",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("Tab1", { screen: "T1Screen1" }),
              },
            ],
            { cancelable: false }
          );
        } catch (error) {
          console.error("Error processing login response:", error);
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
  // const dispatch = useDispatch();

  //////////////////////////////

  ///////////////////////////////

  //////////////////////////

  const isValidEmail = (email: any) => {
    // console.log("email is valid=>",email);
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
    // console.log("password is valid=>",password);
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
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password } = state;

  const handleLogin1 = async () => {
    console.log("hit handleLogin1", email, password);
    await firebaseSignIn(email, password, handleLogin);
  }
 


  const handleLogin = async (email, password) => {
    console.log("email and password are =>", email, password);
  
    if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
      return; // Exit early if email is invalid
    }
  
    if (!isValidPassword(password)) {
      setPasswordError("Invalid password");
      return; // Exit early if password is invalid
    }
  
    console.log("Login data submitted:", { email, password });
  
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
  
      const response = await fetch(
        `${BASE_URL}/user_api.php?action=signin`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Login Successful:", responseData);
  
        // Validate the structure of responseData
        if (responseData && responseData[0]) {
          const userData = responseData[0]; // Access the user data object
          const message = responseData.message; // Access the login message
          const username = responseData.username; // Access the usernam
          console.log("userdata is =>",userData);
          // Check if the userData is valid
          if (userData && typeof userData === 'object') {
            const userId = userData.id;
            await handlePushNotifications (userData.id, userData.firebase_uid, 0);
            console.log("handlePushNotifications called successfully");

            // Set data in AsyncStorage
            await AsyncStorage.setItem("flname", userData.name || '');
            console.log("User ID:", userId);
            console.log("JSON.stringify(responseData):", JSON.stringify(responseData));
  
       
            setState(prevState => ({
              ...prevState,
              userCred: JSON.stringify(responseData),
              userIdApp: userData.id,
              f_email: userData.email,
              f_mobile: userData.mobile,
              f_id: userData.firebase_uid,
              f_name: userData.name,
            }))
            await userCreatefirebaserealtime(userData.firebase_uid,userData.email,userData.mobile,userData.name);

            // Save additional data to AsyncStorage
            await AsyncStorage.setItem("UserCred", JSON.stringify(responseData));
            await AsyncStorage.setItem("UserIdapp", userData.id);
            await AsyncStorage.setItem("femail", userData.email);
            await AsyncStorage.setItem("@user", JSON.stringify(userData));
            await AsyncStorage.setItem("fmobile", userData.mobile || '');
            await AsyncStorage.setItem("fid", userData.firebase_uid || '');
            await AsyncStorage.setItem("fname", userData.name || '');
  
            console.log("Data set successfully");
            // await userCreatefirebaserealtime(userData.firebase_uid,userData.email,userData.mobile,userData.username);

            // Navigation to the next screen
            if (navigation) {
              navigation.navigate("Tab1", { screen: "T1Screen1" });
            }
  
            // Show success message
            ToastAndroid.showWithGravity(
              message || "Login Successfully",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            // setVisible(!visible);
  
          } else {
            console.error("User data is invalid or not as expected");
            Alert.alert("Error", "Invalid user data received");
          }
        } else {
          console.error("Response data is not in the expected format");
          Alert.alert("Error", "Unexpected response data format");
        }
      } else {
        console.error("Login failed:", response.status);
        Alert.alert("Login Failed", `Status Code: ${response.status}`);
      }
  
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", "An unexpected error occurred during login");
    }
  };
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
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
            <Text style={{
              fontSize: 17, marginTop: 14, color: "#002699",
              textAlign: 'right'
            }}>
              Forgot?
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={handleLogin1} style={styles.login}>
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
    </View>
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

  eyes: {
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



