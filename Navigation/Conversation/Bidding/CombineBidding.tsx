import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AllBiddings from './AllBiddings';
import SellBiddings from './SellBiddings';
import BuyBidings from './BuyBidings';

const CombineBidding = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('All');

  // Function to render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Buy':
        return <BuyBidings/>;
      case 'Sell':
        return <SellBiddings/>;
      case 'All':
      default:
        return <AllBiddings />; // This will render AllBiddings component when 'All' tab is active
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab buttons */}
      <View style={styles.tabs}>
        <Pressable 
          style={[styles.tab, activeTab === 'All' ? styles.activeTab:styles.inactiveTab]} 
          onPress={() => setActiveTab('All')}>
          <Text style={styles.tabText}>All</Text>

        </Pressable>
        <Pressable 
          style={[styles.tab, activeTab === 'Buy' ? styles.activeTab:styles.inactiveTab]} 
          onPress={() => setActiveTab('Buy')}>
          <Text style={styles.tabText}>Buy</Text>
        </Pressable>
        <Pressable 
          style={[styles.tab, activeTab === 'Sell' ? styles.activeTab:styles.inactiveTab]} 
          onPress={() => setActiveTab('Sell')}>
          <Text style={styles.tabText}>Sell</Text>
        </Pressable>
      </View>

      {/* Display content based on selected tab */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between', // To space out the tabs
    marginBottom: 20,  // Space below the tabs
  },
  tab: {
    paddingVertical: 10,  // Moderate height (padding for top/bottom)
    paddingHorizontal: 20, // Width for the tab
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',  // To center the text horizontally
    justifyContent: 'center', // To center the text vertically
    marginHorizontal: 5,  // Add horizontal margin for space between tabs
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTab: {
    backgroundColor: '#007BFF',
  },
  content: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inactiveTab:{
    backgroundColor:"#ddd"
  },
});

export default CombineBidding;
