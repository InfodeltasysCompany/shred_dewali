import { View, Text, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
// import ConCompo from './components/ConCompo'
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from 'react-native-vector-icons'

import { Provider } from 'react-redux'
import store from './redux/store'
import { CommonActions, NavigationContainer, RouteProp, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import T1Screen1 from './Navigation/Tab1/T1Screen1'
import T2Screen1 from './Navigation/Tab2/T2Screen1'
import T3Screen1 from './Navigation/Tab3/T3Screen1'
import T4Screen1 from './Navigation/Tab4/T4Screen1'
import T1Screen2 from './Navigation/Tab1/T1Screen2'
import T1Screen3 from './Navigation/Tab1/T1Screen3'
import T2Screen3 from './Navigation/Tab2/T2Screen3'
import T2Screen2 from './Navigation/Tab2/T2Screen2'
import T3Screen2 from './Navigation/Tab3/T3Screen2'
import T3Screen3 from './Navigation/Tab3/T3Screen3'
import T4Screen2 from './Navigation/Tab4/T4Screen_myorder_chooseBuySell'
import T1Screen1modal1 from './Navigation/Tab1/T1Screen1modal1';
import Login from './components/Credential/Login';
import Signup from './components/Credential/Signup';
import shoppingCart from './components/ShoppingCart';
import ShoppingCart from './components/ShoppingCart';
import OpenCamAndGalT3S1 from './Navigation/Tab3/T3Sreen4';
import T2Screen3AddAddress2 from './Navigation/Tab2/T2Screen3AddAddress2';
import T2Screen2AddAddress from './Navigation/Tab2/T2Screen2AddAddress';
import * as Permissions from 'expo-permissions';
import BCurrent from './Navigation/Tab5_buy/BCurrent';
import BCompleted from './Navigation/Tab5_buy/BCompleted';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllChats from './Navigation/Tab5_buy/AllChats';
import BuyingChats from './Navigation/Tab5_buy/BuyingChats';
import SellingChats from './Navigation/Tab5_buy/SellingChats';
import SCurrent from './Navigation/Tab6_sell/SCurrent';
import SCompleted from './Navigation/Tab6_sell/SCompleted';
import SCancel from './Navigation/Tab6_sell/SCancel';
import ChatBlank from './Navigation/Tab5_buy/ChatBlank';
import T4Screen3 from './Navigation/Tab4/T4Screen3';
import { Addbtnchanged, Addbtndef } from './components/Addbtn';
import { UserAuthProvider } from './redux/ContextApi/UserAuthProvider';
// import FullPageModal from './components/Credential/FullPageModal';

import { FullPageModal } from './components/Credential/FullPageModal';










const App = () => {





  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const TTab = createMaterialTopTabNavigator()

  
  
  const Stack1 = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='T1Screen1' component={T1Screen1} options={{ headerShown: false }} />
        <Stack.Screen name='T1Screen2' component={T1Screen2} />
        <Stack.Screen name='T1Screen3' component={T1Screen3} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name='ShoppingCart' component={ShoppingCart} options={{
          headerTitle: '', // Hide the header title
        }} />
        <Stack.Screen name='T1Screen1modal1' component={T1Screen1modal1} />
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
        <Stack.Screen name='T3Screen4' component={OpenCamAndGalT3S1} />
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
        <Stack.Screen name='MyOrderBuy' component={InsideMYOrder_Buy} />
        <Stack.Screen name='MyOrderSell' component={InsideMYOrder_Sell} />
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
        <TTab.Screen name='BUYING' component={BuyingChats} />
        {/* <Stack.Screen name='ChatBlank' component={ChatBlank}/> */}
        <TTab.Screen name='SELLING' component={SellingChats} />
        {/* <TTab.Screen name='BCurrent' component={BCurrent} />
        <TTab.Screen name='BCompleted' component={BCompleted} /> */}
      </TTab.Navigator>
    )
  }
  const InsideMYOrder_Buy = () => {
    return (
      <TTab.Navigator>
        <TTab.Screen name='BCurrent' component={BCurrent} />
        <TTab.Screen name='BCompleted' component={BCompleted} />
      </TTab.Navigator>
    )
  }
  const InsideMYOrder_Sell = () => {
    return (
      <TTab.Navigator>
        <TTab.Screen name='SCurrent' component={SCurrent} />
        <TTab.Screen name='SCompleted' component={SCompleted} />
        {/* <TTab.Screen name='SCancel' component={SCancel} /> */}

      </TTab.Navigator>
    )
  }
  return (
    <UserAuthProvider>

      <Provider store={store}>


        <NavigationContainer>
          {/* <Tab.Navigator
      initialRouteName="Tab1"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;
          
          // Set icons based on the route name and focused state
          if (route.name === 'Tab1') {
            iconComponent = focused ? 
              <Ionicons name="home" size={size} color={color} /> : 
              <Feather name="home" size={size} color={color} />;
          } else if (route.name === 'Scrap Cart') {
            iconComponent = focused ? 
              <Ionicons name="cart" size={size} color={color} /> : 
              <Feather name="cart" size={size} color={color} />;
          }
          // Add additional conditions for other tab names and icons
          
          return iconComponent;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >          <Tab.Screen
            name="Tab1"
            component={Stack1}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" 
                color={color} 
                size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Scrap Cart"
            component={Stack2}
            options={({ navigation }) => ({
              headerShown: false,
              tabBarLabel: "Scrap Cart",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cart-outline" color={color} size={size} />
              ),
            })}
          />

          <Tab.Screen
            name="Scrap Item"
            component={Stack3}
            options={{
              tabBarLabel: "Sell",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Feather name="plus-circle" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Chat"
            component={Stack5}
            options={{
              tabBarLabel: "chat",
              headerTitleAlign: "center",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="chatbubbles-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Setting"
            component={Stack4}
            options={{
              tabBarLabel: "Setting",
              headerShown: false,
              headerTitle: "setting",
              tabBarIcon: ({ color, size }) => (
                <Feather name="settings" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator> */}


          <Tab.Navigator
            initialRouteName="Tab1"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconComponent;

                // Set icons based on the route name and focused state
                if (route.name === 'Tab1') {
                  iconComponent = focused ?
                    <Ionicons name="home" size={size} color={color} /> :
                    <Ionicons name="home-outline" size={size} color={color} />;
                } else if (route.name === 'Scrap Cart') {
                  iconComponent = focused ?
                    <Ionicons name="cart" size={size} color={color} /> :
                    <Feather name="shopping-cart" size={size} color={color} />;
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
                tabBarLabel: "Home1",
              }}
            />

            <Tab.Screen
              name="Scrap Cart"
              component={Stack2}
              options={({ navigation }) => ({
                headerShown: false,
                tabBarLabel: "Scrap Cart",
              })}
            />
            {/* 
              <Tab.Screen
                name="Sell"
                // component={Stack3}
                component={FullPageModal}
                listeners={({ navigation }) => ({
                  tabPress: (e) => {
                    e.preventDefault();
                    navigation.navigate('Sell', { onClose: () => navigation.navigate("Tab1",{screen:'T1Screen'}) });
                  },
                })}
                options={{ tabBarLabel: "Sell", headerTitleAlign: "center" }}
        
              /> */}
          

            
          <Tab.Screen
            name="Scrap Item"
            component={Stack3}
            options={({navigation})=>({
              tabBarLabel: "Sell",
              headerShown: false,
            })}
          />

            <Tab.Screen
              name="Chat"
              component={Stack5}
              options={{
                tabBarLabel: "Chat",
                headerTitleAlign: "center",
              }}
            />


            <Tab.Screen
              name="Setting"
              component={Stack4}
              options={{
                tabBarLabel: "Setting",
                headerShown: false,
                headerTitle: "Setting",
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>



      </Provider>
    </UserAuthProvider>
  );
}

export default App


