import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider'

const AllBiddings = () => {
  const [state,,,,GChatstate] = useContext(AuthContext)
  return (
    <ScrollView>
      <Text> userData= ==  {JSON.stringify(GChatstate.userdetails.firebase_uid)}</Text>
      <Text>hiii..</Text>
      <Text>{JSON.stringify(state.userCred)}</Text>
    <Text>productData==={JSON.stringify(GChatstate.productdetails)}</Text>
    </ScrollView>
  )
}

export default AllBiddings

const styles = StyleSheet.create({})