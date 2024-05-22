import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { getApiResponse } from '../../Navigation/Tab3/functions';

const { width } = Dimensions.get('window');

const CaroselImage = () => {
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const imgurl = "https://shreddersbay.com/API/uploads/";

  const images = [
    require('../../assets/screw.jpeg'),
    require('../../assets/auction.png'),
    require('../../assets/copper.jpeg'),
    require('../../assets/recycle.jpg'),
    require('../../assets/lead.jpeg'),
    require('../../assets/plastic.jpeg'),
    require('../../assets/cardboard.jpeg'),
  ];

  const getSliderApiResponse=async()=>{
    const url ="https://shreddersbay.com/API/product_api.php?action=select"
    const response = await fetch(url);

    const resdata1 = await response.json();
    console.log("resdata1=>",resdata1);
    const filesArray = [];
    const fileNamesArray = [];

    // Iterate over resdata1 array
    resdata1.forEach(item => {
        // Check if file and file_name properties exist and are not null or undefined
        if (item.file && item.file_name) {
            // Push file and file_name values to their respective arrays
            filesArray.push(item.file);
            fileNamesArray.push(item.file_name);
        }
    });

    // Set files and fileNames state
    setFiles(filesArray);
    setFileNames(fileNamesArray);
  }
  useEffect(()=>{
    getSliderApiResponse();
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Swiper
          style={styles.wrapper}
          autoplay={true}
          autoplayTimeout={4}
          showsPagination={false} // Hides the pagination dots
        >
          {fileNames.map((image, index) => (
            <View style={styles.slide} key={index}>
              <Image style={styles.image} source={{ uri: imgurl + image }} />
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
     width: width, // Set the width of the container view
    height: 140,
     // Set the height of the container view
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  image: {
     width: width, // Set the image width to fill the container
    height: '100%', // Set the image height to fill the container
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default CaroselImage;


