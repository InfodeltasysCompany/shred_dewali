import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const T4Screen_myorder_chooseBuySell = ({navigation}) => {
   const myorder_buy = () => {
    console.log("working fine");
    navigation.navigate('BuyOrder-Detail');
    // navigation.navigate('T3Screen2');

  };
  const myorder_sell = () => {
    console.log("working fine");
    navigation.navigate('SellOrder-Detail');
    // navigation.navigate('T3Screen2');

  };
  return (
    <View 
    style=
     {{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',     
     }}
     >

      <View style={styles.btn}>
        <TouchableOpacity onPress={myorder_buy}>
          <View >
          <Text style={styles.txt}>
              Buy Order
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity onPress={myorder_sell}>
          <View>
            <Text style={styles.txt}>
              Sell  Order
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: "70%",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#ddd",
    borderRadius: 45, 
    borderWidth: 2,
    borderColor: "#999",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, 
  },
  txt: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "400",
    color: 'black',
  },
});

export default T4Screen_myorder_chooseBuySell