import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Modal, Text } from "react-native";
import OrderDetailSkeleton1 from "./OrderDetailSkeleton"; // Updated import
import { BASE_URL } from "../../../ReuseComponent/Env"; // Ensure BASE_URL is correct
import OrderDetail from "./OrderDetail";

// Close button component
export const CloseIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.closeButton}>
    <Image
      source={require("../../../assets/closeImage.jpg")} // Adjust path as needed
      style={{ width: 50, height: 50 }}
    />
  </TouchableOpacity>
);

// Modal for displaying order details
const OrderDetailModal = ({ closeModal, visible, bookingId, filename }) => {
  const [imagename, setImagename] = useState(""); // Store the filename for the image
  const [detaildata, setDetailData] = useState(null); // Store fetched order details
  const [loading, setLoading] = useState(true); // Track loading state

  // Function to fetch order details based on bookingId
  const handleDetailPress = async () => {
    console.log("Fetching details... filename:", filename);
    setImagename(filename); // Set the filename for image in state

    try {
      const formdata = new FormData();
      formdata.append("booking_id", bookingId.toString()); // Ensure bookingId is a string

      const response = await fetch(`${BASE_URL}/orders_api.php?action=select_id`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formdata,
      });

      if (response.ok) {
        const details = await response.json();

        if (details && Object.keys(details).length > 0) {
          setDetailData(details); // Set fetched details if data exists
          // console.log("Fetched details:", details);
        } else {
          setDetailData(null); // No data found
        }
      } else {
        console.error("Error fetching details:", response.statusText);
        setDetailData(null); // Error in fetching data
      }
    } catch (error) {
      console.error("Error:", error);
      setDetailData(null); // Handle any errors in the request
    } finally {
      setLoading(false); // Set loading to false after data is fetched or error occurs
    }
  };

  useEffect(() => {
    if (visible && bookingId) {
      console.log("Booking ID received:", bookingId);
      handleDetailPress(); // Fetch order details when modal is visible and bookingId is provided
    }
  }, [visible, bookingId]); // Run the effect whenever `visible` or `bookingId` changes

  return (
    <Modal animationType="none" visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <CloseIcon onPress={closeModal} />

        {loading ? (
          <View style={styles.skeletonContainer}>
            <OrderDetailSkeleton1 /> 
          </View>
        ) : detaildata ? (
          <View style={styles.orderDetail}>
            <OrderDetail item={detaildata} />
          </View>
        ) : (
          <View style={styles.skeletonContainer}>
            <Text>No details available or error occurred.</Text> 
            {/* <OrderDetailSkeleton1/> */}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    position: "relative",
  },
  skeletonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  orderDetail: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default OrderDetailModal;
