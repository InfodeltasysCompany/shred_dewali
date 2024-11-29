import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';

const SellBiddings = () => {
  const [state, setState, , , , , GCreateOrderAuctionState, setCreateOrderAuctionState] = useContext(AuthContext);

  return (
    <View>
      <Text>hellobro=== : {JSON.stringify(GCreateOrderAuctionState)}</Text>
    </View>
  )
}

export default SellBiddings

const styles = StyleSheet.create({});