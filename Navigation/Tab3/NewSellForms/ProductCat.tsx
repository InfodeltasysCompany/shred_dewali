import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { BASE_URL, IMG_URL } from '../../../ReuseComponent/Env';
const imgurl = IMG_URL;

const ProductCat = () => {

   
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const url =`${BASE_URL}/product_api.php?action=select`;
            try {
                const response = await fetch(url);
                const resdata = await response.json();
                const firstFiveData = resdata.slice(0, 5);

                // console.log("=>",resdata);
                setData(firstFiveData);
            } catch (error) {
                console.log("error is wrong=>",error)
            }
        };

        fetchData();
    }, []);

   


    return (
        <View style={styles.container}>
            {/* <Text>ProductCat</Text> */}
            {/* <Text>Data: {JSON.stringify(data)}</Text> */}
            {
            data&&data.map((item, index)=>(
                <View key={index} style={styles.productContainer}>
                     <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: imgurl + "" + item.file_name }}
                            style={styles.image}
                        />
                        
                    </View>
                        <View style={styles.textContainer}>
                        <Text>Data: {item.p_type_name}</Text>
                        </View>
              </View>
            ))}
            {/* <><Text>Data: {data[0].file_name}</Text> */}
             
             {/* <Text>Data:  {data[0].p_type_name}</Text></> */}
            {/* <Text>Data: {data[0].file_name}</Text> */}
        </View>
    )
}

export default ProductCat

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
      },
      productContainer: {
        width: '50%', // Two items per row
        padding: 5,
      },
      imageContainer: {
        
      },
      image: {
        width: '60%',
        height: 100,
        resizeMode: 'cover',
      },
      textContainer: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      },
})