import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';

const BuyBidings = () => {
  const [state,,,,GChatstate,setGChatstate] = useContext(AuthContext)

  const handlepressuser = ()=>{
setGChatstate(prevstate=>({
 ...prevstate,
  userdetails:{"name":"vinit","age":30}
}))
  }
  const handlepressproduct=()=>{
    setGChatstate(prevstate=>({
      ...prevstate,
      productdetails:{"catogary":"brass","title":"it is not good..."}

    }))
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BuyBidings</Text>
      <Button title='setuser data' onPress={handlepressuser}/>
      <Button title='setuser product' onPress={handlepressproduct}/>

    </View>
  );
};

export default BuyBidings;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures it takes all the available space
    justifyContent: 'center', // Vertically centers content
    alignItems: 'center', // Horizontally centers content
    padding: 20, // Optional padding for spacing around
  },
  text: {
    fontSize: 20, // Adjusts font size for visibility
    color: '#333', // Text color
  },
});
