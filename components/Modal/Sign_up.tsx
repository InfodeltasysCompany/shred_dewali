import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { collection, doc, setDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

// import 'expo-dev-client'
import { useDispatch } from "react-redux";
import { setLoginData } from "../../redux/actions/loginAction";
import { getDocs, query, where } from "firebase/firestore";
import { firebaseDB } from "../../Config/Firebaseconfig";
import { AuthContext } from "../../redux/ContextApi/UserAuthProvider";

type SignProps = {
  navigation: NavigationProp<any>;
  handleIsshowLogin:any;
};

const Sign_up = ({ navigation,handleIsshowLogin }: SignProps) => {
  const dispatch = useDispatch();
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
            // authenticateWithFirebase(email);
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
  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp,f_email, f_mobile, f_id, f_name, f_password  } = state;

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
       authenticateWithFirebase(gUserEmail);

      const formData = new FormData();
      formData.append("google_id", gUserId);
      formData.append("token", gAccessToken);
      formData.append("name", gUserName);
      formData.append("email", gUserEmail);
      formData.append("profile_pic", gUserPic);
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
          console.log("JSON.stringify(responseData)=>",JSON.stringify(responseData))
          setState(prevState => ({ ...prevState, 
            userCred: JSON.stringify(responseData),
            // gUserCred:JSON.stringify(responseData),
            userIdApp:userId,
            // f_email:null,
            // f_mobile:null,
            // f_id:null,
            // f_name:null,
            // f_password:null 
          }));
          Alert.alert(
            "Login Successfully",
            "You have successfully logged in.",
            [
              {
                text: "OK",
                onPress: () =>
                  navigation.navigate("Tab1", { screen: "T1Screen1" }),
              },
            ],
            { cancelable: false }
          );
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
  const LoginWithfirebase = async (email1: string, password: string) => {
    if (email1 !== null && password !== null) {
      // console.log("i m in login with firebase function");
      console.log("my email is :-", email1);

      const usersCollection = collection(firebaseDB, "users");
      const q = query(usersCollection, where("email", "==", email1));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            console.log("User data:---", userData);
            if (userData != null) {
              // console.log("hii this is vinit......");

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
          } else {
            console.log("Document does not exist");
          }
        });
      } catch (error) {
        console.error("Error getting user data except email:", error);
      }
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const handleNameChange = (input: string) => {
    setName(input);
    if (isValidName(input)) {
      setNameError("");
    }
  };

  const handleEmailChange = (input: string) => {
    setEmail(input);
    if (isValidEmail(input)) {
      setEmailError("");
    }
  };

  const handlePhoneChange = (input: string) => {
    const numbersOnly = input.replace(/[^0-9]/g, "");
    setPhone(numbersOnly);
    if (isValidPhoneNumber(numbersOnly)) {
      setPhoneError("");
    }
  };

  const handlePasswordChange = (input: string) => {
    setPassword(input);
    if (isValidPassword(input)) {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (input: string) => {
    setConfirmPassword(input);
    if (input === password) {
      setConfirmPasswordError("");
    }
  };

  const isValidName = (name: string) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(name);
  };
  // Remove the extra '}' here

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const isValidPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError("Name is required");
    }

    if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
    }

    if (!isValidPhoneNumber(phone)) {
      setPhoneError("Invalid phone number");
    }

    if (!isValidPassword(password)) {
      setPasswordError("Invalid password");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    }

    if (
      name.trim() &&
      isValidEmail(email) &&
      isValidPhoneNumber(phone) &&
      isValidPassword(password) &&
      password === confirmPassword
    ) {
      console.log("Registration data submitted:", {
        name,
        email,
        phone,
        password,
        confirmPassword,
      });

      const userObject = {
        name,
        email,
        mobile: phone,
        password,
        repassword: confirmPassword,
      };
      console.log("user object is ", userObject);

      saveData(userObject);
    } else {
      console.log("Registration data is not submitted.");
    }
  };

  const saveData = async (userObject: {
    name: any;
    email: any;
    mobile: any;
    password: any;
    repassword: any;
  }) => {
    const url = "https://shreddersbay.com/API/user_api.php?action=signup";

    const formData = new FormData();

    formData.append("name", userObject.name);
    formData.append("email", userObject.email);
    formData.append("mobile", userObject.mobile);
    formData.append("password", userObject.password);
    formData.append("repassword", userObject.repassword);
    console.log("again user object is :-", userObject);

    try {
      let result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (result.status === 200) {
        const response = await result.json();
        Alert.alert(
          "Sign Up Successful",
          `Sign up was successful. Please check and verify on  your email ID: ${email}.\n${response.msg}`,
          [
            {
              text: "OK",
              onPress: () => {
                authenticateWithFirebase(email);
                // handleIsshowLogin() // Navigate to 'Login' screen
              },
            },
          ],
          { cancelable: false }
        );
        console.log("Response:", response);
      } else {
        console.error("Request failed with status:", result.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  const authenticateWithFirebase = async (email) => {
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
          name: name || "", // Set name if provided, otherwise empty string
          email,
          mobile: phone || "", // Set mobile if provided, otherwise empty string
          password: password || "", // Set password if provided, otherwise empty string
          idf: userIdf,
        };

        await setDoc(userDocumentRef, userObjectf);
        console.log("User signed up successfully:", userObjectf);
      }
    } catch (error) {
      console.error("Error authenticating with Firebase:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.signuplogo}>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/sign-up.webp")}
          />
        </View>

        <View style={{ padding: 8, marginTop: 2 }}>
          <View style={styles.container2}>
            <FontAwesome
              name="user-o"
              size={30}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="Name"
              style={styles.textinput}
              onChangeText={handleNameChange}
            />
            <Text style={styles.error}>{nameError}</Text>
          </View>

          <View style={styles.container2}>
            <MaterialCommunityIcons
              name="email-outline"
              size={30}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              style={styles.textinput}
            />

            <Text style={styles.error}>{emailError}</Text>
          </View>

          <View style={styles.container3}>
            <Ionicons
              name="lock-closed-outline"
              size={30}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
              textContentType="password"
              style={styles.textinput}
            />
            <Text style={styles.error}>{passwordError}</Text>

            <TouchableOpacity onPress={() => {}}>
              <Text style={{ fontSize: 17, marginTop: 14, color: "#002699" }}>
                Forgot?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container3}>
            <Ionicons
              name="lock-closed-outline"
              size={30}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="ConfirmPassword"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={true}
              textContentType="password"
              style={styles.textinput}
            />
            <Text style={styles.error}>{confirmPasswordError}</Text>
          </View>

          <View style={styles.container2}>
            <MaterialCommunityIcons
              name="phone-outline"
              size={30}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="PhoneNo"
              value={phone}
              onChangeText={handlePhoneChange}
              keyboardType="numeric"
              style={styles.textinput}
            />
            <Text style={styles.error}>{phoneError}</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={handleSubmit} style={styles.login}>
            <Text style={styles.loginText}>SignUp</Text>
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
          {/* <Text>this is Google User's details:-{ }</Text> */}
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

          <TouchableOpacity onPress={() => {}} style={styles.container5}>
            <Ionicons
              name="phone-portrait"
              size={26}
              color="blue"
              style={styles.icon2}
            />
          </TouchableOpacity>
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
              style={{
                color: "#002699",
                fontWeight: "700",
                fontSize: 18,
              }}
              onPress={handleIsshowLogin}
              
            >
              Login
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

  signuplogo: {
    justifyContent: "center",
  },

  tinyLogo: {
    width: 300,
    height: 70,
  },

  text: {
    fontFamily: "sans-sarif",
    fontSize: 30,
    fontWeight: "500",
    color: "#333",
    marginTop: 1,
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
    marginTop: 2,
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
  error: {
    color: "red",
    fontSize: 18,
  },
});

export default Sign_up;
