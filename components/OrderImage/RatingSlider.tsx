import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, ToastAndroid } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const RatingSlider = () => {
  const [fileNames, setFileNames] = useState([]);
  const imgurl = "https://shreddersbay.com/API/uploads/";

  const localImages = [
    require('../../assets/screw.jpeg'),
    require('../../assets/auction.png'),
    require('../../assets/copper.jpeg'),
    require('../../assets/recycle.jpg'),
    require('../../assets/lead.jpeg'),
    require('../../assets/plastic.jpeg'),
    require('../../assets/cardboard.jpeg'),
  ];

  const getSliderApiResponse = async () => {
    const url = "https://shreddersbay.com/API/product_api.php?action=select";
    const response = await fetch(url);
    
    const resdata1 = await response.json();
    if(resdata1.length == 0){
      ToastAndroid.showWithGravity(
        "Internet connection is weak.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    const fileNamesArray = resdata1
      .filter(item => item.file && item.file_name)
      .map(item => item.file_name);

    setFileNames(fileNamesArray);
  }

  useEffect(() => {
    getSliderApiResponse();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Swiper autoplay={true} autoplayTimeout={4} showsPagination={false}>
          {fileNames.length > 0 ? (
            fileNames.map((image, index) => (
              <View style={styles.slide} key={index}>
                <Image style={styles.image} source={{ uri: imgurl + image }} />
              </View>
            ))
          ) : (
            localImages.map((image, index) => (
              <View style={styles.slide} key={index}>
                <Image style={styles.image} source={image} />
              </View>
            ))
          )}
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
  },
  image: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default RatingSlider;
