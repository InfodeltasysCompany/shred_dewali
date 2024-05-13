import { View, Text } from 'react-native'
import React from 'react'
import ChatBlank from './ChatBlank'

const SellingChats = ({navigation}) => {
  return (
    <View>
      <View>
        <ChatBlank navigation={navigation} />
      </View>
    </View>
  )
}

export default SellingChats