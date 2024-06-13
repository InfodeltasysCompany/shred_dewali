import { Dimensions, StyleSheet, Text, View, Image, Modal, Button, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { AntDesign } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

const OrderAuction = () => {

     const [isModalVisible, setIsModalVisible] = useState(false);



     const openModal = () => {
          setIsModalVisible(true);
     };

     const closeModal = () => {
          setIsModalVisible(false);
     };

     const images = [
          require('../../assets/auction1.jpeg'),
          require('../../assets/Order2.jpeg'),

     ];


     return (
          <View style={styles.container}>

               <View style={styles.sliderContainer}>
                    <Swiper
                         style={styles.wrapper}
                         autoplay={true}
                         showsPagination={true}
                         dotStyle={styles.dotStyle}
                         activeDotStyle={styles.activeDotStyle}
                    >

                         {
                              images.map((image, index) => (
                                   <View style={styles.slide} key={index}>
                                        <Image style={styles.image} source={image} />
                                   </View>
                              ))
                         }
                    </Swiper>
               </View>


               <View style={styles.container1}>
                    <TouchableOpacity style={styles.button} onPress={openModal}>
                         <Text style={styles.buttonText}>Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button1}>
                         <Text style={styles.buttonText}>Auction</Text>
                    </TouchableOpacity>

                    <FullPageModal visible={isModalVisible} onClose={closeModal} />
               </View>


          </View>
     );
}


const FirstRoute = () => (
     <View style={[styles.scene, { backgroundColor: '#fff' }]}>
         
      <View style={styles.btn}>
        <TouchableOpacity >
          <View >
          <Text style={styles.txt}>
             Buy-Current
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity >
          <View>
            <Text style={styles.txt}>
             Buy-Complete
            </Text>
          </View>
        </TouchableOpacity>
      </View>
     </View>
);

const SecondRoute = () => (
     <View style={[styles.scene, { backgroundColor: '#fff' }]}>
          <View style={styles.btn}>
        <TouchableOpacity >
          <View >
          <Text style={styles.txt}>
             Sell-Current
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity >
          <View>
            <Text style={styles.txt}>
             Sell-Complete
            </Text>
          </View>
        </TouchableOpacity>
      </View>
     </View>
);


const FullPageModal = ({ visible, onClose }) => {

     const [index, setIndex] = React.useState(0);
     const layout = useWindowDimensions();
  
     const [routes] = React.useState([
          { key: 'first', title: 'Buyorder-Deatil' },
          { key: 'second', title: 'Sellorder-Detail' },
     ]);

     const renderScene = SceneMap({
          first: FirstRoute,
          second: SecondRoute,
     });

     const renderTabBar = props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#ff4081' }}
            style={{ backgroundColor: '#00457E' }}
            labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
          />
        );

     const CloseIcon = ({ onPress }) => (
          <AntDesign name='close' size={30} onPress={onPress}/>
          
     );


     return (
          <Modal
               animationType="slide"
               transparent={false}
               visible={visible}
               onRequestClose={onClose}>
               <View style={styles.modalContainer}>
                    <CloseIcon onPress={onClose}  />
                    <View style={styles.modalContent}>
                         <TabView
                              navigationState={{ index, routes }}
                              renderScene={renderScene}
                              onIndexChange={setIndex}
                              renderTabBar={renderTabBar}
                              initialLayout={{ width: layout.width, height: layout.height }}
                         />
                    </View>
               </View>
          </Modal>
     );
};




export default OrderAuction;

const styles = StyleSheet.create({

     btn: {
          height: 60,
          width: "70%",
          justifyContent: "center",
          marginTop: 30,
          backgroundColor: "#00457E",
          borderRadius: 45, 
          borderWidth: 2,
          borderColor: "#999",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
          elevation: 5, 
        },
        txt: {
          fontSize: 25,
          alignSelf: "center",
          fontWeight: "400",
          color: 'white',
        },

     scene: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          
     },
     modalContainer: {
          flex: 1,
          backgroundColor: 'white',
        },
        modalContent: {
          flex: 1,
        },

     container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
     },

     container1: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 20,
     },

     sliderContainer: {
          width: width, // Set the width of the container view
          height: 500, // Set the height of the container view
     },
     wrapper: {},
     slide: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
     },
     image: {
          width: width, // Set the image width to fill the container
          height: '80%', // Set the image height to fill the container
          resizeMode: 'cover',
          borderRadius: 20,
     },

     button: {
          backgroundColor: '#00457E', // Blue color
          paddingVertical: 15,
          paddingHorizontal: 40,
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
          marginRight: 20,
     },


     button1: {
          backgroundColor: '#00457E', // Blue color
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,

     },
     buttonText: {
          color: '#FFF',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
     },

     dotStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Customize the dot color
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 3,
     },
     activeDotStyle: {
          backgroundColor: '#1E90FF', // Customize the active dot color
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 3,
     },


     closeButton: {
          position: 'absolute',
          top: 40,
          right: 20,
     },

     modalText: {
          fontSize: 18,
          marginBottom: 20,
     },
});