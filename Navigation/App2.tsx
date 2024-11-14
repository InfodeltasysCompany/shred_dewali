import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import OpenCamAndGalT3S1 from '../Navigation/Tab3/T3Sreen4';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import T1Screen1 from './Tab1/T1Screen1';
import T4Screen2 from '../Navigation/Tab4/T4Screen_myorder_chooseBuySell'
// import T1Screen2 from './Tab1/T1Screen2';
// import T1Screen3 from './Tab1/T1Screen3';
import Login from '../components/Credential/Login';
import Signup from '../components/Credential/Signup';
import ShoppingCart from '../components/ShoppingCart';
// import T1Screen1modal1 from './Tab1/T1Screen1modal1';
import T2Screen1 from './Tab2/T2Screen1';
import T2Screen2AddAddress from './Tab2/T2Screen2AddAddress';
import T2Screen3AddAddress2 from './Tab2/T2Screen3AddAddress2';
import T2Screen2 from './Tab2/T2Screen2';
import T2Screen3 from './Tab2/T2Screen3';
import T3Screen1 from './Tab3/T3Screen1';
import T3Screen2 from './Tab3/T3Screen2';
import T3Screen3 from './Tab3/T3Screen3';
import T4Screen1 from './Tab4/T4Screen1';
import AllChats from './Tab5_buy/AllChats';
import BuyingChats from './Tab5_buy/BuyingChats';
import SellingChats from './Tab5_buy/SellingChats';
import BCurrent from './Tab5_buy/BCurrent';
import BCompleted from './Tab5_buy/BCompleted';
import SCurrent from './Tab6_sell/SCurrent';
import SCompleted from './Tab6_sell/SCompleted';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Addbtnchanged, Addbtndef } from '../components/Addbtn';
import { AuthContext } from '../redux/ContextApi/UserAuthProvider';
import LoginModal from '../components/Credential/LoginModal';
import ProductCatgry from './Tab3/ProductCatgry';
import OrderAuction from './Tab2/OrderAuction';
import ONBoarding from '../OnBoard/ONBoarding';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TTab = createMaterialTopTabNavigator()



const Stack1 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='T1Screen1' component={T1Screen1} options={{ headerShown: false }} />
      {/* <Stack.Screen name='T1Screen2' component={T1Screen2} />
      <Stack.Screen name='T1Screen3' component={T1Screen3} /> */}
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name='ShoppingCart' component={ShoppingCart} options={{
        headerTitle: '', // Hide the header title
      }} />
      {/* <Stack.Screen name='T1Screen1modal1' component={T1Screen1modal1} /> */}
      {/* //// */}
      <Stack.Screen name='T2Screen1' component={T2Screen1} options={{
        headerTitle: 'Scrap Cart',
        headerTitleAlign: 'center',
      }} />
      {/* /// */}
      <Stack.Screen name='myorder' component={InsideMYOrder_Buy} />
    </Stack.Navigator>
  )
}
const Stack2 = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name='My Order' component={OrderAuction}  options={{
            headerShown: false, // Hide the header if needed
          }}  />

      {/* <Stack.Screen name='My Order' component={T4Screen2} /> */}
      <Stack.Screen name='BuyOrder-Detail' component={InsideMYOrder_Buy} />
      <Stack.Screen name='SellOrder-Detail' component={InsideMYOrder_Sell} />
      <Stack.Screen name='T2Screen1' component={T2Screen1} options={{
        headerTitle: 'Scrap Cart',
        headerTitleAlign: 'center',
      }} />

      <Stack.Screen
        name='T2Screen2AddAddress'
        component={T2Screen2AddAddress}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='T2Screen3AddAddress2'
        component={T2Screen3AddAddress2}
        options={{ headerShown: false }}


      />


      <Stack.Screen name='T2Screen2' component={T2Screen2} options={{
        headerTitle: 'Add Address',
        headerTitleAlign: 'center',
      }}
      />
      <Stack.Screen name='T2Screen3' component={T2Screen3}
        options={{
          headerTitle: 'Save Address',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name='T1Screen1' component={T1Screen1} options={{ headerShown: false }} />
      <Stack.Screen name='T3Screen1'
        component={T3Screen1}
        options=
        {{
          headerTitle: 'Scrap Item',
          headerTitleAlign: 'center',
          cardStyle: { backgroundColor: '#fff' },

        }}


      />


    </Stack.Navigator>
  )
}
const Stack3 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='T3Screen1'
        component={T3Screen1}
        options=
        {{
          headerTitle: 'Create Scrap',
          headerTitleAlign: 'center',
          cardStyle: { backgroundColor: '#fff' },

        }}
      />
      <Stack.Screen name='My Order' component={T3Screen2} />
      <Stack.Screen name='T3Screen3' component={T3Screen3} />
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name='T1Screen1' component={T1Screen1} options={{ headerShown: false }} />
      <Stack.Screen name='Auction Detail' component={OpenCamAndGalT3S1}
        options={{
          headerStyle: { backgroundColor: '#00457E' }, // Set the background color of the header
          headerTintColor: 'white', // Set the color of the header text (title and back button)
          headerTitleStyle: { fontWeight: 'bold' }, // Optional: Customize the style of the header title
        }} />
      <Stack.Screen name='ShoppingCart' component={ShoppingCart} options={{
        headerTitle: '', // Hide the header title
      }} />
      <Stack.Screen name='Auction' component={T3Screen2} />

    </Stack.Navigator>
  )
}
const Stack4 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='T3Screen1' component={T4Screen1} options={{ headerShown: false }} />
      <Stack.Screen name='My Order' component={T4Screen2} />
      <Stack.Screen name='T3Screen3' component={T4Screen1} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name='T1Screen1' component={T1Screen1} options={{ headerShown: false }} />
      <Stack.Screen name='BuyOrder-Detail' component={InsideMYOrder_Buy} />
      <Stack.Screen name='SellOrder-Detail' component={InsideMYOrder_Sell} />
      <Stack.Screen name='T2Screen2' component={T2Screen2} options={{
        headerTitle: 'Add Address',
        headerTitleAlign: 'center',

        headerStyle: {
          backgroundColor: 'blue', // Change the background color here
        },
        headerTintColor: '#fff', // Change the text color (optional)
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      />
    </Stack.Navigator>
  )
}

const Stack5 = () => {
  return (


    <TTab.Navigator>
      <TTab.Screen name='ALL' component={AllChats} />
      <TTab.Screen name='BIDDING' component={BuyingChats} />
    
    </TTab.Navigator>
  )
}
const InsideMYOrder_Buy = () => {
  return (
    <TTab.Navigator>
      <TTab.Screen name='Current' component={BCurrent} />
      <TTab.Screen name='Complete' component={BCompleted} />
    </TTab.Navigator>
  )
}
const InsideMYOrder_Sell = () => {
  return (
    <TTab.Navigator>
      <TTab.Screen name='Current' component={SCurrent} />
      <TTab.Screen name='Complete' component={SCompleted} />
      {/* <TTab.Screen name='SCancel' component={SCancel} /> */}

    </TTab.Navigator>
  )
}
const MainTabsComponents = () => {
  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password, isloginModalVisible } = state;

  return (
    <Tab.Navigator
      initialRouteName="Tab1"
      screenOptions={({ route }) => ({

        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;
          // funct(route.name)
          // Set icons based on the route name and focused state
          if (route.name === 'Tab1') {
            iconComponent = focused ?
              <Ionicons name="home" size={size} color={color} /> :
              <Ionicons name="home-outline" size={size} color={color} />;
          } else if (route.name === 'Scrap Cart') {
            iconComponent = focused ?
              <FontAwesome name="inbox" size={size} color={color} /> :
              <Feather name="inbox" size={size} color={color} />;
          } else if (route.name === 'Scrap Item') {
            iconComponent = focused ?
              // <AntDesign name="pluscircle" size={50} color={color} />
              <Addbtnchanged color={color} />
              :
              // <Feather name="plus-circle" size={50} color={color} /> ;
              <Addbtndef color={'#00457E'} />

          } else if (route.name === 'Chat') {
            iconComponent = focused ?
              <Ionicons name="chatbubbles" size={size} color={color} /> :
              <Ionicons name="chatbubbles-outline" size={size} color={color} />;

          } else if (route.name === 'Setting') {
            iconComponent = focused ?
              <Ionicons name="person" size={size} color={color} /> :
              <Ionicons name="person-outline" size={size} color={color} />;

          }
          // Add additional conditions for other tab names and icons

          return iconComponent;
        },
        tabBarActiveTintColor: '#00457E',
        tabBarInactiveTintColor: 'gray',

        style: {
          backgroundColor: 'black', // Background color of the tab bar
          borderTopWidth: 1, // Border top width
          borderTopColor: 'rgba(0, 0, 0, 0.2)', // Border top color
        },
        // tabBarActiveBackgroundColor:"black",
        tabBarStyle: { borderRadius: 0, height: 50, elevation: 5, backgroundColor: "#e6f4ff" },

      })}
    >
      <Tab.Screen
        name="Tab1"
        component={Stack1}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
        }}

      />

      <Tab.Screen
        name="Scrap Cart"
        component={Stack2}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: "My Order",
        })}
        listeners={({ navigation }) => ({
          tabPress: event => {
            if (!userIdApp) {
              event.preventDefault();
              navigation.navigate('LoginModal')
            }
          }
        })
        }
      />
      <Tab.Screen
        name="Scrap Item"
        component={Stack3}
        options={({ navigation }) => ({
          tabBarLabel: "Sell",
          headerShown: false,
        })}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('ProductCatgry');
          }
        })}
      />

      <Tab.Screen
        name="Chat"
        component={Stack5}
        options={{
          tabBarLabel: "Chat",
          headerTitleAlign: "center",
        }}
        listeners={({ navigation }) => ({
          tabPress: event => {
            // event.preventDefault();
            if (!userIdApp) {
              event.preventDefault();
              navigation.navigate('LoginModal')
            }
          }
        })
        }
      />
      <Tab.Screen
        name="Setting"
        component={Stack4}
        options={{
          tabBarLabel: "Setting",
          headerShown: false,
          headerTitle: "Setting",
        }}
        listeners={({ navigation }) => ({
          tabPress: event => {
            // event.preventDefault();
            if (!userIdApp) {
              event.preventDefault();
              navigation.navigate('LoginModal')
            }
          }
        })
        }
      />
    </Tab.Navigator>
  )
}
const App2 = () => {

  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password, isloginModalVisible } = state;
  const [isOnBoardEnable, setIsOnBoardEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('onboardingCompleted');
        if (value !== null) {
          setIsOnBoardEnable(true);
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Onboarding" component={ONBoarding} /> */}

        {/* {isOnBoardEnable ? (
          <> 
        <Stack.Screen name="Main" component={MainTabsComponents} />
        <Stack.Screen name='LoginModal' component={LoginModal} options={{
          headerTitle: 'Scrap Cart',
          headerTitleAlign: 'center',
          headerShown: false
        }} />
        <Stack.Screen name='ProductCatgry' component={ProductCatgry} options={{
          headerTitle: 'Product Catogory',
          headerTitleAlign: 'center',
          headerShown: false
        }} />
          </>
        ) : ( 
           <Stack.Screen name="Onboarding" component={ONBoarding} /> 
        )}  */}
        {!isOnBoardEnable && (
          <Stack.Screen name="Onboarding" component={ONBoarding} />

        )}
        <Stack.Screen name="Main" component={MainTabsComponents} />
        <Stack.Screen name='LoginModal' component={LoginModal} options={{
          headerTitle: 'Scrap Cart',
          headerTitleAlign: 'center',
          headerShown: false
        }} />
        <Stack.Screen name='ProductCatgry' component={ProductCatgry} options={{
          headerTitle: 'Product Catogory',
          headerTitleAlign: 'center',
          headerShown: false
        }} />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App2