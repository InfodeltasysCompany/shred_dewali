// import { Modal, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
// import React from 'react'
// import { EvilIcons, FontAwesome } from '@expo/vector-icons';
// import ImageSlider from '../../components/OrderImage/ImageSlider';
// import LoginModal from '../../components/Credential/LoginModal';
// import { AskForAppUpdate, MainChats } from './T1Screen1';
// import { StatusBar } from 'expo-status-bar';
// import LogoSlider from '../../components/OrderImage/LogoSlider';
// import Aluminium from '../../components/OrderImage/Aluminium';
// import CopperImage from '../../components/OrderImage/CopperImage';

// const T1Screen1ViewComponent = () => {
//   return (
//     <View style={styles.container}>
//     <StatusBar style="auto" backgroundColor="#abcdef" />
    

// <View>
// <Modal
//   // animationType="fade"
//   transparent={true}
//   visible={modalVisible}
//   onRequestClose={() => {
//     setModalVisible(!modalVisible);
//   }}
// >
//   <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//     <View style={styles.centeredView}>
//       {/* <View>
//         <TouchableOpacity
//           style={[styles.buttonClose]}
//           onPress={() => setModalVisible(false)}
//         >
//           <Text style={styles.textStyle}>
//             <FontAwesome name="close" />
//           </Text>
//         </TouchableOpacity>
//       </View> */}

//       <View >
//         {/* <Text>
//           {JSON.stringify(detaildata)}</Text> */}
//         {detaildata &&
//           detaildata.map((item, index) => (
//             <View key={index}>
         
//               <GoodModal closeModal={()=>setModalVisible(false)} visible={modalVisible} comp={<Product item={item} handlebuypress={handleBuyPress} getusers={getUsers}/>}/>
//             </View>
//           ))}
//       </View>
//     </View>
//   </TouchableWithoutFeedback>
//   <View>
//     <MainChats
//       isModalVisible={isModalVisible2}
//       toggleModal={togglemodal2}
//       formchatUserIdFbse={fromChatUserIdFbse}
//       tochatUserIdFbse={toChatUserIdFbse}
//       tochatUserNameFbse={toChatUserNameFbse}
//       toChatUserMobileFbse={toChatUserMobileFbse}
//     />
//   </View>
// </Modal>
// <AskForAppUpdate
//   isAndroidUpdateModal={isandroidUpdateModalVisible}
//   setUpdateModal={setUpdateModal}
// />
// </View>

// <View style={styles.logo}>

// <View
//   style={{
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flex: 1,
//   }}
// >
//   <View style={{ flexDirection: "row" }}>
//     <Text style={styles.heading}>ShreddersBay</Text>
//   </View>

//   <TouchableOpacity style={{ justifyContent: "flex-end", alignItems: "flex-end" ,flexDirection:"row-reverse"}} onPress={locationSetup}>
//     <Ionicons
//       name="location-outline"
//       style={{ fontSize: 25, fontWeight: "bold", color: "#00457E" }}
//     />
//     {currentAddress && (
//       <>
//       {/* <Text>{JSON.stringify(currentAddress)}</Text> */}
//       <Text style={{fontSize:14,fontWeight:'500'}}>{currentAddress.city}</Text>
//       <Text style={{fontSize:14,fontWeight:'500'}}>{currentAddress.name},  </Text>
//       </>
//     )}
//   </TouchableOpacity>
// </View>
// </View>

// <View style={styles.container1}>
// <TextInput
//   placeholder="search"
//   clearButtonMode="always"
//   autoCapitalize="none"
//   autoCorrect={true}
//   style={styles.searchbox}
// />

// <View style={[userIdApp?{flexDirection:"row",marginLeft:15,justifyContent:"center"}:{flexDirection:'row',justifyContent:"center"}]}>
//   {!userIdApp &&(
    
//   <TouchableOpacity>
//     <View style={{...styles.heading1,}}>
//       <Ionicons
//         name="person-add"
//         onPress={() => setIsLoginModalVisible(true)}
//         size={30}
//         color={"#00457E"}
//       />
//     </View>
//   </TouchableOpacity>
//   )}
//   <LoginModal navigation={navigation} visible={isLoginModalVisible} setVisible={setIsLoginModalVisible}/>

//   <TouchableOpacity>
//     <View style={styles.heading1}>
//       <FontAwesome
//         name="shopping-cart"
//         onPress={() => navigation.navigate("T2Screen1")}
//         size={30}
//         color={"#00457E"}
//       />
//     </View>
//   </TouchableOpacity>
// </View>
// </View>

// <View style={{ flex: 1 }}>
// <ScrollView
//   refreshControl={
//     <RefreshControl
//       refreshing={refreshing}
//       onRefresh={onRefresh}
//       colors={["#0000ff"]}
//       tintColor="#0000ff"
//     />
//   }
// >
//   <View>
//     <ImageSlider />
//   </View>

//   <View>
//     <View style={styles.container3}>
//       <Text style={styles.order}>Fresh Recommendations</Text>
//     </View>

//     <View style={styles.container5}>
//       <View style={styles.card1}>
//         {user_id === null
//           ? data.map((item, index) => (
//               <View key={index} style={styles.card}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     handleDetailPress(item.booking_id, item.filename)
//                   }
//                 >
//                   <View style={styles.imageContainer}>
//                     <Image
//                       source={{ uri: imgurl + item.filename }}
//                       style={styles.image}
//                     />
//                   </View>
//                   <View style={styles.textContainer}>
//                     <Text style={styles.textContainer2}>
//                       {item.p_name}
//                     </Text>
//                     <Text style={styles.textContainer5}>
//                       <FontAwesome
//                         name="rupee"
//                         style={{ fontSize: 20 }}
//                       />{" "}
//                       {item.price}
//                     </Text>
//                     <Text style={styles.textContainer6}>
//                       <EvilIcons
//                         name="location"
//                         style={{ fontSize: 22 }}
//                       />{" "}
//                       {item.address}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             ))
//           : userfilterdata.map((item, index) => (
//               <View key={index} style={styles.card}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     handleDetailPress(item.booking_id, item.filename)
//                   }
//                 >
//                   <View style={styles.imageContainer}>
//                     <Image
//                       source={{ uri: imgurl + item.filename }}
//                       style={styles.image}
//                     />
//                   </View>
//                   <View style={styles.textContainer}>
//                     <Text style={styles.textContainer2}>
//                       {item.p_name}
//                     </Text>
//                     <Text style={styles.textContainer5}>
//                       <FontAwesome
//                         name="rupee"
//                         style={{ fontSize: 20 }}
//                       />{" "}
//                       {item.price}
//                     </Text>
//                     <Text style={styles.textContainer6}>
//                       <EvilIcons
//                         name="location"
//                         style={{ fontSize: 22 }}
//                       />{" "}
//                       {item.address}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             ))}
//       </View>
//     </View>
//     {/* /////////////////////////////////////// auction data bind ////////////////////////////////////////////////////////////////// */}

//     <View style={styles.container3}>
//       <Text style={styles.order}>New Auction</Text>
//     </View>
//     <View style={styles.container5}>
//       <View style={styles.card1}>
//         {user_id === null
//           ? actionData.map((item, index) => (
//               <View key={index} style={styles.card}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     handleAuctionDetailPres(item.auction_id)
//                   }
//                 >
//                   <View style={styles.imageContainer}>
//                     <Image
//                       source={{
//                         uri: imgurl + item.filename.split(",")[0],
//                       }}
//                       style={styles.image}
//                     />
//                   </View>

//                   <View style={styles.textContainer}>
//                     <Text style={styles.textContainer2}>
//                       {item.p_name}
//                     </Text>
//                     <Text style={styles.textContainer5}>
//                       <FontAwesome
//                         name="rupee"
//                         style={{ fontSize: 20 }}
//                       />{" "}
//                       {item.price}
//                     </Text>
//                     <Text style={styles.textContainer6}>
//                       <EvilIcons
//                         name="location"
//                         style={{ fontSize: 22 }}
//                       />{" "}
//                       {item.address}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             ))
//           : auctionFiteredData.map((item, index) => (
//               <View key={index} style={styles.card}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     handleAuctionDetailPres(item.auction_id)
//                   }
//                 >
//                   <View style={styles.imageContainer}>
//                     <Image
//                       source={{
//                         uri: imgurl + item.filename.split(",")[0],
//                       }}
//                       style={styles.image}
//                     />
//                   </View>
//                   <View style={styles.textContainer}>
//                     <Text style={styles.textContainer2}>
//                       {item.p_name}
//                     </Text>
//                     <Text style={styles.textContainer5}>
//                       <FontAwesome
//                         name="rupee"
//                         style={{ fontSize: 20 }}
//                       />{" "}
//                       {item.price}
//                     </Text>
//                     <Text style={styles.textContainer6}>
//                       <EvilIcons
//                         name="location"
//                         style={{ fontSize: 22 }}
//                       />{" "}
//                       {item.address}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             ))}
//       </View>
//     </View>

//     {/* <Text>{JSON.stringify(data)}</Text> */}
//   </View>

//   <View>
//     <LogoSlider />
//   </View>

//   <View>
//     <Aluminium/>
//   </View>

//   <View>
//     <CopperImage/>
//   </View>
// </ScrollView>
// </View>
// </View>
//   )
// }

// export default T1Screen1ViewComponent

// const styles = StyleSheet.create({})


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const T1Screen1ViewComponent = () => {
  return (
    <View>
      <Text>T1Screen1ViewComponent</Text>
    </View>
  )
}

export default T1Screen1ViewComponent

const styles = StyleSheet.create({})