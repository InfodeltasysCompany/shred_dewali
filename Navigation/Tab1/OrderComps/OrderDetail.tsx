import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, TouchableHighlight, useWindowDimensions, Alert } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import ImageSlider from 'react-native-image-slider';
import { IMG_URL } from '../../../ReuseComponent/Env';
import Chat_MakeOfferModal from '../../Conversation/Order/Chat_MakeOfferModal';
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';
import LoginModal from '../../../components/Credential/LoginModal';


const { width } = Dimensions.get('window');

const OrderDetail = ({ item ,navigation}) => {
  const [,,,,GChatstate,setGChatstate] = useContext(AuthContext);
  const imgurl = IMG_URL;
  const [images, setImages] = useState([]);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [ischatmakeoffermodalVisible, setIschatmakeoffermodalVisible] = useState(false);
  const [isloginModalVisible, setIsloginModalVisible] = useState(false);
  const [routes] = useState([
    { key: 'first', title: 'PRODUCT' },
    { key: 'second', title: 'CUSTOMER' },
  ]);

  useEffect(() => {
    // console.log("itemmmm:=>", item);
    if (item && item.length > 0 && item[0]?.filename) {
      const imageUrls = item[0].filename
        .split(",")
        .map(filename => imgurl + filename.trim())
        .filter(url => url); // Filter out empty or null URLs
      setImages(imageUrls);
    } 
  }, [item, imgurl]);
  
  

  // const handleBuyPressOnMOdal = async (bookingId: any, getOrderResponse: any) => {

  //   try {
  //     const formdata = new FormData();
  //     formdata.append("booking_id", bookingId);
  //     formdata.append("user_id", userIdApp);

  //     const response = await fetch(
  //       `${BASE_URL}/orders_api.php?action=accept`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "multipart/form-data",
  //         },
  //         body: formdata,
  //       }
  //     );

  //     if (response.ok) {
  //       const aceptData = await response.json();
  //       // setacceptData(aceptData);
       
  //     } else {
  //       console.error("Accept API request failed:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#00457E' }}
      labelStyle={{ color: 'white' }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 10 }}>
        <ImageSlider
          loopBothSides
          autoPlayWithInterval={2000}
          images={images}
          customSlide={({ index, item, style }) => (
            <View key={index} style={style}>
              <Image source={{ uri: item }} style={{ width: '100%', height: 300 }} />
            </View>
          )}
          customButtons={(position, move) => (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
              {images.map((_, index) => (
                <TouchableHighlight
                  key={index}
                  underlayColor="#ccc"
                  onPress={() => move(index)}
                  style={{
                    margin: 5,
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: position === index ? '#3399ff' : '#ccc'
                  }}
                >
                  <Text style={{ color: position === index ? '#fff' : '#000' }}>
                    {index + 1}
                  </Text>
                </TouchableHighlight>
              ))}
            </View>
          )}
        />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'first':
              return <FirstRoute item={item} />;
            case 'second':
              return <SecondRoute item={item} />;
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ width: 350, height: '40%', backgroundColor: '#FFFFFF' }}
      />

      <View style={styles.buttonContainer}>
        {item[0]?.booking_id ? (
          <>
            <TouchableOpacity onPress={() => {
             Alert.alert(
              "Beware of Fraud", // Title of the alert
              "Don't share your personal information like ATM number, OTP, and don't make any money transactions.", // Message
              [{text:"cancel",onPress:()=>console.log("cancel is pressed"),style:"cancel"},{
                text:"OK",
                onPress:()=>{
                  if(Object.keys(GChatstate.productdetails).length>0 && Object.keys(GChatstate.userdetails).length>0){
                    setIschatmakeoffermodalVisible(!ischatmakeoffermodalVisible)
                  }else{
                    Alert.alert("You are not logged in ","Login please.",[
                      {text:"cancel",
                        style:"cancel",
                        onPress:()=>{console.log("cancel pressed")}
                      },{
                        text:"Ok",
                        onPress:()=>{console.log("Ok pressed");
                          setIsloginModalVisible(!isloginModalVisible);

                        }
                      }
                    ])
                  }
                }
              }],{cancelable:false})
              
            }} style={styles.buttonchat}>
              <Text style={styles.buttonTextChat}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Alert.alert("Contact to Seller","Your contact details will be shared to the seller.",
                [{text:"cancel",onPress:()=>console.log("cancel is pressed"),style:"cancel"},{
                text:"OK",
                onPress:()=>{
                  if(Object.keys(GChatstate.productdetails).length>0 && Object.keys(GChatstate.userdetails).length>0){
                    setIschatmakeoffermodalVisible(!ischatmakeoffermodalVisible)
                  }else{
                    Alert.alert("You are not logged in ","Login please.",[
                      {text:"cancel",
                        style:"cancel",
                        onPress:()=>{console.log("cancel pressed")}
                      },{
                        text:"Ok",
                        onPress:()=>{console.log("Ok pressed");
                          setIsloginModalVisible(!isloginModalVisible);

                        }
                      }
                    ])
                  }
                }
              }],{cancelable:false})
              
            }} style={styles.buttonbuy}>
              <Text style={styles.buttonTextBuy}>Buy</Text>
            </TouchableOpacity>
          
          </>
        ) : (
          <TouchableOpacity onPress={() => {}} style={styles.buttonbuy}>
            <Text style={styles.buttonTextBuy}>Start Bidding</Text>
          </TouchableOpacity>
        )}
      </View>
      <Chat_MakeOfferModal visible={ischatmakeoffermodalVisible} closeModal={()=>{setIschatmakeoffermodalVisible(!ischatmakeoffermodalVisible)}}/>
      <LoginModal navigation={navigation} visible={isloginModalVisible} setVisible={setIsloginModalVisible} />
      </View>
  );
};

const FirstRoute = ({ item }) => {
  const product = item[0] || {};
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 10 }}>
      <Text style={styles.detail}>PRODUCT DETAIL</Text>
      {[
        { label: 'Booking_ID', value: product.booking_id || product.auction_id },
        { label: 'Product_Name', value: product.p_name },
        { label: 'Approx Price', value: product.approx_price || product.total_price },
        { label: 'Booking_Date', value: product.booking_date },
        { label: 'Schedule Date', value: product.schedule_date },
        { label: 'Weight', value: product.weight },
      ].map(({ label, value }) => (
        <View style={styles.row} key={label}>
          <Text style={styles.text}>{label}</Text>
          <Text style={styles.text1}>{value}</Text>
        </View>
      ))}
    </View>
  );
};

const SecondRoute = ({ item }) => {
  const customer = item[0] || {};
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 10 }}>
      <Text style={styles.detail}>CUSTOMER DETAIL</Text>
      {[
        { label: 'Name', value: customer.name },
        { label: 'Mobile', value: customer.mobile },
        { label: 'Area', value: customer.area },
        { label: 'Address', value: customer.address },
        { label: 'Landmark', value: customer.landmark },
        { label: 'Pincode', value: customer.pin_code },
      ].map(({ label, value }) => (
        <View style={styles.row} key={label}>
          <Text style={styles.text}>{label}</Text>
          <Text style={styles.text1}>{value}</Text>
        </View>
      ))}
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  detail: {
    alignSelf: 'flex-start',
    fontWeight: '700',
    fontSize: 20,
    color: '#00457E',
    borderBottomWidth: 0.7,
    borderBottomColor: '#00457E',
    marginBottom: 20,
  },
  text: {
    color: '#00457E',
    fontWeight: '500',
    fontSize: 16,
    flex: 1,
  },
  text1: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderTopColor: 'gray',
    borderTopWidth: 2,
  },
  buttonbuy: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#00457E',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonchat: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'darkgray',
    alignItems: 'center',
  },
  buttonTextChat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00457E',
  },
  buttonTextBuy: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});
