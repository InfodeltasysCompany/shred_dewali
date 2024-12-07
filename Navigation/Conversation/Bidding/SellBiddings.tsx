import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';
import ChatButtonAnimation from '../../../ReuseComponent/ChatButtonAnimation';

const SellBiddings = () => {
  const [state, setState, , , , , GCreateOrderAuctionState, setCreateOrderAuctionState] = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ChatButtonAnimation onClick={()=>console.log("first")} />
    </View>
  )
}

export default SellBiddings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  }
});