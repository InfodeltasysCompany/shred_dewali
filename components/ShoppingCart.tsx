import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ShoppingCart = ({navigation}) => {
     return (
          <View>


               <View>
                    <Image
                         style={styles.image1}
                         source={require('../assets/cart1.png')}
                    />
               </View>

               <View>
                    <Text style=
                         {{
                              textAlign: 'center',
                              fontSize: 25,
                              fontWeight: 'bold',
                              color: '#3D5B59',
                         }}
                    >
                         Your Cart Is Empty
                    </Text>

                    <Text  style={styles.scrap}>Add Your Favourite Scrap to Proceed</Text>

                    <View>

                         <TouchableOpacity  style={styles.btn} onPress={()=>{
                              
                              navigation.navigate('Scrap Item', { screen: 'T3Screen1' });
}}>
                              <View>
                                   <Text   style={styles.btntxt}>Please Add Scrap Item</Text>
                              </View>
                         </TouchableOpacity>
                        
                    </View>
               </View>

          </View>
     )
}

export default ShoppingCart

const styles = StyleSheet.create({
     image1:{

     },

     btn:{
      marginHorizontal: 30,
      marginVertical: 10,
      paddingVertical: 10,  
      backgroundColor:"#3D5B59",
     
       
       
     },

     scrap:{
      textAlign: 'center',
      fontSize: 15,
      marginTop: 10,
      marginBottom: 20,
      color: 'gray'
     },

     btntxt:{
          color: 'white',
          textAlign: 'center',
          fontSize: 20,
     }


     
})