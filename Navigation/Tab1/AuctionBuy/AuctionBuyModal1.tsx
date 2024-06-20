import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AuctionBuyCurrent from "./AuctionBuyCurrent1";
import AuctionBuyComplete from "./AuctionBuyComplete1";

export const CloseIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.closeButton}>
    <AntDesign name="close" size={35} color={"gray"} />
  </TouchableOpacity>
);

const AuctionBuyModal1 = ({ closeModal, visible }) => {
  const [index, setIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const windowWidth = Dimensions.get('window').width;

  const closemodal1 = () => {
    closeModal();
    setIndex(0); // Reset to 'current' tab when closing
  };

  const handleTabPress = (i) => {
    setIndex(i);
    scrollViewRef.current.scrollTo({ x: i * windowWidth, animated: true });
  };

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollX / windowWidth);
    if (newIndex !== index) {
      setIndex(newIndex);
    }
  };

  return (
    <Modal animationType="none" visible={visible}>
      <View style={{ flex: 1 }}>
        <CloseIcon onPress={closemodal1} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Auction Buy Detail</Text>
        </View>
        <View style={{ ...styles.tabButtons, elevation: 10 }}>
          <TouchableOpacity
            style={[styles.tabButton, index === 0 && styles.activeTabButton]}
            onPress={() => handleTabPress(0)}
          >
            <Text style={styles.tabButtonText}>Current</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, index === 1 && styles.activeTabButton]}
            onPress={() => handleTabPress(1)}
          >
            <Text style={styles.tabButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabIndicatorContainer}>
          <View style={styles.inactiveTabIndicator} />
          <View style={[styles.activeTabIndicator, { left: index * (windowWidth / 2) }]} />
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ width: windowWidth }}>
            <AuctionBuyCurrent index={index} setIndex={setIndex} />
          </View>
          <View style={{ width: windowWidth }}>
            <AuctionBuyComplete index={index} setIndex={setIndex} />
          </View>
        </ScrollView>
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
  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabButton: {
    width: '50%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#f2f2f2',
  },
  tabButtonText: {
    fontSize: 18,
    color: '#333',
  },
  tabIndicatorContainer: {
    height: 4, // Adjust height as needed
    width: '100%',
    flexDirection: 'row',
    position: 'relative',
    marginLeft:5,
    backgroundColor: '#ccc', // Inactive tab indicator color
    marginRight:5,
  },
  inactiveTabIndicator: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#ccc', // Gray color for inactive indicator
  },
  activeTabIndicator: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: '#1E90FF',
  },
  tabContent: {
    flex: 1,
  },
});

export default AuctionBuyModal1;
