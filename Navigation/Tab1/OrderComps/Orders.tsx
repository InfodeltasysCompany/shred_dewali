import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { getApiResponse } from '../../Tab3/functions';
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import OrderDetailModal from './OrderDetailModal';
import { BASE_URL, IMG_URL } from '../../../ReuseComponent/Env';

const Orders = ({navigation}) => {
    const [state, setState] = useContext(AuthContext);
    const { userIdApp } = state;

    const [orderData, settOrderData] = useState([]);
    const [booking_id, setbookingId] = useState<number | null>(null);
    const [imagename, setImagename] = useState("");
    const imgurl = IMG_URL;

    const [isOrderDetailModalVisible, setIsOrderDetailModalVisible] = useState(false);

    const handleCloseOrderDetail = () => {
        setIsOrderDetailModalVisible(false);
    };

    const handleDetailPress = async (bookingId: number, filename: string) => {
        // console.log("pressed..");
        setIsOrderDetailModalVisible(true);  // Set explicitly to true
        setImagename(filename);
        setbookingId(bookingId);
    };

    const getOrderResponse = async () => {
        try {
            const country = encodeURIComponent("");  // Adjust if necessary
            const city = encodeURIComponent("");     // Adjust if necessary
            const userId = encodeURIComponent(userIdApp || "");

            const url = `${BASE_URL}/orders_api.php?action=select&country=${country}&city=${city}&userId=${userId}`;
            console.log("url", url);
            const data = await getApiResponse(url);
            // console.log("Fetched Order Data:", data);
            const filterdata = data.filter((item) => item.user_id !== userIdApp);

            settOrderData(filterdata);
        } catch (error) {
            console.log("Error fetching order data:", error);
        }
    };
    useEffect(() => {
        getOrderResponse(); // Call the function to load orders on component mount
    }, []); // Avoid unnecessary re-fetching. Only run once on mount.

    useEffect(() => {
        getOrderResponse(); // Call the function to load orders on component mount
    }, [userIdApp]); // Avoid unnecessary re-fetching. Only run once on mount.

    return (
        <View style={styles.container}>
            <View style={styles.card1}>
                {orderData.length > 0 && orderData.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <Pressable onPress={() => handleDetailPress(item.booking_id, item.filename)}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{
                                        uri: item.filename?.split(",")[0] ? imgurl + item.filename?.split(",")[0] : 'https://via.placeholder.com/150' // Fallback image URL
                                    }}
                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textContainer2}>{item.p_name}</Text>
                                <Text style={styles.textContainer5}>
                                    <FontAwesome name="rupee" style={{ fontSize: 15 }} />
                                    {item.approx_price}
                                </Text>

                                <Text style={styles.textContainer6}>
                                    <EvilIcons name="location" style={{ fontSize: 15 }} />
                                    {item.country_name || item.city_name}
                                </Text>
                                <Text style={{ ...styles.textContainer6, marginLeft: 16, textTransform: 'lowercase' }}>
                                    {item.state_name}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                ))}
            </View>

            {/* Order Detail Modal */}
            <OrderDetailModal
                closeModal={handleCloseOrderDetail}
                visible={isOrderDetailModalVisible}
                bookingId={booking_id}
                filename={imagename} navigation={navigation}            />
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    container: {
        // padding: 10,
    },
    card1: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginVertical: 10,
    },
    card: {
        width: "48%",
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "lightgray",
    },
    imageContainer: {
        width: "100%",
        height: 120,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: "hidden",
        alignItems: "center",
    },
    image: {
        height: 100,
        width: 140,
        marginTop: 5,
    },
    textContainer: {
        padding: 10,
    },
    textContainer2: {
        fontSize: 18,
        fontWeight: "500",
        color: "black",
        marginBottom: 5,
    },
    textContainer5: {
        fontSize: 15,
        color: "darkgray",
        marginBottom: 2,
    },
    textContainer6: {
        fontSize: 12,
        marginTop: 10,
        color: "gray",
    },
});
