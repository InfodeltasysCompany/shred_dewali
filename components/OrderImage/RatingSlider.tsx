import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, ToastAndroid, Text } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const RatingSlider = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  const imgurl = "https://shreddersbay.com/API/uploads/";

  // Sample feedback data
  const sampleFeedbackData = [
    {
      "feedback_id": "1",
      "user_id": "2474",
      "name": "priya",
      "mobile": "9745478797",
      "comments": "hello",
      "address": "alambhag luckonw",
      "status": "1",
      "date": "0000-00-00 00:00:00"
    },
    {
      "feedback_id": "2",
      "user_id": "2479",
      "name": "",
      "mobile": "9648201278",
      "comments": "excellent application",
      "address": "Lucknow",
      "status": "1",
      "date": "0000-00-00 00:00:00"
    },
    {
      "feedback_id": "3",
      "user_id": "2474",
      "name": "priya",
      "mobile": "9745478797",
      "comments": "hello",
      "address": "alambhag luckonw",
      "status": "1",
      "date": "2024-06-12 23:47:50"
    }
  ];

  useEffect(() => {
    // Simulate fetching feedback data from an API
    setTimeout(() => {
      setFeedbackData(sampleFeedbackData);
    }, 1000); // Simulate delay in fetching data
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Swiper autoplay={true} autoplayTimeout={4} showsPagination={false}>
          {feedbackData.map((feedback, index) => (
            <View style={styles.slide} key={index}>
              <Text>{feedback.comments}</Text>
              {/* You can add other feedback details here */}
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    width: width,
    height: 140,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default RatingSlider;
