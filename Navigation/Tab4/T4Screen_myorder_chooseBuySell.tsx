import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const T4Screen_myorder_chooseBuySell = ({navigation}) => {
   const myorder_buy = () => {
    console.log("working fine");
    navigation.navigate('MyOrderBuy');
    // navigation.navigate('T3Screen2');

  };
  const myorder_sell = () => {
    console.log("working fine");
    navigation.navigate('MyOrderSell');
    // navigation.navigate('T3Screen2');

  };
  return (
    <View style={{}}>

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
    marginLeft: 40,
    borderRadius: 45, // Half of the height to make it circular
    borderWidth: 2,
    borderColor: "#999",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  txt: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "400",
  },
});

export default T4Screen_myorder_chooseBuySell