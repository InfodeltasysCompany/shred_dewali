import { View, Text } from 'react-native'
import React, { useState } from 'react'

const T1Screen3 = () => {
  const [name ,setname] =useState('vinit')

  const getdatafromchild=(gchilddata)=>{
   setname(gchilddata) 
  }
  return (
    <View>
      <Text>T1Screen3</Text>
      <Child sendtextTochild ={name} getchildd ={getdatafromchild}/>
      <Text>i m T1's child data {name}</Text>
    </View>
  )
}

const Child =({sendtextTochild, getchildd})=>{
  const [childname,setchild] =useState('Vinamra');
  getchildd(childname)
  return(
    <View>
      <Text>i m child component</Text>
      <Text>{sendtextTochild}</Text>
    </View>
  )
}

export default T1Screen3