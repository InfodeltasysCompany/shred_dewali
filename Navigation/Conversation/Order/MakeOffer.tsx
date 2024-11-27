import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const MakeOffer = () => {
  const [offers] = useState([1000, 950, 900, 850, 800]);
  const [selectedOffer, setSelectedOffer] = useState(1000);
  const [customOffer, setCustomOffer] = useState('1000');

  const handleSendOffer = () => {
    const offerAmount = customOffer || selectedOffer;
    console.log('Offer submitted:', offerAmount);
    // Handle API submission logic here
  };

  return (
    <View style={styles.container}>
      {/* Preset Offer Buttons */}
      <View style={styles.offerListView}>
        <FlatList
          data={offers}
          horizontal
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.offerButton,
                selectedOffer === item && styles.selectedOfferButton,
              ]}
              onPress={() => {
                setSelectedOffer(item);
                setCustomOffer('');
              }}
            >
              <Text
                style={[
                  styles.offerText,
                  selectedOffer === item && styles.selectedOfferText,
                ]}
              >
                ₹ {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Custom Offer Input */}
      <TextInput
        style={styles.customOfferInput}
        // placeholder="Enter your offer amount"
        keyboardType="numeric"
        value={customOffer}
        onChangeText={(text) => {
          setCustomOffer(text);
          setSelectedOffer(null);
        }}
      />

      {/* Offer Feedback */}
      <Text style={styles.feedbackText}>Very good offer! High chances of seller's reply.</Text>

      {/* Send Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendOffer}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MakeOffer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  offerListView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  offerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedOfferButton: {
    backgroundColor: '#00b894',
    borderColor: '#00b894',
  },
  offerText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOfferText: {
    color: '#fff',
  },
  customOfferInput: {
    // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 36,
    marginBottom: 20,
    fontWeight:"700",
    alignItems:"center",justifyContent:"center"

  },
  feedbackText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    backgroundColor:"#28A745",
    height:80,
    justifyContent:"center",
    alignItems:"center",
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    borderTopRightRadius:30,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
