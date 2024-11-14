import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Test1 = () => {
  let name = "vinit rathore";
useEffect(()=>{
  let check = name.split(" ",);
  console.log("check=>",check);
},[])
  return (
    <View>
      <Text>Test1</Text>
    </View>
  )
}

export default Test1

const styles = StyleSheet.create({})