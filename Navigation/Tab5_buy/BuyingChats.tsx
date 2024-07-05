import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../../redux/ContextApi/UserAuthProvider';
import GroupChatModal from './GroupChatModal'; // Adjust the import path as needed
import { useFocusEffect } from '@react-navigation/native';
import ChatBlank from './ChatBlank';

const BuyingChats = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [state] = useContext(AuthContext);
  const { userIdApp, f_id,f_email } = state; // Assuming f_id is the user's ID

  const firebaseDB = getFirestore();

  const getGroups =()=>{
    console.log("f_id=>",f_id);
    console.log("f_email=>",f_email)

    // try {
    //   const groupsRef = collection(firebaseDB, 'biddingGroups');
    //   const q = query(groupsRef, where('createdBy', '==', f_id));

    //    onSnapshot(q, (querySnapshot) => {
    //     const fetchedGroups = [];
    //     querySnapshot.forEach((doc) => {
    //       fetchedGroups.push({ id: doc.id, ...doc.data() });
    //     });

    //     setGroups(fetchedGroups);
    //     setRefreshing(false); // Update refreshing state here
    //   });

    // } catch (error) {
    //   console.error('Error fetching groups:', error);
    // }
    try {
      const groupsRef = collection(firebaseDB, 'biddingGroups');
      const q = query(groupsRef, where('createdBy', '==', f_id)); // Adjust the field names according to your Firestore schema

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedGroups = [];
        querySnapshot.forEach((doc) => {
          fetchedGroups.push({ id: doc.id, ...doc.data() });
        });

        setGroups(fetchedGroups);
        setRefreshing(false); // Update refreshing state here
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }


  useEffect(() => {
    getGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userIdApp) {
        getGroups();
      }
    }, [userIdApp, f_id])
  );

  const handleGroupSelection = (group) => {
    console.log("Selected group =>", group);
    setSelectedGroup(group);
    if (group) {
      setModalVisible(true);
    }
  };

  const renderGroupItem = ({ item }) => (
    <TouchableOpacity style={styles.groupItem} onPress={() => handleGroupSelection(item)}>
      <Text style={styles.groupName}>{item.groupName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {groups.length > 0 ? (
        <FlatList
          data={groups}
          renderItem={renderGroupItem}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            getGroups();
          }}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                getGroups();
              }}
            />
          }
          showsVerticalScrollIndicator={false}

        >
          <ChatBlank navigation={navigation} />
        </ScrollView>
      )}

      <GroupChatModal
        modalVisible={modalVisible}
        onClose={() => {
          console.log("Closing modal");
          setModalVisible(false);
          // setSelectedGroup(null);
        }}
        group={selectedGroup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  groupItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupName: {
    fontSize: 18,
  },
});

export default BuyingChats;
