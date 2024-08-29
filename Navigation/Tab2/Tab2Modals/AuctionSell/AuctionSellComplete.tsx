import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../redux/ContextApi/UserAuthProvider';

const OrderSellComplete = ({ index, setIndex }) => {
    const [currentData, setCurrentData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [state] = useContext(AuthContext);
    const { userIdApp } = state;

    useEffect(() => {
        getCurrent();
    }, [userIdApp, index]);

    const getCurrent = async () => {
        try {
            const response = await fetch(`https://shreddersbay.com/API/auctionOrder_api.php?action=select_complete&user_id=${userIdApp}`);

            if (response.ok) {
                const responseData = await response.json();
                setCurrentData(responseData);
                console.log('Fetched Data:', responseData);
            } else {
                console.error('Failed to fetch data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCardClick = (item) => {
        // Handle click on card, for example, navigate to a new screen or perform an action
        console.log('Clicked item:', item);
    };

    const onRefresh = () => {
        setRefreshing(true);
        getCurrent().finally(() => setRefreshing(false));
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
            <View style={styles.container}>
                {currentData.length > 0 ? (
                    currentData.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.card}
                            onPress={() => handleCardClick(item)}
                        >
                            <Text style={styles.cardText}>Booking Id: {item.auction_id || 'N/A'}</Text>
                            <Text style={styles.cardText1}>{item.p_name || 'N/A'}</Text>
                            <Text style={styles.cardText2}>Weight: {item.total_wieght || 'N/A'}</Text>
                            <Text style={styles.cardText2}>Approx Price: {item.total_price || 'N/A'}</Text>
                            <Text style={styles.cardText2}>Booking Date: {item.booking_date || 'N/A'}</Text>
                            <Text style={styles.cardText2}>Schedule Date: {item.schedule_date || 'N/A'}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>No Data Available</Text>
                )}
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
