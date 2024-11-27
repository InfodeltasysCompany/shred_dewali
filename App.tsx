import { View, Text, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
// import ConCompo from './components/ConCompo'
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Device from 'expo-device';

// import { Provider } from 'react-redux'
// import store from './redux/store'
import { CommonActions, NavigationContainer, RouteProp, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import T1Screen1 from './Navigation/Tab1/T1Screen1'
import T2Screen1 from './Navigation/Tab2/T2Screen1';
import T3Screen1 from './Navigation/Tab3/T3Screen1'
import T4Screen1 from './Navigation/Tab4/T4Screen1'
// import T1Screen2 from './Navigation/Tab1/T1Screen2'
// import T1Screen3 from './Navigation/Tab1/T1Screen3'
import T2Screen3 from './Navigation/Tab2/T2Screen3'
import T2Screen2 from './Navigation/Tab2/T2Screen2'
import T3Screen2 from './Navigation/Tab3/T3Screen2'
import T3Screen3 from './Navigation/Tab3/T3Screen3'
import T4Screen2 from './Navigation/Tab4/T4Screen_myorder_chooseBuySell'
// import T1Screen1modal1 from './Navigation/Tab1/T1Screen1modal1';
import Login from './components/Credential/Login';
import Signup from './components/Credential/Signup';
import shoppingCart from './components/ShoppingCart';
import ShoppingCart from './components/ShoppingCart';
import OpenCamAndGalT3S1 from './Navigation/Tab3/T3Sreen4';
import T2Screen3AddAddress2 from './Navigation/Tab2/T2Screen3AddAddress2';
import T2Screen2AddAddress from './Navigation/Tab2/T2Screen2AddAddress';
import * as Permissions from 'expo-permissions';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import BuyingChats from './Navigation/Tab5_buy/BuyingChats';
// import SellingChats from './Navigation/Tab5_buy/SellingChats';
import SCurrent from './Navigation/Tab6_sell/SCurrent';
import SCompleted from './Navigation/Tab6_sell/SCompleted';
// import SCancel from './Navigation/Tab6_sell/SCancel';
import ChatBlank from './Navigation/Conversation/ChatBlank';
// import T4Screen3 from './Navigation/Tab4/T4Screen3';
import { Addbtnchanged, Addbtndef } from './components/Addbtn';
import { AuthContext, UserAuthProvider } from './redux/ContextApi/UserAuthProvider';

import App2 from './Navigation/App2';
import { handlePushNotifications } from './utils/NotificaitonFunction';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import OrderDetailModal from './Navigation/Tab1/OrderComps/OrderDetailModal';
import { app } from './Config/Firebaseconfig';
import Test1 from './ReuseComponent/Test1';
import Combine from './Navigation/Conversation/Bidding/CombineBidding';
import Chat_MakeOfferModal from './Navigation/Conversation/Order/Chat_MakeOfferModal';
import BuyingChats from './Navigation/Conversation/Order/BuyingChats';
import SellChats from './Navigation/Conversation/Order/SellChats';

const App = () => {
  
useEffect(() => {
  async function registerForPushNotifications() {
    if (!Device.isDevice) {
      alert('Must use a physical device for Push Notifications');
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notifications!');
      return null;
    }

    // Insert additional logic for handling the push token here if needed
  }

  // Call the function immediately after defining it
  registerForPushNotifications();
}, []);
 
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const TTab = createMaterialTopTabNavigator()
  return (
    <UserAuthProvider>
      {/* <Provider store={store}> */}
        <App2 />
        {/* <OrderDetailModal/> */}
      {/* </Provider> */}
      {/* <Test1/> */}
      {/* <Combine/> */}
      {/* <Chat_MakeOfferModal visible={undefined} closeModal={undefined}/> */}
      {/* <SellChats/> */}
    </UserAuthProvider>
  );
}

export default App

