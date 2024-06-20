


import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import { AntDesign } from '@expo/vector-icons';
import OrderBuyModal from './Tab2Modals/OrderBuy/OrderBuyModal';
import OrderSellModal from './Tab2Modals/OrderSell/OrderSellModal';
import AuctionBuyModal from './Tab2Modals/AuctionBuy/AuctionBuyModal';
import AuctionSellModal from './Tab2Modals/AuctionSell/AuctionSellModal';

const { width } = Dimensions.get('window');

// Component for the Order tab
const OrderScreen = ({ openOrderBuyModal, openOrderSellModal }) => (
  <View style={[styles.scene, { backgroundColor: '#fff' }]}>
    <View style={styles.buySellContainer}>
      <TouchableOpacity style={[styles.buySellButton, styles.buyButton]} onPress={openOrderBuyModal}>
        <Text style={styles.buySellButtonText}>Buy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buySellButton, styles.sellButton]} onPress={openOrderSellModal}>
        <Text style={styles.buySellButtonText}>Sell</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Component for the Auction tab
const AuctionScreen = ({ openAuctionBuyModal, openAuctionSellModal }) => (
  <View style={[styles.scene, { backgroundColor: '#fff' }]}>
    <View style={styles.buySellContainer}>
      {/* <TouchableOpacity style={[styles.buySellButton, styles.buyButton]} onPress={openAuctionBuyModal}>
        <Text style={styles.buySellButtonText}>Auction</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={[styles.buySellButton, styles.sellButton]} onPress={openAuctionSellModal}>
        <Text style={styles.buySellButtonText}>Auction</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

const OrderAuction = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'order', title: 'Order' },
    { key: 'auction', title: 'Auction' },
  ]);

  const renderScene = SceneMap({
    order: () => <OrderScreen openOrderBuyModal={openOrderBuyModal} openOrderSellModal={openOrderSellModal} />,
    auction: () => <AuctionScreen openAuctionBuyModal={openAuctionBuyModal} openAuctionSellModal={openAuctionSellModal} />,
  });

  
  // Modal visibility states and functions
  const [isOrderBuyModalVisible, setIsOrderBuyModalVisible] = useState(false);
  const [isOrderSellModalVisible, setIsOrderSellModalVisible] = useState(false);
  const [isAuctionBuyModalVisible, setIsAuctionBuyModalVisible] = useState(false);
  const [isAuctionSellModalVisible, setIsAuctionSellModalVisible] = useState(false);

  const openOrderBuyModal = () => setIsOrderBuyModalVisible(true);
  const closeOrderBuyModal = () => setIsOrderBuyModalVisible(false);

  const openOrderSellModal = () => setIsOrderSellModalVisible(true);
  const closeOrderSellModal = () => setIsOrderSellModalVisible(false);

  const openAuctionBuyModal = () => setIsAuctionBuyModalVisible(true);
  const closeAuctionBuyModal = () => setIsAuctionBuyModalVisible(false);

  const openAuctionSellModal = () => setIsAuctionSellModalVisible(true);
  const closeAuctionSellModal = () => setIsAuctionSellModalVisible(false);

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
          {/* Replace with your actual images */}
          <View style={styles.slide}>
            <Image style={styles.image} source={require('../../assets/auction1.jpeg')} />
          </View>
          <View style={styles.slide}>
            <Image style={styles.image} source={require('../../assets/Order2.jpeg')} />
          </View>
        </Swiper>
      </View>

      <View style={styles.tabView}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
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

      {/* Pass modal visibility and close functions as props */}
      <OrderBuyModal visible={isOrderBuyModalVisible} closeModal={closeOrderBuyModal} />
      <OrderSellModal visible={isOrderSellModalVisible} closeModal={closeOrderSellModal} />
      <AuctionBuyModal visible={isAuctionBuyModalVisible} closeModal={closeAuctionBuyModal} />
      <AuctionSellModal visible={isAuctionSellModalVisible} closeModal={closeAuctionSellModal} />

    </View>
  );
};

// Your FullPageModal component


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 400,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: '80%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  tabView: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  buySellContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  buySellButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buyButton: {
    backgroundColor: '#00457E', // Green color
  },
  sellButton: {
    backgroundColor: '#00457E', // Red color
  },
  buySellButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalContent: {
    flex: 1,
    marginTop: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    color: '#333',
  },
  dotStyle: {
    backgroundColor: 'rgba(130, 130, 130, 0.5)',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: '#1E90FF',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  indicator: {
    backgroundColor: '#1E90FF', // Tab indicator color
  },
  tabBar: {
    backgroundColor: '#f2f2f2', // Tab bar background color
  },
});

export default OrderAuction;
