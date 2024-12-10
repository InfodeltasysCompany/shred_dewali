import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ChatModalTabs = ({ activeTab, setActiveTab, ispressed, setIspressed }) => {
  return (
    <View style={{ alignItems: 'center',marginTop:-10 }}>
      <TouchableOpacity
        style={styles.opentab}
        onPress={() => setIspressed(!ispressed)}
        activeOpacity={0}
      >
        <AntDesign name={ispressed ? 'up' : 'down'} size={25} color="#00457E" />
      </TouchableOpacity>

      <View style={styles.tabs}>
        {['Chat', 'Make Offer'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => {
              setActiveTab(tab);
              setIspressed(true);
            }}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  opentab: { backgroundColor: '#ddd', width: 100, height: 30, justifyContent: 'center', alignItems: 'center' ,marginBottom:-10,zIndex:1,borderTopRightRadius:15,borderTopLeftRadius:15},
  tabs: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 },
  tab: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 5 ,backgroundColor:"#ddd",},
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#00457E' },
  tabText: { color: '#333' ,fontSize:18},
  activeTabText: { color: '#00457E' },
});

export default ChatModalTabs;
