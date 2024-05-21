import { Alert, Animated, Easing, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../redux/ContextApi/UserAuthProvider';
import LoginModal from '../../components/Credential/LoginModal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, Ionicons, MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';

const T4Screen1 = ({ navigation }) => {

  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp,f_email, f_mobile, f_id, f_name, f_password  } = state;
  const [googleUserCred, setgoogleUserCred] = useState(null);
  const [appUserCred, setappUserCred] = useState(null);
  const [userDataLOCAL_STORAGE, setLocalUserData] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
   
    if (userIdApp) {
      getProfile(userIdApp);
      setUserId(userIdApp);
      setgoogleUserCred(gUserCred);
      setappUserCred(userCred);
    }
    const extractId = (data: { [key: string]: any } | null) => {
      if (data && data['0']) {
        const id = data['0'].id;
        setUserId(id);
        // fetchApiData(id);
      } else {
        console.log('ID not found in the parsed data');
      }
    };
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('UserCred');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setLocalUserData(parsedData);
          extractId(parsedData);
        } else {
          console.log('No data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
        };
        fetchData();
        console.log("UserCred==>",userCred)

  }, []);
const [visible, setVisible] = useState(true)
  const orderDetail = () => {
    navigation.navigate("My Order");
  };

  const AddAdress = () => {
    navigation.navigate("T2Screen2");
  };

  const getProfile = async (uid) => {
    console.log("profileid is from getprofile:", uid);
    if (uid != null) {
      try {
        const response = await fetch(
          `https://shreddersbay.com/API/user_api.php?action=select_id&user_id=${userIdApp}`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const userProfileData = await response.json();
          console.log("Profile fetched successfully:", userProfileData);
          setProfileData(userProfileData);
        } else {
          console.error("Failed to get profile:", response.status);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
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
              navigation.navigate("Tab1", { screen: "T1Screen1" });
              
              setState(prevState => ({ ...prevState, userCred: null,gUserCred:null,
                userIdApp:null,
                f_email:null,
                f_mobile:null,
                f_id:null,
                f_name:null,
                f_password:null }));

            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
    }
  };

 
  ///////////////////////////////////////////////////////////////////////////
  const fadeIn = new Animated.Value(0);

  const fadeInAnimation = () => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    fadeInAnimation();
  }, []);
  const [isshow, setIsshow] = useState(true)





  if (userIdApp) {
    return (
      <View
      style={{
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 30,
        height: '100%',
        marginTop: 40,
      }}
    >
      <View
        style={{
          padding: 20,
          backgroundColor: "#00457E",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          marginTop: 10,
        }}
      >
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 25,
            }}
          >
            {profileData[0]?.name}
          </Text>
        </View>
      </View>


      <View>
        <Text  style={styles.text3}>Account Settings</Text>
      </View>


      <View style={{ marginTop: 20 , }}>
        <TouchableWithoutFeedback
          onPress={orderDetail}
          style={{ marginVertical: 7, }}
        >
          <View style={styles.button}>
            <View style={styles.icon}>
              <View>
                <MaterialCommunityIcons
                  name="bucket-outline"
                  style={{
                    fontSize: 20,
                    padding: 6,
                    marginRight: 10,
                    backgroundColor: "blue",
                    borderRadius: 50,
                    color: "white",
                  }}
                />
              </View>

              <View>
                <Text style={styles.text1}>My Order</Text>
              </View>
            </View>

            <View style={styles.icon1}>
              <Feather
                name="chevron-right"
                style={{
                  fontSize: 25,
                  color: "gray",
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={{ marginVertical: 7 }}
          onPress={AddAdress}
        >
          <View style={styles.button}>
            <View style={styles.icon}>
              <View>
                <Ionicons
                  name="location-outline"
                  style={{
                    fontSize: 20,
                    padding: 6,
                    marginRight: 10,
                    backgroundColor: "#1aff1a",
                    borderRadius: 50,
                    color: "black",
                  }}
                />
              </View>

              <View>
                <Text style={styles.text1}>Add Address</Text>
              </View>
            </View>

            <View style={styles.icon1}>
              <Feather
                name="chevron-right"
                style={{
                  fontSize: 25,
                  color: "gray",
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

        {/* <TouchableWithoutFeedback style={{ marginVertical: 7 }}>
          <View style={styles.button}>
            <View style={styles.icon}>
              <View>
                <Ionicons
                  name="notifications-outline"
                  style={{
                    fontSize: 20,
                    padding: 6,
                    marginRight: 10,
                    backgroundColor: "#ffff00",
                    borderRadius: 50,
                    color: "black",
                  }}
                />
              </View>

              <View>
                <TouchableOpacity>
                  <Text style={styles.text1}>Notifications</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.icon1}>
              <Feather
                name="chevron-right"
                style={{
                  fontSize: 25,
                  color: "gray",
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback> */}

        <TouchableWithoutFeedback
          onPress={handleLOgOUt}
          style={{ marginVertical: 7 }}
        >
          <View style={styles.button}>
            <View style={styles.icon}>
              <View>
                <MaterialCommunityIcons
                  name="logout"
                  style={{
                    fontSize: 20,
                    padding: 6,
                    marginRight: 10,
                    backgroundColor: "#993333",
                    borderRadius: 50,
                    color: "white",
                  }}
                />
              </View>

              <View>
                <Text style={styles.text1}>Logout</Text>
              </View>
            </View>

            <View style={styles.icon1}>
              <Feather
                name="chevron-right"
                style={{
                  fontSize: 25,
                  color: "gray",
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>

    )
  } else {
    return (
     
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <LoginModal navigation={navigation} visible={visible} setVisible={setVisible} />
  <View style={{alignContent:'center',justifyContent:"center"}}>
    <View style={{alignContent:'center',justifyContent:'center'}}>

    <Text style={{ fontSize:26,margin:30 }}>Log in now to get started!</Text>
    </View>
    <TouchableOpacity onPress={() => setVisible(true)} style={{alignItems:'center',justifyContent:'center'}}>
    <AntDesign name='adduser' size={350} color={"black"}/>

      <Text style={{ color: 'blue', fontSize: 36, textDecorationLine: 'underline' }}>Login</Text>
    </TouchableOpacity>
  </View>
</View>

    )
  }
}

export default T4Screen1



const styles = StyleSheet.create({
  containerlogin: {
    flex: 1,
    alignItems: "center",
  },
  sliderContainer: {
    width: "90%", // Set the width of the container view
    height: 550,
    marginTop: 40,
    // Set the height of the container view
  },
  wrapper: {},
  slide: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: "100%", // Set the image width to fill the container
    height: "100%", // Set the image height to fill the container
    resizeMode: "cover",
    borderRadius: 20,
  },

  icon1: {},
  button: {
    flexDirection: "row",
    justifyContent: "space-between", // To evenly space the two elements
    alignItems: "center", // Align items vertically
    paddingHorizontal: 20,
    
    paddingVertical: 8,// Add padding as needed
    // Other styles
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    // Other styles for icon container
  },

  text1: {
    fontSize: 18,
    textAlign: "center",
    color: "#000",
    fontFamily: 'sans-sarif',
  },

  text3: {
    fontSize: 22,
    textAlign: "left",
    color: "#000",
    fontWeight:'700',
    paddingHorizontal: 25,
    paddingVertical: 2,
    marginTop: 20,
    fontFamily: 'sans-sarif',
  },


  text2: {
    fontSize: 14,
  },

  btnview: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#a6a6a6",
    justifyContent: "center",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 15,
    marginHorizontal: 5,
  },
  loginButton: {
    backgroundColor: "#3498db",
  },
  signupButton: {
    backgroundColor: "#2ecc71",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});