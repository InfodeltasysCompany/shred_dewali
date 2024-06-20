import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import AuctionBuyCurrent from "./AuctionBuyCurrent";
import AuctionBuyComplete from "./AuctionBuyComplete";


export const CloseIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.closeButton}>
    <AntDesign name="close" size={35} color={"gray"} />
  </TouchableOpacity>
);



const AuctionBuyModal = ({ closeModal, visible }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Current' },
    { key: 'second', title: 'Complete' },
  ]);

  const renderScene = SceneMap({
    first:() =><AuctionBuyCurrent index={index} setIndex={setIndex}/>,
    second:() => <AuctionBuyComplete index={index} setIndex={setIndex}/>,
  });
  const closemodal1=()=>{
    closeModal();
    setIndex(0);
  }

  return (
    <Modal animationType="none" visible={visible}>
      <View style={{ flex: 1 }}>
        <CloseIcon onPress={closemodal1} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Auction Buy Detail</Text>
        </View>
        <View  style={styles.tabView}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.indicator}
              style={styles.tabBar}
              labelStyle={styles.tabText}
            />
          )}
        />
        </View>
       
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  tabView: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#f2f2f2', // Tab bar background color
  },
  indicator: {
    backgroundColor: '#1E90FF', // Tab indicator color
  },
  tabLabel: {
    color: 'blue',
    fontWeight: 'bold',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AuctionBuyModal;
