import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../../../redux/ContextApi/UserAuthProvider';
import { BASE_URL } from '../../../../ReuseComponent/Env';

const AuctionSellCurrent = ({ index, setIndex }) => {
  const [userId, setUserId] = useState(null);
  const [currentdata, setcurrentdata] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [state] = useContext(AuthContext);
  const { userIdApp } = state;

  useEffect(() => {
    getcurrent();
  }, [userIdApp, index]);

  const getcurrent = async () => {
    try {
      const formData = new FormData();
      formData.append('user_id', userIdApp);

      const response = await fetch(`${BASE_URL}/auctionOrder_api.php?action=select_current`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setcurrentdata(responseData);
        console.log('JSON Array:', responseData);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onRefresh = () => {
    getcurrent();
  };

  const handleChoose = async (item) => {
    try {
      const apiUrl = `${BASE_URL}/auctionOrder_api.php?action=complete`; // Replace with your actual API endpoint

      const formData = new FormData();
      formData.append('auction_id', item.auction_id);
      formData.append('user_id', userIdApp);

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // setIndex(1);
        console.log("data=>",data);
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (item) => {
    setSelectedCard(item.auction_id);
    showCustomAlert(item);
  };

  const showCustomAlert = (item) => {
    Alert.alert(
      'Confirmation',
      'Do you want to mark this item as Complete?',
      [
        {
          text: 'No',
          onPress: () => {
            console.log('User pressed No');
            setSelectedCard(null);
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            console.log('User pressed Yes');
            handleChoose(item);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#0000ff']}
          tintColor="#0000ff"
        />
      }
    >
      <View>
        <View style={{ ...styles.container, flexDirection: 'column' }}>
          {currentdata.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, selectedCard === item.auction_id && styles.selectedCard]}
              onPress={() => handleCardClick(item)}
            >
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Text style={styles.cardText}>Booking Id: {item.auction_id}</Text>
                  <Text style={styles.cardText1}>{item.p_name}</Text>
                  <Text style={styles.cardText2}>Weight: {item.weight}</Text>
                  <Text style={styles.cardText2}>Approx_price: Rs {item.approx_price}</Text>
                  <Text style={styles.cardText2}>Booking_date: {item.booking_date}</Text>
                  <Text style={styles.cardText2}>Schedule Date: {item.schedule_date}</Text>
                </View>
                <View>
                  {selectedCard === item.auction_id && (
                    <Ionicons name="checkmark-circle" style={{ fontSize: 40, color: 'brown' }} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 6,
    elevation: 4,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
    color: 'brown'
  },
  cardText1: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
    color: 'black'
  },
  cardText2: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    color: 'gray'
  },
  selectedCard: {
    backgroundColor: '#e0e0e0',
  },
});

export default AuctionSellCurrent;
