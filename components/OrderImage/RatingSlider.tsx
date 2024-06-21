import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Modal, Button, TextInput, ToastAndroid, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Swiper from 'react-native-swiper';
import { AuthContext } from '../../redux/ContextApi/UserAuthProvider';
import LoginModal from '../Credential/LoginModal';

const { width } = Dimensions.get('window');

// Function to calculate relative time
const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const feedbackDate = new Date(dateString);

  if (isNaN(feedbackDate.getTime())) {
    return 'Invalid date';
  }

  const diffInSeconds = Math.floor((now.getTime() - feedbackDate.getTime()) / 1000);
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
};

const RatingSlider = ({navigation}) => {
  const [state, setState] = useContext(AuthContext);
  const { userIdApp } = state;

  const [feedbackData, setFeedbackData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const getdata = async () => {
    try {
      const url = "https://shreddersbay.com/API/rating_api.php?action=select";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resdata = await response.json();
      setFeedbackData(resdata);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    const profile_url = `https://shreddersbay.com/API/user_api.php?action=select_id&user_id=${userIdApp}`;
    const getUserProfile = async () => {
      const data = await fetch(profile_url);
      const jdata = await data.json();
      setProfileData(jdata);
    };

    getdata();
    getUserProfile();
  }, []);
  useEffect(()=>{
    const profile_url = `https://shreddersbay.com/API/user_api.php?action=select_id&user_id=${userIdApp}`;
  const getUserProfile = async () => {
    const data = await fetch(profile_url);
    const jdata = await data.json();
    setProfileData(jdata);
  };
  getUserProfile();
  },[isModalVisible]);

  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
    setModalVisible(true);
  };

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [isLoginModalVisible, setisLoginModalVisible] = useState(false);

  const handleRating = (rating) => {
    setRating(rating);
  };

  const handleSubmit = async () => {
    try {
      if (!userIdApp) {
        Alert.alert(
          "Confirmation",
          "You have to Login Or Signup",
          [
            {
              text: "No",
              onPress: () => {
                // Handle "No" press if needed
              },
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                setisLoginModalVisible(!isLoginModalVisible);
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        if (rating === 0) {
          ToastAndroid.showWithGravity(
            "Please provide a rating",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          return;
        }
  
        const url = "https://shreddersbay.com/API/rating_api.php?action=insert";
        const formdata = new FormData();
        formdata.append("user_id", userIdApp);
        formdata.append("name", profileData[0]?.name || ""); // Handle undefined case
        formdata.append("rating", rating.toString());
        formdata.append("message", comments);
  
        const response = await fetch(url, {
          method: "POST",
          body: formdata,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("data=>>>", data);
  
        setRating(0);
        setComments('');
        ToastAndroid.showWithGravity(
          "Review Updated",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        getdata();
        setModalVisible(!isModalVisible);
      }
    } catch (error) {
      console.log("error", error);
      // Handle specific error cases or log them for debugging
    }
  };
  

  const averageRating = feedbackData.length
    ? (feedbackData.reduce((acc, feedback) => acc + feedback.rating, 0) / feedbackData.length).toFixed(1)
    : 'No ratings';

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: "center", gap: 10, alignItems: 'center' }}>
        {feedbackData.length > 0 &&
          <>
                  <LoginModal navigation={navigation} visible={isLoginModalVisible} setVisible={setisLoginModalVisible} />

            <Text style={styles.header}>Ratings:</Text>
            <AirbnbRating
              isDisabled
              showRating={false}
              count={5}
              defaultRating={Number(averageRating)}
              size={16}
            />
          </>
        }
      </View>

      <Swiper
        autoplay={true}
        autoplayTimeout={15} 
        showsPagination={false}
        style={styles.swiper}
      >
        {feedbackData.reverse().map((feedback, index) => (
          <TouchableOpacity key={index} style={styles.feedbackContainer} onPress={() => handleFeedbackClick(feedback)}>
            <Text style={styles.name}>{feedback.name || "Anonymous"}</Text>
            <AirbnbRating
              isDisabled
              showRating={false}
              count={5}
              defaultRating={feedback.rating}
              size={16}
            />
            <Text style={styles.time}>{feedback.message}</Text>
          </TouchableOpacity>
        ))}
      </Swiper>

      {selectedFeedback && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>{selectedFeedback.name || "Anonymous"}</Text>
              <AirbnbRating
                isDisabled
                showRating={false}
                count={5}
                defaultRating={selectedFeedback.rating}
                size={16}
              />
              <Text style={styles.modalComments}>{selectedFeedback.comments}</Text>
              <Text style={styles.modalTime}>{selectedFeedback.message}</Text>

              <View style={styles.container1}>
                <Text style={styles.title}>Leave a Review</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={0}
                  size={30}
                  onFinishRating={handleRating}
                  showRating
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Write your comments here..."
                  multiline
                  numberOfLines={4}
                  value={comments}
                  onChangeText={(text) => setComments(text)}
                />
                <Button title="Submit" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  container1: {

    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalComments: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalTime: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: 10,
    // backgroundColor: '#f0f0f0', // Light background color
    // paddingLeft: 10,
    // paddingRight: 35,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  scrollView: {
    alignItems: 'center',
    // paddingVertical: 10,
  },
  feedbackContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    width: width * 0.8,
    // minHeight: 120,
    justifyContent: "space-around",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',

  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    marginVertical: 5,
  },
  time: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
   swiper: {
    height: 60,
  },
});

export default RatingSlider;

