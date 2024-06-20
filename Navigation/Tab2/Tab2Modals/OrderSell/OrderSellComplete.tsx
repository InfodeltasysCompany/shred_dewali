import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../../redux/ContextApi/UserAuthProvider';

const OrderSellComplete = () => {
  const [currentdata, setcurrentdata] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const { userIdApp } = state;

  useEffect(() => {
    getcurrent();
  }, [userIdApp]);

  const getcurrent = async () => {
    try {
      const response = await fetch(
        `https://shreddersbay.com/API/orders_api.php?action=selectCustomerComplete&user_id=${userIdApp}`,
        {
          method: 'GET',
        }
      );

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

  const handleCardClick = (item) => {
    console.log('Clicked item:', item);
  };

  const onRefresh = () => {
    getcurrent();
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
        <View style={styles.container}>
          {currentdata.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleCardClick(item)}
            >
              <Text style={styles.cardText}>Booking Id:  {item.booking_id}</Text>
              <Text style={styles.cardText1}>{item.p_name}</Text>
              <Text style={styles.cardText2}>Weight: {item.weight}</Text>
              <Text style={styles.cardText2}>Approx_price: {item.approx_price}</Text>
              <Text style={styles.cardText2}>Booking_date: {item.booking_date}</Text>
              <Text style={styles.cardText2}>Schedule Date: {item.schedule_date}</Text>
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
    color: 'brown',
  },
  cardText1: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
    color: 'black',
  },
  cardText2: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    color: 'gray',
  },
});

export default OrderSellComplete;
