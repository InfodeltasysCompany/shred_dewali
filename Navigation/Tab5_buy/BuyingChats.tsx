
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../../redux/ContextApi/UserAuthProvider';
import GroupChatModal from './GroupChatModal'; // Adjust the import path as needed

const BuyingChats = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [state] = useContext(AuthContext);
  const { f_id } = state; // Assuming f_id is the user's ID

  const firebaseDB = getFirestore();

  useEffect(() => {
    const unsubscribe = getGroups();
    return () => unsubscribe();
  }, []); // Empty dependency array to run only once on mount

  const getGroups = () => {
    try {
      const groupsRef = collection(firebaseDB, 'biddingGroups');
      const q = query(groupsRef, where('createdBy', '==', f_id));

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
  };

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
      <FlatList
        data={groups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          getGroups(); // Call getGroups directly without then()
        }}
      />

      <GroupChatModal
        modalVisible={modalVisible}
        onClose={() => {
          console.log("Closing modal");
          setModalVisible(false);
          setSelectedGroup(null);
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
