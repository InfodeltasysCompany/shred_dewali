import { View, Text } from 'react-native'
import React from 'react'
import ChatBlank from './ChatBlank'

const BuyingChats = ({navigation}) => {
  return (
    <View>
      {/* <Text>BuyingChats</Text> */}
      <ChatBlank navigation={navigation} />
    </View>
  )
}

export default BuyingChats